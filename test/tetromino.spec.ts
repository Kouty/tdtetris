import {IRotation, JRotation, LRotation, ORotation, SRotation, TRotation, ZRotation} from '../src/srsRotation';
import {Tetrominoes} from '../src/tetromino';

describe('Tetromino', function () {

    describe('I', function () {
        it('should be of type I', function () {
            const tetrominoI = Tetrominoes.I.create();

            expect(tetrominoI.type).toBe(Tetrominoes.I);
        });

        it('should extends IRotation', function () {
            const tetrominoO = Tetrominoes.I.create();

            expect(tetrominoO instanceof IRotation).toBe(true);
        });
    });

    describe('O', function () {
        it('should be of type O', function () {
            const tetrominoO = Tetrominoes.O.create();

            expect(tetrominoO.type).toBe(Tetrominoes.O);
        });

        it('should extends ORotation', function () {
            const tetrominoO = Tetrominoes.O.create();

            expect(tetrominoO instanceof ORotation).toBe(true);
        });
    });

    describe('T', function () {
        it('should be of type T', function () {
            const tetrominoT = Tetrominoes.T.create();

            expect(tetrominoT.type).toBe(Tetrominoes.T);
        });

        it('should extends TRotation', function () {
            const tetrominoT = Tetrominoes.T.create();

            expect(tetrominoT instanceof TRotation).toBe(true);
        });
    });

    describe('S', function () {
        it('should be of type S', function () {
            const tetrominoS = Tetrominoes.S.create();

            expect(tetrominoS.type).toBe(Tetrominoes.S);
        });

        it('should extends TRotation', function () {
            const tetrominoS = Tetrominoes.S.create();

            expect(tetrominoS instanceof SRotation).toBe(true);
        });
    });

    describe('Z', function () {
        it('should be of type Z', function () {
            const tetrominoZ = Tetrominoes.Z.create();

            expect(tetrominoZ.type).toBe(Tetrominoes.Z);
        });

        it('should extends ZRotation', function () {
            const tetrominoZ = Tetrominoes.Z.create();

            expect(tetrominoZ instanceof ZRotation).toBe(true);
        });
    });

    describe('J', function () {
        it('should be of type J', function () {
            const tetrominoJ = Tetrominoes.J.create();

            expect(tetrominoJ.type).toBe(Tetrominoes.J);
        });

        it('should extends JRotation', function () {
            const tetrominoJ = Tetrominoes.J.create();

            expect(tetrominoJ instanceof JRotation).toBe(true);
        });
    });

    describe('L', function () {
        it('should be of type L', function () {
            const tetrominoL = Tetrominoes.L.create();

            expect(tetrominoL.type).toBe(Tetrominoes.L);
        });

        it('should extends LRotation', function () {
            const tetrominoL = Tetrominoes.L.create();

            expect(tetrominoL instanceof LRotation).toBe(true);
        });
    });
});
