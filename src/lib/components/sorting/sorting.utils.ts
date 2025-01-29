import { rangeArray } from '$lib/utils';
import type { SortingHistory, SortingStatus } from './sorting.types';

function swap<T>(arr: T[], a: number, b: number) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function recordStep(history: SortingHistory, nums: number[], statuses: SortingStatus[]) {
  history.values.push([...nums]);
  history.statuses.push([...statuses]);
}

export function bubbleSort(nums: number[]): SortingHistory {
  const history: SortingHistory = { values: [], statuses: [] };
  let swapped: boolean;

  const statuses: SortingStatus[] = Array(nums.length).fill('unordered');
  recordStep(history, nums, statuses);

  for (let i = 0; i < nums.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < nums.length - i - 1; j++) {
      const newStatuses = [...statuses];
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1);
        swapped = true;

        newStatuses[j] = 'moving';
        newStatuses[j + 1] = 'moving';
        recordStep(history, nums, newStatuses);
      } else {
        newStatuses[j] = 'moving';
        newStatuses[j + 1] = 'moving';
        recordStep(history, nums, newStatuses);
      }
    }

    if (!swapped) break;
  }

  recordStep(history, nums, statuses);
  return history;
}

export function insertionSort(nums: number[]): SortingHistory {
  const history: SortingHistory = { values: [], statuses: [] };

  const statuses: SortingStatus[] = Array(nums.length).fill('unordered');
  recordStep(history, nums, statuses);

  for (let i = 1; i < nums.length; i++) {
    const key = nums[i];
    let j = i - 1;

    while (j >= 0 && key < nums[j]) {
      nums[j + 1] = nums[j];
      nums[j] = key;

      const newStatuses = [...statuses];
      newStatuses[j] = 'moving';
      newStatuses[j + 1] = 'moving';

      recordStep(history, nums, newStatuses);

      j--;
    }
  }

  recordStep(history, nums, statuses);
  return history;
}

export function selectionSort(nums: number[]): SortingHistory {
  const history: SortingHistory = { values: [], statuses: [] };

  const statuses: SortingStatus[] = Array(nums.length).fill('unordered');
  recordStep(history, nums, statuses);

  for (let i = 0; i < nums.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < nums.length; j++) {
      const newStatuses = [...statuses];
      newStatuses[minIndex] = 'moving';
      newStatuses[j] = 'moving';
      recordStep(history, nums, newStatuses);

      if (nums[minIndex] > nums[j]) {
        minIndex = j;
      }
    }

    swap(nums, i, minIndex);

    const newStatuses = [...statuses];
    newStatuses[i] = 'moving';
    newStatuses[minIndex] = 'moving';
    recordStep(history, nums, newStatuses);
  }

  recordStep(history, nums, statuses);
  return history;
}

export function mergeSort(nums: number[]): SortingHistory {
  const history: SortingHistory = { values: [], statuses: [] };

  const statuses: SortingStatus[] = Array(nums.length).fill('unordered');
  recordStep(history, nums, statuses);

  mergeS(nums, 0, nums.length - 1, history, statuses);

  recordStep(history, nums, statuses);
  return history;
}

function mergeS(
  nums: number[],
  l: number,
  r: number,
  history: SortingHistory,
  statuses: SortingStatus[]
) {
  if (l >= r) return;

  const mid = l + Math.floor((r - l) / 2);
  mergeS(nums, l, mid, history, statuses);
  mergeS(nums, mid + 1, r, history, statuses);
  merge(nums, l, mid, r);

  const newStatuses = [...statuses];
  for (const n of rangeArray(l, r)) {
    newStatuses[n] = 'moving';
  }

  recordStep(history, nums, newStatuses);
}

function merge(arr: number[], l: number, m: number, r: number) {
  const leftArr = arr.slice(l, m + 1);
  const rightArr = arr.slice(m + 1, r + 1);
  let i = 0;
  let j = 0;
  let k = l;

  while (i < leftArr.length && j < rightArr.length) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      i++;
    } else {
      arr[k] = rightArr[j];
      j++;
    }
    k++;
  }

  while (i < leftArr.length) {
    arr[k] = leftArr[i];
    i++;
    k++;
  }

  while (j < rightArr.length) {
    arr[k] = rightArr[j];
    j++;
    k++;
  }
}
