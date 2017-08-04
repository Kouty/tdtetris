import {PlayField} from '../src/playfield';

describe('Playfield', function () {
    let oneSquareTetromino;

    beforeEach(function () {
        oneSquareTetromino = {width: 1, height: 1, filledSquares: () => [{row: 0, col: 0}]};
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
                filledSquares() {
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
});
