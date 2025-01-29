import { bubbleSort } from './sorting.utils';
import type { SortingOrder, SortingFunction, SortingStatus } from './sorting.types';

export class SortingSettingsState {
  size = $state(10);
  delay = $state(100);
  isPlaying = $state(false);
  order = $state<SortingOrder>('Random');
  algorithm = $state<SortingFunction>(bubbleSort);

  constructor() { }
}

export const sortingSettings = new SortingSettingsState();

export class RectSettingsState {
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

export const rectSettings = new RectSettingsState();

export class SortingProgress {
  current = $state(0);
  total = $state(0);

  constructor() { }

  step = () => {
    this.current += 1;
  };

  stepBack = () => {
    this.current -= 1;
  };

  reset() {
    this.current = 0;
  }
}

export const sortingProgress = new SortingProgress();
