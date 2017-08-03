import {Tetrominoes} from '../src/tetromino';

describe('Tetromino', function () {

    describe('I', function () {
        it('should have a containing rectangle', function () {
            const tetrominoI = Tetrominoes.I.create();

            expect(tetrominoI.width).toBe(4);
            expect(tetrominoI.height).toBe(4);
        });

        it('should fill the 3rd row', function () {
            const tetrominoI = Tetrominoes.I.create();

            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    const shouldFill = row === 2;
                    expect(shouldFill).toBe(tetrominoI.fills(row, col));
                }
            }
        });
    });

});
