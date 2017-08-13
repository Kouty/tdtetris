import {PlayField} from '../src/playfield';

describe('Playfield', function () {
    let oneCellTetromino;

    beforeEach(function () {
        oneCellTetromino = {width: 1, height: 1, filledCells: () => [{row: 0, col: 0}]};
    });

    it('should spawn a tetromino at the top row and in the middle column, rounding left', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);

        playField.spawn(oneCellTetromino);

        expect(playField.tetromino.row).toBe(NUM_ROWS - 1);
        expect(playField.tetromino.col).toBe(2);
    });

    it('should consider tetromino width when spawning it', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);
        const threeCellsTetromino = (Object as any).assign({}, oneCellTetromino, {width: 3});

        playField.spawn(threeCellsTetromino);

        expect(playField.tetromino.col).toBe(1);
    });

    it('should let the player move left the current moving tetromino', function () {
        const playField = new PlayField(20, 3);

        playField.spawn(oneCellTetromino);
        playField.tetromino.moveLeft();

        expect(playField.tetromino.col).toBe(0);
    });

    it('should let the player move right the current moving tetromino', function () {
        const playField = new PlayField(20, 3);

        playField.spawn(oneCellTetromino);
        playField.tetromino.moveRight();

        expect(playField.tetromino.col).toBe(2);
    });

    it('should let the player move down the current moving tetromino', function () {
        const playField = new PlayField(20, 3);

        playField.spawn(oneCellTetromino);
        playField.tetromino.moveDown();

        expect(playField.tetromino.row).toBe(18);
    });

    it('should return false if a new tetromino cannot spawn', function () {
        const playField = new PlayField(1, 3);

        playField.spawn(oneCellTetromino);
        playField.tetromino.moveDown();
        const spawned = playField.spawn(oneCellTetromino);

        expect(spawned).toBe(false);
    });

    it('should return true if a new tetromino can spawn', function () {
        const playField = new PlayField(1, 3);

        const spawned = playField.spawn(oneCellTetromino);

        expect(spawned).toBe(true);
    });
});
