import { derived, writable } from 'svelte/store';
import { bubbleSort, mergeSort } from './sorting.utils';

// Sorting algorithm function types
enum SortingAlgorithms {
  BubbleSort = 'Bubble Sort',
  MergeSort = 'Merge Sort'
}

export type SortingFunction = (
  arr: number[],
) => { moves: number[][]; states: number[][] };

export const sortingAlgorithmsRecord = [
  { algorithmName: SortingAlgorithms.BubbleSort, algorithmFunction: bubbleSort },
  { algorithmName: SortingAlgorithms.MergeSort, algorithmFunction: mergeSort }
];

// Sorting stores
export const sortingSize = writable(15);
export const sortingDelay = writable(50);
export const sortingAlgorithm = writable<SortingFunction>(bubbleSort);

interface SortingState {
  algorithm: SortingAlgorithms;
  isPlaying: boolean;
  move: number[];
  current: number;
  total: number;
}

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
