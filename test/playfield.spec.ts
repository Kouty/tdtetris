import {PlayField} from '../src/playfield';

describe('Playfield', function () {
    let oneSquareTetromino;

    beforeEach(function () {
        oneSquareTetromino = {width: 1, height: 1, fills: () => false};
    });

    it('should spawn a tetromino at the top row and in the middle column, rounding left', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);

        playField.spawn(oneSquareTetromino);

        expect(playField.tetromino.row).toBe(NUM_ROWS - 1);
        expect(playField.tetromino.col).toBe(2);
    });

    it('should consider tetromino width when spawning it', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);
        const threeSquaresTetromino = (Object as any).assign({}, oneSquareTetromino, {width: 3});

        playField.spawn(threeSquaresTetromino);

        expect(playField.tetromino.col).toBe(1);
    });

    it('should let the player move left the current moving tetromino', function () {
        const playField = new PlayField(20, 3);

        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveLeft();

        expect(playField.tetromino.col).toBe(0);
    });

    it('should let the player move right the current moving tetromino', function () {
        const playField = new PlayField(20, 3);

        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveRight();

        expect(playField.tetromino.col).toBe(2);
    });

    it('should let the player move down the current moving tetromino', function () {
        const playField = new PlayField(20, 3);

        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveDown();

        expect(playField.tetromino.row).toBe(18);
    });

    describe('Playfield bounds', function () {
        // ----
        // -oo-
        // -oo-
        // ----
        let testTetronimo;
        beforeEach(function () {
            testTetronimo = {
                height: 4,
                width: 4,
                fills(row, col) {
                    return (1 <= row && row >= 2) && (1 <= col && col >= 2);
                },
            };
        });

        it('should not move the tetromino outside the left playfield edge', function () {

        });
    });
});
