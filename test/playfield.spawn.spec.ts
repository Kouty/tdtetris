import {PlayField} from '../src/playfield';

describe('Playfield', function () {
    let oneSquareTetromino;

    beforeEach(function () {
        oneSquareTetromino = {width: 1, height: 1, filledCells: () => [{row: 0, col: 0}]};
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

    it('should return false if a new tetromino cannot spawn', function () {
        const playField = new PlayField(1, 3);

        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveDown();
        const spawned = playField.spawn(oneSquareTetromino);

        expect(spawned).toBe(false);
    });

    it('should return true if a new tetromino can spawn', function () {
        const playField = new PlayField(1, 3);

        const spawned = playField.spawn(oneSquareTetromino);

        expect(spawned).toBe(true);
    });
});
