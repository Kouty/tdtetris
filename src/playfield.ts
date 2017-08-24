import {GarbageArea, IGarbageAreaReadOnly} from './garbageArea';
import {IPosition} from './srsRotation';
import {ITetromino} from './tetromino';
import {IPlacedTetromino} from './tetromino';

export class PlayField {
    private placedTetromino: PlacedTetromino;
    private garbageAreaImpl: GarbageArea;
    private lockListener: (this: void) => void;
    private clearListener: (this: void, numRowsCleared: number) => void;

    constructor(public readonly numRows: number, public readonly numCols: number) {
        this.garbageAreaImpl = new GarbageArea(this.numCols);
        this.lockListener = () => undefined;
        this.clearListener = () => undefined;
    }

    public spawn(tetromino: ITetromino) {
        const row: number = this.numRows - 1;
        const col: number = Math.floor((this.numCols - tetromino.width) / 2);
        this.placedTetromino = new PlacedTetromino(tetromino, {row, col},
            this.numCols,
            this.garbageAreaImpl,
            {
                onGarbageRowsClear: (numRowsCleared: number) => {
                    this.clearListener(numRowsCleared);
                },
                onLock: () => {
                    this.lockListener();
                },
            });

        return !this.placedTetromino.garbageAreaContainsTetromino();
    }

    public get tetromino(): IPlacedTetromino {
        return this.placedTetromino;
    }

    get garbageArea(): IGarbageAreaReadOnly {
        return this.garbageAreaImpl;
    }

    public onLock(lockListener: (this: void) => void): void {
        this.lockListener = lockListener;
    }

    public onGarbageRowsClear(clearListener: (this: void, numRowsCleared: number) => void): void {
        this.clearListener = clearListener;
    }

}

interface IEventsHandler {
    onLock(): void;

    onGarbageRowsClear(numRowsCleared: number);
}

class PlacedTetromino implements IPlacedTetromino {
    private position: IPosition;

    constructor(private tetromino: ITetromino,
                position: IPosition,
                private numCols: number,
                private garbageArea: GarbageArea,
                private eventsHandler: IEventsHandler) {
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
        if (this.outsideBounds() || this.garbageAreaContainsTetromino()) {
            this.tetromino.rotateCounterClockwise();
        }
    }

    public rotateCounterClockwise() {
        this.tetromino.rotateCounterClockwise();
        if (this.outsideBounds() || this.garbageAreaContainsTetromino()) {
            this.tetromino.rotateClockwise();
        }
    }

    private outsideBounds() {
        return this.outsideLeftBound() || this.outsideRightBound() || this.outsideBottomBound();
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

    private addTetrominoToGarbageArea() {
        this.filledCells().forEach((cell) => {
            this.garbageArea.fill(cell, this.tetromino);
        });
        this.eventsHandler.onLock();

        const numCleared = this.garbageArea.clearFilledRows();

        this.eventsHandler.onGarbageRowsClear(numCleared);
    }
}
