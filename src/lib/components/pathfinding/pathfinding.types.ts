export type CellState = 'empty' | 'wall' | 'path' | 'start' | 'target';

export interface GridCell {
  x: number;
  y: number;
  state: CellState;
  visited: boolean;
}

export type Grid = GridCell[][];
