export type SortingOrder = 'Random' | 'Reverse';

export type SortingStatus = 'unordered' | 'moving';

export type SortingAlgorithm = 'Bubble Sort' | 'Insertion Sort' | 'Selection Sort' | 'Merge Sort';

export interface SortingHistory {
  values: number[][];
  statuses: SortingStatus[][];
}

export type SortingFunction = (nums: number[]) => SortingHistory;
