import { getContext, setContext } from 'svelte';
import type {
  Grid,
  GridCell,
  CellState,
  MazeAlgorithms,
  PathfindingAlgorithms
} from './pathfinding.types';
import { recursiveDivision } from './pathfinding.utils';

export class GridState {
  cells = $state<Grid>([]);
  rows = $derived(this.cells.length ?? 0);
  cols = $derived(this.cells[0]?.length ?? 0);
  start = $state<GridCell>({ x: 1, y: 1, state: 'start' });
  target = $state<GridCell>({ x: 3, y: 3, state: 'target' });
  frame = 0;

  constructor() { }

  setStartAndTarget = () => {
    this.start.x = 1;
    this.start.y = 1;
    this.target.x = this.cols - 2;
    this.target.y = this.rows - 2;
  };

  updateCell = (x: number, y: number, state: CellState) => {
    if (this.isValid(x, y)) {
      this.cells[y][x].state = state;
    } else {
      console.warn(`Cell (${x}, ${y}) is out of bounds.`);
    }
  };

  solveMaze = (algorithm: PathfindingAlgorithms) => { };

  generateMaze = (algorithm: MazeAlgorithms) => {
    this.clearBoard();
    this.walledPerimeter();

    switch (algorithm) {
      case 'Recursive Division':
        recursiveDivision(this.cells, 0, 0, this.cols, this.rows);
        break;
      default:
        console.warn('That algorithm is not registered!');
        break;
    }
  };

  walledPerimeter = () => {
    for (let x = 0; x < this.cols; x++) {
      this.cells[0][x].state = 'wall';
      this.cells[this.rows - 1][x].state = 'wall';
    }
    for (let y = 0; y < this.rows; y++) {
      this.cells[y][0].state = 'wall';
      this.cells[y][this.cols - 1].state = 'wall';
    }
  };

  clearBoard = () => {
    cancelAnimationFrame(this.frame);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.cells[y][x];
        if (cell.state === 'path' || cell.state == 'wall') {
          cell.state = 'empty';
        }
      }
    }
  };

  reset = () => {
    cancelAnimationFrame(this.frame);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.cells[y][x].state = 'empty';
      }
    }
    this.setStartAndTarget();
  };

  private isValid = (x: number, y: number) => {
    return y >= 0 && y < this.rows && x >= 0 && x < this.cols;
  };
}

const GRID_KEY = Symbol('GRID');

export function setGridState() {
  return setContext(GRID_KEY, new GridState());
}

export function getGridState() {
  return getContext<ReturnType<typeof setGridState>>(GRID_KEY);
}
