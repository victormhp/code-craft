import { randomNumber } from '$lib/utils';
import type { Grid, Orientation } from './pathfinding.types';

//
// Utils
//
export function chooseOrientation(width: number, height: number): Orientation {
  if (width < height) {
    return 'vertical';
  } else if (height < width) {
    return 'horizontal';
  } else {
    return Math.round(Math.random()) ? 'horizontal' : 'vertical';
  }
}

//
// Maze generation algorithms
//
export function recursiveDivision(
  grid: Grid,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) {
  if (endY - startY <= 3 || endX - startX <= 3) return;

  const possibleWalls = [];
  const possiblePassages = [];

  const orientation = chooseOrientation(endX - startX, endY - startY);
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

    recursiveDivision(grid, startX, startY, endX, wallY);
    recursiveDivision(grid, startX, wallY, endX, endY);
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

    recursiveDivision(grid, startX, startY, wallX, endY);
    recursiveDivision(grid, wallX, startY, endX, endY);
  }
}

//
// Pathfinding Algorithms
//
function depthFirstSearch() {

}
