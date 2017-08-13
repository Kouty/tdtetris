import {PlayField} from '../src/playfield';

describe('Playfield bounds', function () {
    // Test Tetromino
    // ----
    // -oo-
    // -oo-
    // ----
    let testTetromino;
    beforeEach(function () {
        testTetromino = {
            height: 4,
            width: 4,
            filledCells() {
                return [{row: 1, col: 1}, {row: 1, col: 2}, {row: 2, col: 1}, {row: 2, col: 2}];
            },
        };
    });

    it('should not move the tetromino outside the left playfield bound', function () {
        const playField = new PlayField(20, 4);

        playField.spawn(testTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveLeft();

        // Min col is -1, since test tetromino fills the area between 1 and 2 squares in the center
        expect(playField.tetromino.col).toBe(-1);
    });

    it('should not move the tetromino outside the right playfield bound', function () {
        const playField = new PlayField(20, 4);

        playField.spawn(testTetromino);
        playField.tetromino.moveRight();
        playField.tetromino.moveRight();

        expect(playField.tetromino.col).toBe(1);
    });

    it('should not move the tetromino outside the bottom bound', function () {
        const playField = new PlayField(4, 4);

        playField.spawn(testTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();

        expect(playField.tetromino.row).toBe(2);
    });
});
