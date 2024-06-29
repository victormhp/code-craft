import { derived, writable } from 'svelte/store';
import type { Readable } from 'svelte/motion';
import type { Grid, GridDimensions, GridGoals, NodeState } from './pathfinding.types';

function createGrid(initialValues: Grid) {
    const grid = writable<Grid>(initialValues);

    function updateState(id: number, nodeState: NodeState) {
        grid.update((state) => {
            state[id].state = nodeState;
            return [...state];
        });
    }

    function clearPath() {
        grid.update((state) =>
            state.map((node) => {
                if (node.state === 'path') {
                    return { ...node, state: 'empty' };
                }
                return node;
            })
        );
    }

    function clearBoard() {
        grid.update((state) =>
            state.map((node) => {
                if (node.state === 'wall' || node.state === 'path') {
                    return { ...node, state: 'empty' };
                }
                return node;
            })
        );
    }

    function reset(start: number, finish: number) {
        grid.update((state) => {
            state.forEach((node) => (node.state = 'empty'));
            state[start].state = 'start';
            state[finish].state = 'finish';
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

export const gridStart = derived(grid, ($grid) => {
    return $grid.findIndex((cell) => cell.state === 'start');
});

export const gridFinish = derived(grid, ($grid) => {
    return $grid.findIndex((cell) => cell.state === 'finish');
});

export const gridDimensions = writable<GridDimensions>({} as GridDimensions);

export const gridGoals: Readable<GridGoals> = derived(gridDimensions, ($gridDimensions) => {
    const startId = $gridDimensions.columns * 2 + 2;
    const finishId = $gridDimensions.columns * ($gridDimensions.rows - 2) - 3;
    return {
        start: startId,
        finish: finishId
    };
});
