import {ITetromino} from './tetromino';

export interface IPosition {
    row: number;
    col: number;
}

export interface IPlacedTetromino extends IPosition, ITetromino {
    moveLeft(): void;
    moveRight(): void;
    moveDown(): void;
}

export class PlayField {
    private placedTetromino: PlacedTetromino;

    constructor(private numRows: number, private numCols: number) {
    }

    public spawn(tetromino: ITetromino) {
        const row: number = this.numRows - 1;
        const col: number = Math.floor((this.numCols - tetromino.width) / 2);
        this.placedTetromino = new PlacedTetromino(tetromino, {row, col});
    }

    get tetromino(): IPlacedTetromino {
        return this.placedTetromino;
    }

}

class PlacedTetromino implements IPlacedTetromino {
    private position: IPosition;

    constructor(private tetromino: ITetromino, position: IPosition) {
        this.position = {
            col: position.col,
            row: position.row,
        };
    }

    get row(): number {
        return this.position.row;
    }

    get col(): number {
        return this.position.col;
    }

    get width() {
        return this.tetromino.width;
    }

    get height() {
        return this.tetromino.height;
    }

    public fills(row, col) {
        return this.tetromino.fills(row, col);
    }

    public moveLeft() {
        this.position.col--;
    }

    public moveRight() {
        this.position.col++;
    }

    public moveDown() {
        this.position.row--;
    }
}
