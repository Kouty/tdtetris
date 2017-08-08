import {PlayField} from './playfield';
import {TetrominoGenerator} from './tetrominoGenerator';

export class Tetris {
    private generator: TetrominoGenerator;
    private playField: PlayField;

    constructor(numRows: number, numCols: number) {
        this.generator = new TetrominoGenerator();
        this.playField = new PlayField(numRows, numCols);
    }

    public start(): void {
        const tetromino = this.generator.next();
        this.playField.spawn(tetromino);
    }

    public moveDown() {
        const moved = this.playField.tetromino.moveDown();

        if (!moved) {
            const tetromino = this.generator.next();
            this.playField.spawn(tetromino);
        }
    }
}
