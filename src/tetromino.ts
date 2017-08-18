import {InterfaceRotation, IPosition, IRotation, ORotation, SRotation, TRotation, ZRotation} from './srsRotation';

export enum TetrominoType {
    I,
    O,
    T,
    S,
    Z,
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

    public readonly type = TetrominoType.I;

}

class O extends ORotation implements ITetromino {

    public static create() {
        return new O();
    }

    public readonly type = TetrominoType.O;
}

class T extends TRotation implements ITetromino {

    public static create() {
        return new T();
    }

    public readonly type = TetrominoType.T;
}

class S extends SRotation implements ITetromino {

    public static create() {
        return new S();
    }

    public readonly type = TetrominoType.S;
}

class Z extends ZRotation implements ITetromino {

    public static create() {
        return new Z();
    }

    public readonly type = TetrominoType.Z;
}

const Tetrominoes = {
    I,
    O,
    S,
    T,
    Z,
};
export {Tetrominoes};
