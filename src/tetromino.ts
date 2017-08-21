import {
    InterfaceRotation, IPosition, IRotation, JRotation, LRotation, ORotation, SRotation, TRotation, ZRotation,
} from './srsRotation';

export interface ITetromino extends InterfaceRotation {
    width: number;
    height: number;
    type: { new(): ITetromino; };
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

    public readonly type = I;

}

class O extends ORotation implements ITetromino {

    public static create() {
        return new O();
    }

    public readonly type = O;
}

class T extends TRotation implements ITetromino {

    public static create() {
        return new T();
    }

    public readonly type = T;
}

class S extends SRotation implements ITetromino {

    public static create() {
        return new S();
    }

    public readonly type = S;
}

class Z extends ZRotation implements ITetromino {

    public static create() {
        return new Z();
    }

    public readonly type = Z;
}

class J extends JRotation implements ITetromino {

    public static create() {
        return new J();
    }

    public readonly type = J;
}

class L extends LRotation implements ITetromino {

    public static create() {
        return new L();
    }

    public readonly type = L;
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
