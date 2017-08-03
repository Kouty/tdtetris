import {PlayField} from '../src/playfield';

describe('Playfield', function () {
    const fakeTetromino = {width: 0, height: 0, fills: () => false};

    it('should spawn tetrominoes', function () {
        const NUM_ROWS = 10;
        const playField = new PlayField(NUM_ROWS);

        playField.spawn(fakeTetromino);

        expect(playField.tetromino.row).toBe(NUM_ROWS - 1);
    });

});
