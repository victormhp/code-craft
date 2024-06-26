import { bubbleSort, insertionSort, mergeSort, selectionSort } from './sorting.utils';

// Sorting Order
export type SortingOrder = 'Random' | 'Reverse';

// Sorting Rect Colors
export interface SortingColors {
  unordered: string;
  ordered: string;
  moving: string;
}

export type RectStatus = keyof SortingColors;

// Sorting algorithm function types
export interface SortingHistory {
  rectValues: number[][];
  rectStatuses: RectStatus[][];
};

export type SortingAlgorithm = 'Bubble Sort' | 'Insertion Sort' | 'Selection Sort' | 'Merge Sort';

export type SortingFunction = (nums: number[]) => SortingHistory;

export const sortingAlgorithms = [
  { algorithmName: 'Bubble Sort', algorithmFunction: bubbleSort },
  { algorithmName: 'Insertion Sort', algorithmFunction: insertionSort },
  { algorithmName: 'Selection Sort', algorithmFunction: selectionSort },
  { algorithmName: 'Merge Sort', algorithmFunction: mergeSort }
];

// Sorting Progress Store
export interface SortingProgress {
  isPlaying: boolean;
  current: number;
  total: number;
}
