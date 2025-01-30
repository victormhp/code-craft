export interface CellColors {
  empty: string;
  wall: string;
  path: string;
  start: string;
  target: string;
}

export type CellState = keyof CellColors;

export interface Coordinates {
  x: number;
  y: number;
}

export interface GridCell {
  x: number;
  y: number;
  state: CellState;
}

export type Grid = GridCell[][];
