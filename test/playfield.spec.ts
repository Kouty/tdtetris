import {PlayField} from '../src/playfield';

describe('Playfield', function () {
    let fakeTetromino;

    beforeEach(function () {
        fakeTetromino = {width: 0, height: 0, fills: () => false};
    });

    it('should spawn a tetromino at the top row and in the middle column, rounding left', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 9);

        playField.spawn(fakeTetromino);

        expect(playField.tetromino.row).toBe(NUM_ROWS - 1);
        expect(playField.tetromino.col).toBe(3);
    });

});
