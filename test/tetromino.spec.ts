import {Tetrominoes, TetrominoType} from '../src/tetromino';
import {IRotation, ORotation, TRotation} from '../src/srsRotation';

describe('Tetromino', function () {

    describe('I', function () {
        it('should be of type I', function () {
            const tetrominoI = Tetrominoes.I.create();

            expect(tetrominoI.type).toBe(TetrominoType.I);
        });

        it('should extends IRotation', function () {
            const tetrominoO = Tetrominoes.I.create();

            expect(tetrominoO instanceof IRotation).toBe(true);
        });
    });

    describe('O', function () {
        it('should be of type O', function () {
            const tetrominoO = Tetrominoes.O.create();

            expect(tetrominoO.type).toBe(TetrominoType.O);
        });

        it('should extends ORotation', function () {
            const tetrominoO = Tetrominoes.O.create();

            expect(tetrominoO instanceof ORotation).toBe(true);
        });
    });

    describe('T', function () {
        it('should be of type T', function () {
            const tetrominoT = Tetrominoes.T.create();

            expect(tetrominoT.type).toBe(TetrominoType.T);
        });

        it('should extends TRotation', function () {
            const tetrominoT = Tetrominoes.T.create();

            expect(tetrominoT instanceof TRotation).toBe(true);
        });
    });

});
