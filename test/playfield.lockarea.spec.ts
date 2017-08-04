import {PlayField} from '../src/playfield';

describe('Playfield locking ', function () {
    let oneSquareTetromino;

    beforeEach(function () {
        oneSquareTetromino = {width: 1, height: 1, filledSquares: () => [{row: 0, col: 0}]};
    });

    it('should return false when tetromino has not been moved down', function () {
        const playField = new PlayField(2, 5);
        let moved;

        playField.spawn(oneSquareTetromino);

        moved = playField.tetromino.moveDown();
        expect(moved).toBe(true);

        moved = playField.tetromino.moveDown();
        expect(moved).toBe(false);
    });

    it(' should not move down when overlapping locked cells', function () {
        const playField = new PlayField(2, 5);

        // |     |
        // |  O  |
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveDown(); // Tetromino gets locked

        // |  O  |
        // |  O  |
        playField.spawn(oneSquareTetromino);
        const moved = playField.tetromino.moveDown();
        expect(moved).toBe(false);
    });

});
