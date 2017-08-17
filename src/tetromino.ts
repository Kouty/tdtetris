import {InterfaceRotation, IPosition, IRotation, ORotation} from './srsRotation';

export enum TetrominoType {
    I,
    O,
}

export interface ITetromino extends InterfaceRotation {
    width: number;
    height: number;
    type: TetrominoType;
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

class I extends IRotation implements ITetromino {

    public static create() {
        return new I();
    }

    public readonly width = 4;
    public readonly height = 4;
    public readonly type = TetrominoType.I;

}

class O extends ORotation implements ITetromino {

    public static create() {
        return new O();
    }

    public readonly width = 2;
    public readonly height = 2;
    public readonly type = TetrominoType.O;
}

const Tetrominoes = {
    I,
    O,
};
export {Tetrominoes};
