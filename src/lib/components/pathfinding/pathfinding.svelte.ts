import type { Grid, GridCell, CellState } from './pathfinding.types';

export class GridState {
  cells = $state<Grid>([]);
  start = $state<GridCell>({ x: 2, y: 2, state: 'start' });
  target = $state<GridCell>({ x: 4, y: 4, state: 'target' });

  constructor() { }

  getRows = () => this.cells.length;

  getCols = () => this.cells[0].length;

  updateCell = (x: number, y: number, state: CellState) => {
    const isValid = this.isValidCell(x, y);
    if (isValid) {
      this.cells[y][x].state = state;
    } else {
      console.warn(`Cell (${x}, ${y}) is out of bounds.`);
    }
  };

  clearPath = () => {
    const rows = this.getRows();
    const cols = this.getCols();

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = this.cells[y][x];
        if (cell.state === 'path') {
          cell.state = 'empty';
        }
      }
    }
  };

  clearBoard = () => {
    const rows = this.getRows();
    const cols = this.getCols();

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = this.cells[y][x];
        if (cell.state === 'path' || cell.state == 'wall') {
          cell.state = 'empty';
        }
      }
    }
  };

  reset = () => {
    const rows = this.getRows();
    const cols = this.getCols();

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = this.cells[y][x];
        cell.state = 'empty';
      }
    }

    this.start.x = 2;
    this.start.y = 2;

    this.target.x = cols - 3;
    this.target.y = rows - 3;
  };

  private isValidCell = (x: number, y: number) => {
    return y >= 0 && y < this.getRows() && x >= 0 && x < this.getCols();
  };
}

export const grid = new GridState();
