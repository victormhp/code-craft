import { getContext, setContext } from 'svelte';
import type { Grid, GridCell, CellState, Orientation } from './pathfinding.types';
import { randomNumber } from '$lib/utils';

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

  generateMaze = () => {
    this.clearBoard();
    this.walledPerimeter();
    this.recursiveDivision(0, 0, this.cols, this.rows);
  };

  recursiveDivision = (startX: number, startY: number, endX: number, endY: number) => {
    if (endY - startY <= 3 || endX - startX <= 3) return;

    const rows = [];
    const cols = [];

    const orientation = this.chooseOrientation(endX - startX, endY - startY);
    if (orientation === 'vertical') {
      for (let i = startY + 2; i <= endY - 2; i += 2) {
        rows.push(i);
      }
      for (let i = startX + 1; i <= endX - 1; i += 2) {
        cols.push(i);
      }

      const wallY = rows[randomNumber(rows.length - 1)];
      const passageX = cols[randomNumber(cols.length - 1)];

      for (let x = 1; x < endX - startX; x++) {
        if (x !== passageX - startX) {
          this.cells[wallY][startX + x].state = 'wall';
        }
      }
      for (let y = 1; y < wallY - wallY; y++) {
        if (y !== passageX - wallY) {
          this.cells[wallY + y][startX].state = 'wall';
        }
      }

      this.recursiveDivision(startX, startY, endX, wallY);
      this.recursiveDivision(startX, wallY, endX, endY);
    } else {
      for (let i = startX + 2; i <= endX - 2; i += 2) {
        cols.push(i);
      }
      for (let i = startY + 1; i <= endY - 3; i += 2) {
        rows.push(i);
      }

      const wallX = cols[randomNumber(cols.length - 1)];
      const passageY = rows[randomNumber(rows.length - 1)];

      for (let x = 1; x < wallX - wallX; x++) {
        if (x !== passageY - startY) {
          this.cells[startY][wallX + x].state = 'wall';
        }
      }
      for (let y = 1; y < endY - startY; y++) {
        if (y !== passageY - startY) {
          this.cells[startY + y][wallX].state = 'wall';
        }
      }

      this.recursiveDivision(startX, startY, wallX, endY);
      this.recursiveDivision(wallX, startY, endX, endY);
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

  private chooseOrientation = (width: number, height: number): Orientation => {
    if (width < height) {
      return 'vertical';
    } else if (height < width) {
      return 'horizontal';
    } else {
      return Math.round(Math.random()) ? 'horizontal' : 'vertical';
    }
  };
}

const GRID_KEY = Symbol('GRID');

export function setGridState() {
  return setContext(GRID_KEY, new GridState());
}

export function getGridState() {
  return getContext<ReturnType<typeof setGridState>>(GRID_KEY);
}
