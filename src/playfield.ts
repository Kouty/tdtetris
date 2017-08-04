import {ITetromino} from './tetromino';
import {IPosition} from './tetromino';
import {IPlacedTetromino} from './tetromino';

export class PlayField {
    private placedTetromino: PlacedTetromino;
    private garbageArea: GarbageArea;

    constructor(private numRows: number, private numCols: number) {
        this.garbageArea = new GarbageArea(this.numCols);
    }

    public spawn(tetromino: ITetromino) {
        const row: number = this.numRows - 1;
        const col: number = Math.floor((this.numCols - tetromino.width) / 2);
        this.placedTetromino = new PlacedTetromino(tetromino, {row, col},
            this.numCols,
            this.garbageArea);
    }

    get tetromino(): IPlacedTetromino {
        return this.placedTetromino;
    }

}

class GarbageArea {
    private area: ITetromino[];

    constructor(private numCols) {
        this.area = [];
    }

    public fill(position: IPosition, tetromino: ITetromino): void {
        this.area[position.row * this.numCols + position.col] = tetromino;
    }

    public filled(position: IPosition) {
        return this.area[position.row * this.numCols + position.col];
    }
}

class PlacedTetromino implements IPlacedTetromino {
    private position: IPosition;

    constructor(private tetromino: ITetromino,
                position: IPosition, private numCols: number,
                private garbageArea: GarbageArea) {
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
        if (this.garbageAreaContainsTetromino()) {
            this.position.row++;
            moved = false;
        } else if (this.outsideBottomBound()) {
            this.position.row++;
            moved = false;
            this.addTetrominoToGarbageArea();
        }

        return moved;
    }

    private addTetrominoToGarbageArea() {
        this.tetromino.filledSquares().forEach((square) => {
            this.garbageArea.fill(
                {row: this.position.row - square.row, col: square.col + this.position.col},
                this.tetromino);
        });
    }

    private garbageAreaContainsTetromino() {
        return this.tetromino.filledSquares().some((square) => {
            return this.garbageArea.filled(
                {row: this.position.row - square.row, col: square.col + this.position.col}) !== undefined;
        });
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
