import type { Grid } from './pathfinding.types';
import { writable } from 'svelte/store';

function createGrid(initialValue: Grid) {
    const grid = writable<Grid>(initialValue);

    function clearBoard() {
        grid.update((state) => {
            return { ...state, nodes: [] };
        });
    }

    return {
        ...grid,
        clearBoard
    };
}

const newGrid: Grid = { nodes: [] };
export const grid = createGrid(newGrid);
