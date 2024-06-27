// export type Grid = number[][];

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

