import {PlayField} from '../src/playfield';

describe('Playfield locking', function () {
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

    it('should not move down if it causes overlapping with garbage cells', function () {
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

    it('should not move left if it causes overlapping with garbage cells', function () {
        const playField = new PlayField(2, 3);

        // |   |
        // |O  |
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown(); // Tetromino gets locked

        // |   |
        // |OO |
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveLeft();

        expect(playField.tetromino.col).toBe(1);
    });

    it('should not move right if it causes overlapping with garbage cells', function () {
        const playField = new PlayField(2, 3);

        // |   |
        // |  O|
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveRight();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown(); // Tetromino gets locked

        // |   |
        // | OO|
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveRight();

        expect(playField.tetromino.col).toBe(1);
    });

    it('should clear out rows completely filled with garbage cells', function () {
        const playField = new PlayField(2, 3);

        // |   |
        // |O  |
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();

        // |   |
        // |O O|
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveRight();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();

        // |   |
        // |OOO|
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();

        expect(playField.garbageArea.filled({row: 0, col: 1})).toBe(undefined);
    });

    it('should lock a tetromino if it touches a garbage cell', function () {
        const playField = new PlayField(2, 3);

        // |   |
        // |O  |
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();

        // |O  |
        // |O  |
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();

        expect(playField.garbageArea.filled({row: 1, col: 0})).not.toBe(undefined);
    });

    it('should move down garbage cells, after one or more rows has been cleared', function () {
        const playField = new PlayField(2, 3);

        // |   |
        // |O  |
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();

        // |   |
        // |O O|
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveRight();
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();

        // |O  |
        // |O O|
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveLeft();
        playField.tetromino.moveDown();

        // |O  |
        // |OOO|
        playField.spawn(oneSquareTetromino);
        playField.tetromino.moveDown();
        playField.tetromino.moveDown();

        // |   |
        // |O  |
        expect(playField.garbageArea.filled({row: 0, col: 0})).not.toBe(undefined);
    });
});
