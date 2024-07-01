export interface CellColors {
    empty: string;
    wall: string;
    path: string;
    start: string;
    finish: string;
}

export type CellState = keyof CellColors;

export interface Coordinates {
    x: number;
    y: number;
}

export interface GridCell {
    coordinates: Coordinates;
    state: CellState;
}

export type Grid = GridCell[][];
