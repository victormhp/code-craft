import { getContext, setContext } from 'svelte';
import type { Grid, GridCell, CellState } from './pathfinding.types';

export class GridState {
  cells = $state<Grid>([]);
  rows = $derived(this.cells.length ?? 0);
  cols = $derived(this.cells[0]?.length ?? 0);

  start = $state<GridCell>({ x: 1, y: 1, state: 'start', visited: false });
  target = $state<GridCell>({ x: 3, y: 3, state: 'target', visited: false });

  frame = 0;

  constructor() { }

  setStartAndTarget = () => {
    this.start.x = 1;
    this.start.y = 1;
    this.target.x = this.cols - 2;
    this.target.y = this.rows - 2;
  };

  updateCell = (x: number, y: number, state: CellState) => {
    const isValid = this.isValid(x, y);
    if (isValid) {
      this.cells[y][x].state = state;
    } else {
      console.warn(`Cell (${x}, ${y}) is out of bounds.`);
    }
  };

  generateMaze = () => {
    this.clearBoard();
  };

  recursiveDivision = (x: number, y: number) => {

  };

  clearPath = () => {
    cancelAnimationFrame(this.frame);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.cells[y][x];
        if (cell.state === 'path') {
          cell.state = 'empty';
        }
      }
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
        const cell = this.cells[y][x];
        cell.state = 'empty';
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
