export interface Grid {
    nodes: GridNode[];
}

type GridNodeType = 'Empty' | 'Wall' | 'Start' | 'Finish' | 'Path';

export interface GridNode {
    xPos: number;
    yPos: number;
    nodeType: GridNodeType;
}
