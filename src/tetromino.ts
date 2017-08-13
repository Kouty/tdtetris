export enum TetrominoType {
    I,
}

export interface ITetromino {
    width: number;
    height: number;
    type: TetrominoType;

    filledCells(): IPosition[];
}

export interface IPosition {
    row: number;
    col: number;
}

export interface IPlacedTetromino extends IPosition, ITetromino {

    moveLeft(): void;

    moveRight(): void;

    moveDown(): boolean;

    /**
     * Overrides ITetromino filledCells to consider its own position
     * @returns {IPosition[]}
     */
    filledCells(): IPosition[];
}

class I implements ITetromino {

    public static create() {
        return new I();
    }

    public readonly width = 4;
    public readonly height = 4;
    public readonly type = TetrominoType.I;

    public filledCells() {
        return [{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}, {row: 3, col: 1}];
    }
}

const Tetrominoes = {
    I,
};
export {Tetrominoes};
