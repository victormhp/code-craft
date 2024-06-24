import { bubbleSort, insertionSort, mergeSort, selectionSort } from './sorting.utils';

// Sorting Order
export type SortingOrder = 'Random' | 'Reverse';

// Sorting Rect Colors
export interface SortingRectColors {
  rect: string;
  moving: string;
}

// Sorting algorithm function types
export enum SortingAlgorithms {
  BubbleSort = 'Bubble Sort',
  InsertionSort = 'Insertion Sort',
  SelectionSort = 'Selection Sort',
  MergeSort = 'Merge Sort'
}

export type SortingSteps = Record<'moves' | 'states', number[][]>;

export type SortingFunction = (arr: number[]) => SortingSteps;

export const sortingAlgorithmsRecord = [
  { algorithmName: SortingAlgorithms.BubbleSort, algorithmFunction: bubbleSort },
  { algorithmName: SortingAlgorithms.InsertionSort, algorithmFunction: insertionSort },
  { algorithmName: SortingAlgorithms.SelectionSort, algorithmFunction: selectionSort },
  { algorithmName: SortingAlgorithms.MergeSort, algorithmFunction: mergeSort }
];

// Sorting State Store
export interface SortingState {
  algorithm: SortingAlgorithms;
  isPlaying: boolean;
  move: number[];
  current: number;
  total: number;
}
