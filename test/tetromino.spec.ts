import {Tetrominoes, TetrominoType} from '../src/tetromino';

describe('Tetromino', function () {

    describe('I', function () {
        it('should have a containing rectangle', function () {
            const tetrominoI = Tetrominoes.I.create();

            expect(tetrominoI.width).toBe(4);
            expect(tetrominoI.height).toBe(4);
        });

        it('should be of type I', function () {
            const tetrominoI = Tetrominoes.I.create();

            expect(tetrominoI.type).toBe(TetrominoType.I);
        });

    });

    describe('O', function () {
        it('should have a containing rectangle', function () {
            const tetrominoO = Tetrominoes.O.create();

            expect(tetrominoO.width).toBe(2);
            expect(tetrominoO.height).toBe(2);
        });

        it('should fill all its area', function () {
            const tetrominoO = Tetrominoes.O.create();

            expect(tetrominoO.filledCells().length).toBe(4);
            expect(tetrominoO.filledCells()).toContain({row: 0, col: 0});
            expect(tetrominoO.filledCells()).toContain({row: 1, col: 0});
            expect(tetrominoO.filledCells()).toContain({row: 0, col: 1});
            expect(tetrominoO.filledCells()).toContain({row: 1, col: 1});
        });
    });

});
