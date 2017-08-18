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

        it('should be of type O', function () {
            const tetrominoO = Tetrominoes.O.create();

            expect(tetrominoO.type).toBe(TetrominoType.O);
        });

    });

    describe('T', function () {
        it('should have a containing rectangle', function () {
            const tetrominoT = Tetrominoes.T.create();

            expect(tetrominoT.width).toBe(3);
            expect(tetrominoT.height).toBe(3);
        });

        it('should be of type T', function () {
            const tetrominoT = Tetrominoes.T.create();

            expect(tetrominoT.type).toBe(TetrominoType.T);
        });

    });

});
