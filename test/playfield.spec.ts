import {PlayField} from '../src/playfield';

describe('Playfield', function () {

    it('should spawn tetrominoes', function () {
        const NUM_ROWS = 10;
        const playField = new PlayField(NUM_ROWS);

        playField.spawn({width: 0, height: 0});

        expect(playField.tetromino.row).toBe(NUM_ROWS - 1);
    });

});
