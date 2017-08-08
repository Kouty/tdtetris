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
        this.spawnNext();
    }

    public moveDown() {
        const moved = this.playField.tetromino.moveDown();

        if (!moved) {
            this.spawnNext();
        }
    }

    private spawnNext() {
        this.playField.spawn(this.generator.next());
    }
}
