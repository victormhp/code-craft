export function generateRandomArray(length: number, start: number, end: number): number[] {
  const uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size < length) {
    const n = Math.floor(Math.random() * (start - end) + end);
    uniqueNumbers.add(n);
  }

  return Array.from(uniqueNumbers);
}

export function bubbleSort(arr: number[]) {
  const newArr = [...arr];
  let length = arr.length;
  const moves: number[][] = [];
  const states: number[][] = [];
  let swapped: boolean;

  do {
    swapped = false;
    for (let i = 0; i < length - 1; i++) {
      if (newArr[i] > newArr[i + 1]) {
        [newArr[i], newArr[i + 1]] = [newArr[i + 1], newArr[i]];
        swapped = true;

        moves.push([i, i + 1]);
        states.push([...newArr]);
      } else {
        moves.push([i, i + 1]);
        states.push([...newArr]);
      }
    }

    length -= 1;
  } while (swapped);

  return { moves, states };
}
