import {InterfaceRotation, IPosition, IRotation, ORotation, TRotation} from './srsRotation';

export enum TetrominoType {
    I,
    O,
    T,
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

class T extends TRotation implements ITetromino {

    public static create() {
        return new T();
    }

    public readonly width = 3;
    public readonly height = 3;
    public readonly type = TetrominoType.T;
}

const Tetrominoes = {
    I,
    O,
    T,
};
export {Tetrominoes};
