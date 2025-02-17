export type Orientation = 'vertical' | 'horizontal';

export type CellState = 'empty'| 'wall' | 'path' | 'start' | 'target';

export type MazeAlgorithms =  '-' | 'Recursive Division'

export type PathfindingAlgorithms =  '-' | 'Depth First Search'

export interface GridCell {
  x: number;
  y: number;
  state: CellState;
  visited: boolean;
}

export type Grid = GridCell[][];
