export interface NodeColors {
    empty: string;
    wall: string;
    path: string;
    start: string;
    finish: string;
}

export type NodeState = keyof NodeColors;

export interface GridNode {
    position: number[];
    state: NodeState;
}

export type Grid = GridNode[];

export interface GridDimensions {
    rows: number;
    columns: number;
}

export interface GridGoals {
    start: number;
    finish: number;
}

