import type { SortingStates, SortingFunction } from './sorting.store';

export function generateRandomArray(length: number, start: number, end: number): number[] {
  const uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size < length) {
    const n = Math.floor(Math.random() * (start - end) + end);
    uniqueNumbers.add(n);
  }

  return Array.from(uniqueNumbers);
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export const bubbleSort: SortingFunction = (arr: number[]) => {
  const values: SortingStates = { moves: [[]], states: [[...arr]] };

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        values.moves.push([j, j + 1]);
        values.states.push([...arr]);
      } else {
        values.moves.push([j, j + 1]);
        values.states.push([...arr]);
      }

      if (j === arr.length - i - 2) {
        values.moves.push([arr.length - i - 1, arr.length - i - 1]);
        values.states.push([...arr]);
      }
    }
  }

  values.moves.push([0, 0]);
  values.states.push([...arr]);

  return values;
};

export const insertionSort: SortingFunction = (arr: number[]) => {
  const values: SortingStates = { moves: [[]], states: [[...arr]] };

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      arr[j] = key;
      values.states.push([...arr]);
      values.moves.push([j, j + 1]);
      j--;
    }
    // arr[j + 1] = key;
  }

  arr.forEach((_, i) => values.moves.push([i, i]));

  return values;
};

export const mergeSortStates: SortingFunction = (arr: number[]) => {
  const values: SortingStates = { moves: [[]], states: [[...arr]] };
  mergeSort(arr, 0, arr.length - 1, values);
  return values;
};

function mergeSort(arr: number[], l: number, r: number, values: SortingStates) {
  if (l >= r) return;

  const mid = l + Math.floor((r - l) / 2);
  mergeSort(arr, l, mid, values);
  mergeSort(arr, mid + 1, r, values);
  merge(arr, l, mid, r);

  values.moves.push(range(l, r));
  values.states.push(arr.slice());
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
