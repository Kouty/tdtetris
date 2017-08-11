import {GarbageArea, IGarbageAreaReadOnly} from './garbageArea';
import {ITetromino} from './tetromino';
import {IPosition} from './tetromino';
import {IPlacedTetromino} from './tetromino';

export class PlayField {
    private placedTetromino: PlacedTetromino;
    private garbageAreaImpl: GarbageArea;

    constructor(public readonly numRows: number, public readonly numCols: number) {
        this.garbageAreaImpl = new GarbageArea(this.numCols);
    }

    public spawn(tetromino: ITetromino) {
        const row: number = this.numRows - 1;
        const col: number = Math.floor((this.numCols - tetromino.width) / 2);
        this.placedTetromino = new PlacedTetromino(tetromino, {row, col},
            this.numCols,
            this.garbageAreaImpl);

        return !this.placedTetromino.garbageAreaContainsTetromino();
    }

    public get tetromino(): IPlacedTetromino {
        return this.placedTetromino;
    }

    get garbageArea(): IGarbageAreaReadOnly {
        return this.garbageAreaImpl;
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

    public filledSquaresInField(): IPosition[] {
        return this.tetromino.filledSquares().map((cell) => {
            return {row: this.position.row - cell.row, col: cell.col + this.position.col};
        });
    }

    public moveLeft() {
        this.position.col--;

        if (this.outsideLeftBound() || this.garbageAreaContainsTetromino()) {
            this.position.col++;
        }
    }

    public moveRight() {
        this.position.col++;
        if (this.outsideRightBound() || this.garbageAreaContainsTetromino()) {
            this.position.col--;
        }
    }

    public moveDown(): boolean {
        this.position.row--;
        let moved = true;
        if (this.outsideBottomBound() || this.garbageAreaContainsTetromino()) {
            this.position.row++;
            moved = false;
            this.addTetrominoToGarbageArea();
        }

        return moved;
    }

    public garbageAreaContainsTetromino() {
        return this.filledSquaresInField().some((square) => {
            return this.garbageArea.filled(square) !== undefined;
        });
    }

    private addTetrominoToGarbageArea() {
        this.tetromino.filledSquares().forEach((square) => {
            this.garbageArea.fill(
                {row: this.position.row - square.row, col: square.col + this.position.col},
                this.tetromino);
        });

        this.garbageArea.clearFilledRows();
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
