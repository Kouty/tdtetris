import {PlayField} from './playfield';
import {TetrominoGenerator} from './tetrominoGenerator';

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

    public gameOver(): boolean {
        return this.gameOverDetected;
    }

    private spawnNext(): void {
        const spawned = this.playField.spawn(this.generator.next());
        this.gameOverDetected = !spawned;
    }
}
