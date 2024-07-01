import { derived, writable } from 'svelte/store';
import type { Readable } from 'svelte/motion';
import type { Grid, Coordinates, CellState } from './pathfinding.types';

function createGrid(initialValues: Grid) {
    const grid = writable<Grid>(initialValues);

    function updateState(x: number, y: number, nodeState: CellState) {
        grid.update((state) => {
            state[y][x].state = nodeState;
            return [...state];
        });
    }

    function clearPath() {
        grid.update((state) => {
            const rows = state.length;
            const cols = state[0].length;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const cell = state[y][x];
                    if (cell.state === 'path') {
                        cell.state = 'empty';
                    }
                }
            }

            return [...state];
        });
    }

    function clearBoard() {
        grid.update((state) => {
            const rows = state.length;
            const cols = state[0].length;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const cell = state[y][x];
                    if (cell.state === 'path' || cell.state === 'wall') {
                        cell.state = 'empty';
                    }
                }
            }

            return [...state];
        });
    }

    function reset() {
        grid.update((state) => {
            const rows = state.length;
            const cols = state[0].length;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    state[y][x].state = 'empty';
                }
            }

            return [...state];
        });
    }

    return {
        ...grid,
        updateState,
        clearPath,
        clearBoard,
        reset
    };
}
export const grid = createGrid([]);

export const gridStart: Readable<Coordinates> = derived(grid, ($grid) => {
    const rows = $grid.length;
    const cols = $grid[0].length;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = $grid[y][x];
            if (cell.state === 'start') {
                return { x, y };
            }
        }
    }

    return { x: 2, y: 2 };
});

export const gridFinish: Readable<Coordinates> = derived(grid, ($grid) => {
    const rows = $grid.length;
    const cols = $grid[0].length;

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = $grid[y][x];
            if (cell.state === 'finish') {
                return { x, y };
            }
        }
    }

    return { x: cols - 3, y: rows - 3 };
});
