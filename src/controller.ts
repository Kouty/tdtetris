import {PlayField} from './playfield';
import {TetrominoGenerator} from './tetrominoGenerator';

export class Tetris {
    private generator: TetrominoGenerator;
    private playField: PlayField;

    constructor() {
        this.generator = new TetrominoGenerator();
        this.playField = new PlayField(20, 10);
    }

    public start(): void {
        const tetromino = this.generator.next();
        this.playField.spawn(tetromino);
    }
}
