import {ITetromino} from './tetromino';
import {IPosition} from './tetromino';
import {IPlacedTetromino} from './tetromino';

export class PlayField {
    private placedTetromino: PlacedTetromino;

    constructor(private numRows: number, private numCols: number) {
    }

    public spawn(tetromino: ITetromino) {
        const row: number = this.numRows - 1;
        const col: number = Math.floor((this.numCols - tetromino.width) / 2);
        this.placedTetromino = new PlacedTetromino(tetromino, {row, col}, this.numCols);
    }

    get tetromino(): IPlacedTetromino {
        return this.placedTetromino;
    }

}

class PlacedTetromino implements IPlacedTetromino {
    private position: IPosition;

    constructor(private tetromino: ITetromino, position: IPosition, private numCols: number) {
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

    public filledSquares(): IPosition[] {
        return this.tetromino.filledSquares();
    }

    public moveLeft() {
        this.position.col--;
        if (this.outsideLeftBound()) {
            this.position.col++;
        }
    }

    public moveRight() {
        this.position.col++;
        if (this.outsideRightBound()) {
            this.position.col--;
        }
    }

    public moveDown(): boolean {
        this.position.row--;
        let moved = true;
        if (this.outsideBottomBound()) {
            this.position.row++;
            moved = false;
        }

        return moved;
    }

    private outsideLeftBound(): boolean {
        return this.tetromino.filledSquares().some((square) => {
            return square.col + this.position.col < 0;
        });
    }

    private outsideRightBound(): boolean {
        return this.tetromino.filledSquares().some((square) => {
            return square.col + this.position.col >= this.numCols;
        });
    }

    private outsideBottomBound(): boolean {
        return this.tetromino.filledSquares().some((square) => {
            return -square.row + this.position.row < 0;
        });
    }
}
