import {GarbageArea, IGarbageAreaReadOnly} from './garbageArea';
import {IPosition} from './srsRotation';
import {ITetromino} from './tetromino';
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

    get type() {
        return this.tetromino.type;
    }

    public filledCells(): IPosition[] {
        return this.tetromino.filledCells().map((cell) => {
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
        return this.filledCells().some((cell) => {
            return this.garbageArea.filled(cell) !== undefined;
        });
    }

    public rotateClockwise() {
        this.tetromino.rotateClockwise();
    }

    public rotateCounterClockwise() {
        this.tetromino.rotateCounterClockwise();
    }

    private addTetrominoToGarbageArea() {
        this.filledCells().forEach((cell) => {
            this.garbageArea.fill(cell, this.tetromino);
        });

        this.garbageArea.clearFilledRows();
    }

    private outsideLeftBound(): boolean {
        return this.filledCells().some((cell) => {
            return cell.col < 0;
        });
    }

    private outsideRightBound(): boolean {
        return this.filledCells().some((cell) => {
            return cell.col >= this.numCols;
        });
    }

    private outsideBottomBound(): boolean {
        return this.filledCells().some((cell) => {
            return cell.row < 0;
        });
    }
}
