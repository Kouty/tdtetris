export interface ITetromino {
    width: number ;
    height: number;
}

class I implements ITetromino {

    public static create() {
        return new I();
    }

    public readonly width = 4;
    public readonly height = 4;

}

const Tetrominoes = {
    I,
};
export {Tetrominoes};
