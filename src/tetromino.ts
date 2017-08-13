export interface ITetromino {
    width: number ;
    height: number;

    filledSquares(): IPosition[];
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
     * Overrides ITetromino filledSquares to consider its own position
     * @returns {IPosition[]}
     */
    filledSquares(): IPosition[];
}

class I implements ITetromino {

    public static create() {
        return new I();
    }

    public readonly width = 4;
    public readonly height = 4;

    public filledSquares() {
        return [{row: 0, col: 1}, {row: 1, col: 1}, {row: 2, col: 1}, {row: 3, col: 1}];
    }
}

const Tetrominoes = {
    I,
};
export {Tetrominoes};
