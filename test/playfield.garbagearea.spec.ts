import {PlayField} from '../src/playfield';
import {ITetromino} from '../src/tetromino';

describe('Playfield locking', function () {
    let oneCellTetromino;

    beforeEach(function () {
        oneCellTetromino = {width: 1, height: 1, filledCells: () => [{row: 0, col: 0}]};
    });

    it('should return false when tetromino has not been moved down', function () {
        const playField = new PlayField(2, 5);
        let moved;

        playField.spawn(oneCellTetromino);

        moved = playField.tetromino.moveDown();
        expect(moved).toBe(true);

        moved = playField.tetromino.moveDown();
        expect(moved).toBe(false);
    });

    it('should not move down if it causes overlapping with garbage cells', function () {
        const playField = new PlayField(2, 5);

        // |     |
        // |  O  |
        playField.spawn(oneCellTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveDown(); // Tetromino gets locked

        // |  O  |
        // |  O  |
        playField.spawn(oneCellTetromino);
        const moved = playField.tetromino.moveDown();

        expect(moved).toBe(false);
    });

    it('should not move left if it causes overlapping with garbage cells', function () {
        const playField = new PlayField(2, 3);

        // |   |
        // |O  |
        playField.spawn(oneCellTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown(); // Tetromino gets locked

        // |   |
        // |OO |
        playField.spawn(oneCellTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveLeft();

        expect(playField.tetromino.col).toBe(1);
    });

    it('should not move right if it causes overlapping with garbage cells', function () {
        const playField = new PlayField(2, 3);

        // |   |
        // |  O|
        playField.spawn(oneCellTetromino);
        playField.tetromino.moveRight();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown(); // Tetromino gets locked

        // |   |
        // | OO|
        playField.spawn(oneCellTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveRight();

        expect(playField.tetromino.col).toBe(1);
    });

    it('should lock a tetromino if it touches a garbage cell', function () {
        const playField = new PlayField(3, 3);
        const I: ITetromino = {
            filledCells: () => [{row: 0, col: 0}, {row: 1, col: 0}],
            height: 2,
            rotateClockwise: () => null,
            rotateCounterClockwise: () => null,
            type: null,
            width: 1,
        };

        // |   |
        // |   |
        // |O  |
        playField.spawn(oneCellTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown(); // Locked

        // |I  |
        // |I  |
        // |O  |
        playField.spawn(I);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();

        expect(playField.garbageArea.filled({row: 1, col: 0})).not.toBe(undefined);
        expect(playField.garbageArea.filled({row: 2, col: 0})).not.toBe(undefined);
    });
});
