import type { SortingFunction } from './sorting.store';

export function generateRandomArray(length: number, start: number, end: number): number[] {
  const uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size < length) {
    const n = Math.floor(Math.random() * (start - end) + end);
    uniqueNumbers.add(n);
  }

  return Array.from(uniqueNumbers);
}

export const bubbleSort: SortingFunction = (arr: number[]) => {
  const moves: number[][] = [];
  const states: number[][] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        moves.push([j, j + 1]);
        states.push([...arr]);
      } else {
        moves.push([j, j + 1]);
        states.push([...arr]);
      }

      if (j === arr.length - i - 2) {
        moves.push([arr.length - i - 1, arr.length - i - 1]);
        states.push([...arr]);
      }
    }
  }
  moves.push([0, 0]);
  states.push([...arr]);
  return { moves, states };
};

export const mergeSort: SortingFunction = (arr: number[]) => {
  //   if (arr.length <= 1) return;
  //
  //   const mid = Math.floor(arr.length / 2);
  //   const left = arr.slice(0, mid);
  //   const right = arr.slice(mid);
  //
  //   return merge(mergeSort(left), mergeSort(right));
  // };
  //
  // const merge = (left: number[], right: number[]): { moves: number[][]; states: number[][] } => {
  //   const moves: number[][] = [];
  //   const states: number[][] = [];
  //   const arr = [];
  //   let l = 0;
  //   let r = 0;
  //
  //   while (l < left.length && r < right.length) {
  //     if (left[l] < right[r]) {
  //       arr.push(left[l]);
  //       l++;
  //     } else {
  //       arr.push(right[r]);
  //       r++;
  //     }
  //   }
  //
  //   return arr.concat(left.slice(l)).concat(right.slice(r));
  const moves: number[][] = [];
  const states: number[][] = [];
  let swapped: boolean;

  for (let i = 0; i < arr.length - 1; i++) {
    swapped = false;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        moves.push([j, j + 1]);
        states.push([...arr]);
      } else {
        moves.push([j, j + 1]);
        states.push([...arr]);
      }
    }
    if (!swapped) break;
  }

  return { moves, states };
};
