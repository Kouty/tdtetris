import {
    InterfaceRotation, IPosition, IRotation, JRotation, LRotation, ORotation, SRotation, TRotation,
    ZRotation
} from './srsRotation';

export enum TetrominoType {
    I,
    J,
    L,
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

class J extends JRotation implements ITetromino {

    public static create() {
        return new J();
    }

    public readonly type = TetrominoType.J;
}

class L extends LRotation implements ITetromino {

    public static create() {
        return new L();
    }

    public readonly type = TetrominoType.L;
}

const Tetrominoes = {
    I,
    J,
    L,
    O,
    S,
    T,
    Z,
};
export {Tetrominoes};
