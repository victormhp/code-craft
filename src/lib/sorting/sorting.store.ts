import { derived, writable } from 'svelte/store';
import { bubbleSort, insertionSort, mergeSortStates, selectionSort } from './sorting.utils';

// Sorting algorithm function types
enum SortingAlgorithms {
  BubbleSort = 'Bubble Sort',
  InsertionSort = 'Insertion Sort',
  SelectionSort = 'Selection Sort',
  MergeSort = 'Merge Sort'
}

export type SortingStates = Record<'moves' | 'states', number[][]>;
export type SortingFunction = (arr: number[]) => SortingStates;

export const sortingAlgorithmsRecord = [
  { algorithmName: SortingAlgorithms.BubbleSort, algorithmFunction: bubbleSort },
  { algorithmName: SortingAlgorithms.InsertionSort, algorithmFunction: insertionSort },
  { algorithmName: SortingAlgorithms.SelectionSort, algorithmFunction: selectionSort },
  { algorithmName: SortingAlgorithms.MergeSort, algorithmFunction: mergeSortStates }
];

// Sorting Settings Stores
export const sortingSize = writable(15);

export const sortingDelay = writable(100);

export const sortingShowValues = writable(false);

type SortingOrder = 'Random' | 'Reverse';
export const sortingOrder = writable<SortingOrder>('Random');

export const sortingAlgorithm = writable<SortingFunction>(bubbleSort);

// Sorting State Store
interface SortingStateStore {
  algorithm: SortingAlgorithms;
  isPlaying: boolean;
  move: number[];
  current: number;
  total: number;
}

const initialState: SortingStateStore = {
  algorithm: SortingAlgorithms.BubbleSort,
  isPlaying: false,
  move: [0, 1],
  current: 0,
  total: 0
};

function createSortingState(initialValue: SortingStateStore) {
  const sortingState = writable<SortingStateStore>(initialValue);

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
