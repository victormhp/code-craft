import { getContext, setContext } from 'svelte';
import { generateRandomArray } from '$lib/utils';
import { bubbleSort } from './sorting.utils';
import type { SortingOrder, SortingFunction, SortingStatus } from './sorting.types';

export class SortingState {
  size = $state(15);
  delay = $state(100);
  order = $state<SortingOrder>('Random');
  algorithm = $state<SortingFunction>(bubbleSort);
  values = $state<number[]>([]);
  history = $derived(this.algorithm([...this.values]));
  current = $state(0);
  currValues = $derived(this.history.values[this.current]);
  currStatuses = $derived(this.history.statuses[this.current]);
  total = $derived(this.history.values.length);

  timeout = 0;
  frame = 0;
  isPlaying = $state(false);

  constructor() {
    this.values = this.generateRects();
  }

  canStep = () => {
    return this.current < this.total - 1;
  };

  step = () => {
    if (!this.canStep()) return;
    this.current += 1;
  };

  canStepBack = () => {
    return this.current > 0;
  };

  stepBack = () => {
    if (!this.canStepBack()) return;
    this.current -= 1;
  };

  reset = () => {
    this.current = 0;
  };

  generateRects = (): number[] => {
    const heights = generateRandomArray(this.size, 10, 100);
    if (this.order === 'Reverse') {
      return heights.sort((a, b) => b - a);
    }
    return heights;
  };

  play = () => {
    if (!this.canStep()) return;

    if (this.isPlaying) {
      this.isPlaying = false;
      clearTimeout(this.timeout);
      cancelAnimationFrame(this.frame);
    } else {
      this.isPlaying = true;
      this.animate();
    }
  };

  animate = () => {
    if (this.isPlaying && !this.canStep()) {
      this.isPlaying = false;
    }

    if (this.isPlaying && this.canStep()) {
      this.timeout = setTimeout(() => {
        this.frame = requestAnimationFrame(this.animate);
        this.step();
      }, this.delay);

      return () => {
        clearTimeout(this.timeout);
        cancelAnimationFrame(this.frame);
      };
    }
  };

  randomize = () => {
    if (this.isPlaying || this.current > 0) return;
    this.reset();
    this.isPlaying = false;
    this.values = this.generateRects();
  };

  restart = () => {
    if (this.isPlaying || this.current < 1) return;
    cancelAnimationFrame(this.frame);
    this.reset();
    this.isPlaying = false;
  };
}

const SORTING_KEY = Symbol('SORTING');

export function setSortingState() {
  return setContext(SORTING_KEY, new SortingState());
}

export function getSortingState() {
  return getContext<ReturnType<typeof setSortingState>>(SORTING_KEY);
}

export const sortingState = new SortingState();

export class RectState {
  status = $state<SortingStatus>('unordered');
  unorderedColor = $state('#27272a');
  movingColor = $state('#ef4444');

  constructor() { }

  resetUnorderedColor = () => {
    this.unorderedColor = '#27272a';
  };

  resetMovingColor = () => {
    this.movingColor = '#ef4444';
  };

  getColor = (status: string) => {
    switch (status) {
      case 'unordered':
        return this.unorderedColor;
      case 'moving':
        return this.movingColor;
      default:
        return '#000';
    }
  };
}

const RECT_KEY = Symbol('RECT');

export function setRectState() {
  return setContext(RECT_KEY, new RectState());
}

export function getRectState() {
  return getContext<ReturnType<typeof setRectState>>(RECT_KEY);
}
