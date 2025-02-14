export type Orientation = 'vertical' | 'horizontal';

export type CellState = 'empty' | 'wall' | 'path' | 'start' | 'target';

export interface GridCell {
  x: number;
  y: number;
  state: CellState;
}

export type Grid = GridCell[][];
