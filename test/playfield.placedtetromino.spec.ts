import {PlayField} from '../src/playfield';
import {ITetromino} from '../src/tetromino';

describe('Playfield', function () {
    let oneCellTetromino: ITetromino;

    beforeEach(function () {
        oneCellTetromino = {
            filledCells: () => [{row: 0, col: 0}],
            height: 1,
            rotateClockwise: jasmine.createSpy('rotateClockwise'),
            rotateCounterClockwise: jasmine.createSpy('rotateCounterClockwise'),
            type: null,
            width: 1,
        };
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

    it('should return filled cells considering its own position', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);

        playField.spawn(oneCellTetromino);
        const cell = playField.tetromino.filledCells()[0];

        expect(cell.row).toBe(NUM_ROWS - 1);
        expect(cell.col).toBe(2);
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

    it('should rotate clockwise', function () {
        const playField = new PlayField(10, 3);

        playField.spawn(oneCellTetromino);
        playField.tetromino.rotateClockwise();

        expect(oneCellTetromino.rotateClockwise).toHaveBeenCalled();
    });

    it('should rotate counter clockwise', function () {
        const playField = new PlayField(10, 3);

        playField.spawn(oneCellTetromino);
        playField.tetromino.rotateCounterClockwise();

        expect(oneCellTetromino.rotateCounterClockwise).toHaveBeenCalled();
    });

});
