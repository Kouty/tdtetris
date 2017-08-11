import {ITetromino, Tetrominoes} from './tetromino';

export class TetrominoGenerator {
    public next(): ITetromino {
        return Tetrominoes.I.create();
    }
}
