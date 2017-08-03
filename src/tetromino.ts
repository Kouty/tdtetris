export interface ITetromino {
    width: number ;
    height: number;

    fills(row: number, col: number): boolean;
}

class I implements ITetromino {

    public static create() {
        return new I();
    }

    public readonly width = 4;
    public readonly height = 4;

    public fills(row, col) {
        return row === 2;
    }

}

const Tetrominoes = {
    I,
};
export {Tetrominoes};
