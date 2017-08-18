import {PlayField} from '../src/playfield';
import {Tetrominoes} from '../src/tetromino';

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

        // Min col is -1, since test tetromino fills the area between 1 and 2 cells in the center
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

    describe('Rotation restrictions', function () {
        let playField;

        beforeEach(function () {
            // |    |
            // |IIII|
            // |    |
            // |    |
            playField = new PlayField(4, 4);
            playField.spawn(Tetrominoes.I.create());
        });

        it('should not rotate if it causes the tetromino to be outside left bound', function () {
            playField.tetromino.rotateCounterClockwise();
            playField.tetromino.moveLeft();

            expectDidNotRotate('rotateCounterClockwise');
            expectDidNotRotate('rotateClockwise');
        });

        it('should not rotate if it causes the tetromino to be outside right bound', function () {
            playField.tetromino.rotateClockwise();
            playField.tetromino.moveRight();

            expectDidNotRotate('rotateCounterClockwise');
            expectDidNotRotate('rotateClockwise');
        });

        it('should not rotate if it causes the tetromino to be outside bottom bound', function () {
            playField.tetromino.moveDown();

            expectDidNotRotate('rotateCounterClockwise');
            expectDidNotRotate('rotateClockwise');
        });

        it('should not rotate if it causes the tetromino to be overlap garbage area', function () {
            // |    |
            // |    |
            // |OO  |
            // |OO  |
            playField.spawn(Tetrominoes.O.create());
            playField.tetromino.moveLeft();
            playField.tetromino.moveDown();
            playField.tetromino.moveDown();
            playField.tetromino.moveDown();

            // |  I |
            // |  I |
            // |OOI |
            // |OOI |
            playField.spawn(Tetrominoes.I.create());
            playField.tetromino.rotateClockwise();

            expectDidNotRotate('rotateClockwise');
        });

        it('should not rotate if it causes the tetromino to be overlap garbage area', function () {
            // |    |
            // |    |
            // |  OO|
            // |  OO|
            playField.spawn(Tetrominoes.O.create());
            playField.tetromino.moveRight();
            playField.tetromino.moveDown();
            playField.tetromino.moveDown();
            playField.tetromino.moveDown();

            // | I  |
            // | I  |
            // | IOO|
            // | IOO|
            playField.spawn(Tetrominoes.I.create());
            playField.tetromino.rotateCounterClockwise();

            expectDidNotRotate('rotateCounterClockwise');
        });

        function expectDidNotRotate(rotationFunction) {
            const filledCellsBefore = playField.tetromino.filledCells().slice();
            playField.tetromino[rotationFunction]();
            const filledCellsAfter = playField.tetromino.filledCells().slice();
            expect(filledCellsBefore).toEqual(filledCellsAfter);
        }
    });

});
