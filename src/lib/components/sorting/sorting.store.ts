import { derived, writable } from 'svelte/store';
import { bubbleSort } from './sorting.utils';
import type {
  SortingOrder,
  SortingColors,
  SortingFunction,
  SortingProgress
} from './sorting.types';

// Sorting Settings Stores
export const sortingOrder = writable<SortingOrder>('Random');

export const sortingAlgorithm = writable<SortingFunction>(bubbleSort);

// Sorting Colors Store
function createSortingColors(initialValue: SortingColors) {
  const sortingRectColor = writable<SortingColors>(initialValue);

  function resetUnordered() {
    sortingRectColor.update((state) => {
      return { ...state, unordered: '#27272a' };
    });
  }

  function resetMoving() {
    sortingRectColor.update((state) => {
      return { ...state, moving: '#ef4444' };
    });
  }

  return {
    ...sortingRectColor,
    resetUnordered,
    resetMoving
  };
}

export const sortingColors = createSortingColors({
  unordered: '#27272a',
  ordered: '#27272a',
  moving: '#ef4444'
});

// Sorting Progress Store
function createSortingProgress(initialValue: SortingProgress) {
  const sortingProgress = writable<SortingProgress>(initialValue);

  function step() {
    sortingProgress.update((state) => {
      const current = state.current + 1;
      return { ...state, current };
    });
  }

  function stepBack() {
    sortingProgress.update((state) => {
      const current = state.current - 1;
      return { ...state, current };
    });
  }

  function reset() {
    sortingProgress.set(initialValue);
  }

  return {
    ...sortingProgress,
    step,
    stepBack,
    reset
  };
}

export const sortingProgress = createSortingProgress({
  isPlaying: false,
  current: 0,
  total: 0
});

export const canStep = derived(
  sortingProgress,
  ($sortingState) => $sortingState.current < $sortingState.total - 1
);

export const canStepBack = derived(sortingProgress, ($sortingState) => $sortingState.current > 0);
