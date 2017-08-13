import {ITetromino, Tetrominoes} from './tetromino';

export class TetrominoGenerator {
    public next(): ITetromino {
        const tetrominos = Object.keys(Tetrominoes);
        const rand = getRandomInt(0, tetrominos.length);

        return Tetrominoes[tetrominos[rand]].create();
    }
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
