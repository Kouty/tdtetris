import {PlayField} from './playfield';
import {ITetromino} from './tetromino';
import {TetrominoGenerator} from './tetrominoGenerator';

export interface IPlayFieldModel {
    numRows: number;
    numCols: number;
    cells: ITetromino[];
}

export class Tetris {
    public readonly playField: PlayField;
    private generator: TetrominoGenerator;
    private gameOverDetected: boolean;

    constructor(numRows: number, numCols: number) {
        this.generator = new TetrominoGenerator();
        this.playField = new PlayField(numRows, numCols);
        this.gameOverDetected = false;
    }

    public start(): void {
        this.spawnNext();
    }

    public moveDown(): void {
        const moved = this.playField.tetromino.moveDown();

        if (!moved) {
            this.spawnNext();
        }
    }

    public moveRight(): void {
        this.playField.tetromino.moveRight();
    }

    public moveLeft(): void {
        this.playField.tetromino.moveLeft();
    }

    public rotateClockwise(): void {
        this.playField.tetromino.rotateClockwise();
    }

    public rotateCounterClockwise(): void {
        this.playField.tetromino.rotateCounterClockwise();
    }

    public gameOver(): boolean {
        return this.gameOverDetected;
    }

    public playFieldModel(): IPlayFieldModel {
        return Tetris.playFieldModel(this.playField);
    }

    /* tslint:disable member-ordering*/
    public static playFieldModel(playField: PlayField): IPlayFieldModel {
        const cells: ITetromino[] = [];
        const tetromino = playField.tetromino;
        const numCols = playField.numCols;
        const numRows = playField.numRows;

        const garbageArea = playField.garbageArea;
        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                const garbageCell = garbageArea.filled({row, col});
                if (garbageCell !== undefined) {
                    const rowInPlayField = numRows - 1 - row;
                    cells[rowInPlayField * numCols + col] = garbageCell;
                }
            }
        }

        tetromino.filledCells().forEach((cell) => {
            const row = numRows - 1 - cell.row;
            cells[row * numCols + cell.col] = tetromino;
        });

        return {
            cells,
            numCols: playField.numCols,
            numRows: playField.numRows,
        };
    }

    /* tslint:enable member-ordering*/

    private spawnNext(): void {
        const spawned = this.playField.spawn(this.generator.next());
        this.gameOverDetected = !spawned;
    }
}
