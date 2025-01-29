export function randomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function rangeArray(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function generateRandomArray(length: number, start = 0, end: number): number[] {
  const uniqueNumbers: Set<number> = new Set();

  while (uniqueNumbers.size < length) {
    const n = Math.floor(Math.random() * (start - end) + end);
    uniqueNumbers.add(n);
  }

  return Array.from(uniqueNumbers);
}
