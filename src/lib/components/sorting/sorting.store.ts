import { derived, writable } from 'svelte/store';
import { bubbleSort } from './sorting.utils';
import {
  type SortingOrder,
  type SortingRectColors,
  type SortingFunction,
  type SortingState,
  SortingAlgorithms
} from './sorting.types';

// Sorting Settings Stores
export const sortingOrder = writable<SortingOrder>('Random');

export const sortingAlgorithm = writable<SortingFunction>(bubbleSort);

// Sorting Rect Colors
function createSortingColor(initialValue: SortingRectColors) {
  const sortingRectColor = writable(initialValue);

  function resetRect() {
    sortingRectColor.update((state) => {
      return { ...state, rect: '#27272a' };
    });
  }

  function resetMoving() {
    sortingRectColor.update((state) => {
      return { ...state, moving: '#ef4444' };
    });
  }

  return {
    ...sortingRectColor,
    resetRect,
    resetMoving
  };
}

export const sortingRectColor = createSortingColor({ rect: '#27272a', moving: '#ef4444' });

// Sorting State Store
const initialState: SortingState = {
  algorithm: SortingAlgorithms.BubbleSort,
  isPlaying: false,
  move: [0, 1],
  current: 0,
  total: 0
};

function createSortingState(initialValue: SortingState) {
  const sortingState = writable<SortingState>(initialValue);

  function step() {
    sortingState.update((state) => {
      const current = state.current + 1;
      return { ...state, current };
    });
  }

  function stepBack() {
    sortingState.update((state) => {
      const current = state.current - 1;
      return { ...state, current };
    });
  }

  function reset() {
    sortingState.set(initialValue);
  }

  return {
    ...sortingState,
    step,
    stepBack,
    reset
  };
}

export const sortingState = createSortingState(initialState);

export const canStep = derived(
  sortingState,
  ($sortingState) => $sortingState.current < $sortingState.total - 1
);

export const canStepBack = derived(sortingState, ($sortingState) => $sortingState.current > 0);
