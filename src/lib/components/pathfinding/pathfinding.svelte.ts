import { getContext, setContext } from 'svelte';
import type {
  Grid,
  GridCell,
  CellState,
  MazeAlgorithms,
  PathfindingAlgorithms,
  Orientation
} from './pathfinding.types';
import { randomNumber, randomNumberRange } from '$lib/utils';

export class GridState {
  cells = $state<Grid>([]);
  rows = $derived(this.cells.length ?? 0);
  cols = $derived(this.cells[0]?.length ?? 0);

  visitFrame = 0;
  visitTimeout = 0;
  pathFrame = 0;
  pathTimeout = 0;
  isPlaying = $state(false);
  delay = $state(0);

  constructor() { }

  createGrid = (rows: number, cols: number) => {
    const newGrid: Grid = Array.from({ length: rows }, () => []);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const state = this.getStartingState(x, y);
        newGrid[y].push({ x, y, state, visited: false });
      }
    }
    this.cells = newGrid;
  };

  getStart = (): GridCell | undefined => {
    return this.cells.flat().find((cell) => cell.state == 'start');
  };

  updateCell = (x: number, y: number, state: CellState) => {
    if (this.isValid(x, y)) {
      this.cells[y][x].state = state;
    } else {
      console.warn(`Cell (${x}, ${y}) is out of bounds.`);
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

  clearAnimations = () => {
    this.isPlaying = false;
    clearTimeout(this.visitTimeout);
    cancelAnimationFrame(this.visitFrame);
    cancelAnimationFrame(this.pathFrame);
    clearTimeout(this.pathTimeout);
  };

  clearPath = () => {
    this.clearAnimations();
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.cells[y][x];
        if (cell.state == 'path') {
          cell.state = 'empty';
        }
        cell.visited = false;
      }
    }
  };

  clearBoard = () => {
    this.clearAnimations();
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.cells[y][x];
        if (cell.state !== 'start' && cell.state !== 'target') {
          cell.state = 'empty';
        }
        cell.visited = false;
      }
    }
  };

  reset = () => {
    this.clearAnimations();
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.cells[y][x];
        const state = this.getStartingState(x, y);
        cell.state = state;
        cell.visited = false;
      }
    }
  };

  //
  // Maze Generation
  //
  generateMaze = (algorithm: MazeAlgorithms) => {
    if (this.isPlaying) return;
    this.clearBoard();

    switch (algorithm) {
      case 'Recursive Division':
        this.walledPerimeter();
        this.recursiveDivision(this.cells, 0, 0, this.cols, this.rows);
        break;
      case 'BPS Vertical':
        this.binarySpacePartitioning(this.cells, 0, 0, this.cols, this.rows, 'vertical');
        break;
      case 'BPS Horizontal':
        this.binarySpacePartitioning(this.cells, 0, 0, this.cols, this.rows, 'horizontal');
        break;
      default:
        console.warn('That algorithm is not registered!');
        break;
    }
  };

  private recursiveDivision = (
    grid: Grid,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    if (endY - startY <= 3 || endX - startX <= 3) return;

    const possibleWalls = [];
    const possiblePassages = [];

    const orientation = this.chooseOrientation(endX - startX, endY - startY);
    if (orientation === 'vertical') {
      for (let i = startY + 2; i <= endY - 2; i += 2) {
        possibleWalls.push(i);
      }
      for (let i = startX + 1; i <= endX - 1; i += 2) {
        possiblePassages.push(i);
      }

      const wallY = possibleWalls[randomNumber(possibleWalls.length - 1)];
      const passageX = possiblePassages[randomNumber(possiblePassages.length - 1)];

      for (let x = 1; x < endX - startX; x++) {
        if (x !== passageX - startX) {
          grid[wallY][startX + x].state = 'wall';
        }
      }

      this.recursiveDivision(grid, startX, startY, endX, wallY);
      this.recursiveDivision(grid, startX, wallY, endX, endY);
    } else {
      for (let i = startX + 2; i <= endX - 2; i += 2) {
        possiblePassages.push(i);
      }
      for (let i = startY + 1; i <= endY - 3; i += 2) {
        possibleWalls.push(i);
      }

      const wallX = possiblePassages[randomNumber(possiblePassages.length - 1)];
      const passageY = possibleWalls[randomNumber(possibleWalls.length - 1)];

      for (let y = 1; y < endY - startY; y++) {
        if (y !== passageY - startY) {
          grid[startY + y][wallX].state = 'wall';
        }
      }

      this.recursiveDivision(grid, startX, startY, wallX, endY);
      this.recursiveDivision(grid, wallX, startY, endX, endY);
    }
  };

  private binarySpacePartitioning(
    grid: Grid,
    x: number,
    y: number,
    cols: number,
    rows: number,
    orientation: Orientation
  ) {
    if (cols < 3 || rows < 3) return;

    if (orientation === 'vertical') {
      this.splitVertically(grid, x, y, cols, rows);
    } else {
      this.splitHorizontally(grid, x, y, cols, rows);
    }
  }

  private splitVertically(grid: Grid, x: number, y: number, cols: number, rows: number) {
    const wallX = x + randomNumberRange(1, cols - 2);
    const passageY = y + randomNumber(rows);

    for (let i = y; i < y + rows; i++) {
      const cell = grid[i][wallX];
      if (i !== passageY && cell.state !== 'start' && cell.state !== 'target') {
        cell.state = 'wall';
      }
    }

    this.binarySpacePartitioning(this.cells, x, y, wallX - x, rows, 'vertical'); // Left partition
    this.binarySpacePartitioning(
      this.cells,
      wallX + 1,
      y,
      x + cols - (wallX + 1),
      rows,
      'vertical'
    ); // Right partition
  }

  private splitHorizontally(grid: Grid, x: number, y: number, cols: number, rows: number) {
    const wallY = y + randomNumberRange(1, rows - 2);
    const passageX = x + randomNumber(cols);

    for (let i = x; i < x + cols; i++) {
      const cell = grid[wallY][i];
      if (i !== passageX && cell.state !== 'start' && cell.state !== 'target') {
        cell.state = 'wall';
      }
    }

    this.binarySpacePartitioning(this.cells, x, y, cols, wallY - y, 'horizontal'); // Top partition
    this.binarySpacePartitioning(
      this.cells,
      x,
      wallY + 1,
      cols,
      y + rows - (wallY + 1),
      'horizontal'
    ); // Bottom partition
  }

  //
  // Pathfinding
  //
  solveMaze = (algorithm: PathfindingAlgorithms) => {
    const start = this.getStart();
    if (!start || this.isPlaying) return;
    this.clearPath();
    this.isPlaying = true;

    switch (algorithm) {
      case 'Depth First Search':
        this.depthFirstSearch(this.cells, start);
        break;
      case 'Breadth First Search':
        this.breadthFirstSearch(this.cells, start);
        break;
      default:
        console.warn('That algorithm is not registered!');
        break;
    }
  };

  private depthFirstSearch = (grid: Grid, start: GridCell) => {
    const stack: GridCell[] = [start];
    const parents = new Map<GridCell, GridCell | null>();
    parents.set(start, null);

    const step = () => {
      if (stack.length === 0) {
        this.isPlaying = false;
        this.clearPath();
        clearTimeout(this.visitTimeout);
        cancelAnimationFrame(this.visitFrame);
        return;
      }

      const c = stack.pop() as GridCell;
      if (c.state == 'target') {
        this.animatePathDfs(parents, c);
        clearTimeout(this.visitTimeout);
        cancelAnimationFrame(this.visitFrame);
        return;
      }

      if (!c.visited) {
        c.visited = true;
      }

      const neighbors = this.getNeighbors(grid, c);
      for (const n of neighbors) {
        if (!n.visited) {
          stack.push(n);
          parents.set(n, c);
        }
      }

      this.visitTimeout = setTimeout(() => {
        this.visitFrame = requestAnimationFrame(step);
      }, this.delay);
    };

    step();
  };

  private animatePathDfs = (parents: Map<GridCell, GridCell | null>, target: GridCell) => {
    const path: GridCell[] = [];
    let current: GridCell | null = target;

    while (current) {
      path.push(current);
      current = parents.get(current) || null;
    }

    path.shift();
    path.pop();
    path.reverse();

    let i = 0;
    const step = () => {
      if (i >= path.length) {
        this.isPlaying = false;
        clearTimeout(this.pathTimeout);
        cancelAnimationFrame(this.pathFrame);
        return;
      }

      path[i].state = 'path';
      i++;

      this.pathTimeout = setTimeout(() => {
        this.pathFrame = requestAnimationFrame(step);
      }, this.delay);
    };

    step();
  };

  private breadthFirstSearch = (grid: Grid, start: GridCell) => {
    const queue: Grid = [[start]];

    const step = () => {
      if (queue.length == 0) {
        this.isPlaying = false;
        this.clearPath();
        clearTimeout(this.visitTimeout);
        cancelAnimationFrame(this.visitFrame);
        return;
      }

      const path = queue.shift() as GridCell[];
      const c = path[path.length - 1];
      if (c.state == 'target') {
        this.animatePathBfs(path);
        clearTimeout(this.visitTimeout);
        cancelAnimationFrame(this.visitFrame);
        return;
      }

      if (!c.visited) {
        c.visited = true;

        const neighbors = this.getNeighbors(grid, c);
        for (const n of neighbors) {
          if (!n.visited) {
            queue.push([...path, n]);
          }
        }
      }

      this.visitTimeout = setTimeout(() => {
        this.visitFrame = requestAnimationFrame(step);
      }, this.delay);
    };

    step();
  };

  private animatePathBfs = (path: GridCell[]) => {
    path.shift();
    path.pop();
    let i = 0;
    const step = () => {
      if (i == path.length) {
        this.isPlaying = false;
        clearTimeout(this.pathTimeout);
        cancelAnimationFrame(this.pathFrame);
        return;
      }

      path[i].state = 'path';
      i++;

      this.pathTimeout = setTimeout(() => {
        this.pathFrame = requestAnimationFrame(step);
      }, this.delay);
    };
    step();
  };

  //
  // Utils
  //
  private getStartingState = (x: number, y: number) => {
    let state: CellState = 'empty';
    if (x == 1 && y == 1) state = 'start';
    if (x == this.cols - 2 && y == this.rows - 2) state = 'target';
    return state;
  };

  private directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  private chooseOrientation = (width: number, height: number): Orientation => {
    if (width < height) {
      return 'vertical';
    } else if (height < width) {
      return 'horizontal';
    } else {
      return this.chooseOrientationRandom();
    }
  };

  private chooseOrientationRandom = (): Orientation => {
    return Math.round(Math.random()) ? 'horizontal' : 'vertical';
  };

  private getNeighbors = (grid: Grid, cell: GridCell) => {
    const neighbors: GridCell[] = [];
    for (const [dx, dy] of this.directions) {
      const x = cell.x + dx;
      const y = cell.y + dy;
      if (this.isValid(x, y)) {
        const n = grid[y][x];
        if (n.state != 'wall' && !n.visited) {
          neighbors.push(n);
        }
      }
    }
    return neighbors;
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
