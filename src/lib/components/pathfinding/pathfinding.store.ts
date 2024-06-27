import { derived, writable } from 'svelte/store';
import type { Grid, GridNode, NodeState } from './pathfinding.types';

function createGrid(initialValues: Grid) {
    const grid = writable<Grid>(initialValues);

    function add(node: GridNode) {
        grid.update((state) => [...state, node]);
    }

    function updateState(id: number, nodeState: NodeState) {
        grid.update((state) => {
            state[id].state = nodeState;
            return [...state];
        });
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

    function reset() {
        grid.set([]);
    }

    return {
        ...grid,
        add,
        updateState,
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
