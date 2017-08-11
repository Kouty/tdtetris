import {Tetrominoes} from '../src/tetromino';

describe('Tetromino', function () {

    describe('I', function () {
        it('should have a containing rectangle', function () {
            const tetrominoI = Tetrominoes.I.create();

            expect(tetrominoI.width).toBe(4);
            expect(tetrominoI.height).toBe(4);
        });

        it('should fill the 2rd row', function () {
            const tetrominoI = Tetrominoes.I.create();

            const allIn3rdRow = tetrominoI.filledSquares().every((square) => {
                return square.col === 1;
            });

            expect(allIn3rdRow).toBe(true);
        });

    });

});
