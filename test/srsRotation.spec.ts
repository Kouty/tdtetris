import {
    IRotation,
    JRotation,
    LRotation,
    MatrixRotation,
    ORotation,
    SRotation,
    TRotation,
    ZRotation,
} from '../src/srsRotation';

describe('SRS Rotation system', function () {

    describe('MatrixRotation', function () {
        let matrixRotation;

        beforeEach(function () {
            const testMatrix = [
                1, 0,
                0, 0];

            matrixRotation = new MatrixRotation(testMatrix, 2);
        });

        it('should rotate clockwise', function () {
            matrixRotation.rotateClockwise();

            expect(matrixRotation.matrix).toEqual([
                0, 1,
                0, 0]);
        });

        it('should rotate clockwise twice', function () {
            matrixRotation.rotateClockwise();
            matrixRotation.rotateClockwise();

            expect(matrixRotation.matrix).toEqual([
                0, 0,
                0, 1]);
        });

        it('should rotate clockwise 3 times', function () {
            matrixRotation.rotateClockwise();
            matrixRotation.rotateClockwise();
            matrixRotation.rotateClockwise();

            expect(matrixRotation.matrix).toEqual([
                0, 0,
                1, 0]);
        });

        it('rotating 4 times should be equal to not rotating', function () {
            matrixRotation.rotateClockwise();
            matrixRotation.rotateClockwise();
            matrixRotation.rotateClockwise();
            matrixRotation.rotateClockwise();

            expect(matrixRotation.matrix).toEqual([
                1, 0,
                0, 0]);
        });

        it('rotate counter clockwise', function () {
            matrixRotation.rotateCounterClockwise();

            expect(matrixRotation.matrix).toEqual([
                0, 0,
                1, 0]);
        });

        it('rotate clockwise and then rotate counterClockwise should restore initial position', function () {
            matrixRotation.rotateClockwise();
            matrixRotation.rotateCounterClockwise();

            expect(matrixRotation.matrix).toEqual([
                1, 0,
                0, 0]);
        });
    });

    describe('"I" rotation', function () {
        it('should spawn with  the 2nd row filled', function () {
            const iRotation = new IRotation();

            const allIn3rdRow = iRotation.filledCells().length > 0 &&
                iRotation.filledCells().every((cell) => {
                    return cell.row === 1;
                });

            expect(allIn3rdRow).toBe(true);
        });

        it('should use MatrixRotation', function () {
            const iRotation = new IRotation();

            expect(iRotation instanceof MatrixRotation).toBe(true);
        });

    });

    describe('"O" rotation', function () {
        it('should spawn filling a square 2x2 starting from row 1', function () {
            const oRotation = new ORotation();

            expect(oRotation.filledCells().length).toBe(4);
            expect(oRotation.filledCells()).toContain({col: 0, row: 0});
            expect(oRotation.filledCells()).toContain({col: 1, row: 0});
            expect(oRotation.filledCells()).toContain({col: 0, row: 1});
            expect(oRotation.filledCells()).toContain({col: 1, row: 1});
        });

        it('should use MatrixRotation', function () {
            const oRotation = new ORotation();

            expect(oRotation instanceof MatrixRotation).toBe(true);
        });
    });

    describe('"T" rotation', function () {
        it('should spawn with the flat side down', function () {
            const tRotation = new TRotation();

            expect(tRotation.filledCells().length).toBe(4);
            expect(tRotation.filledCells()).toContain({col: 1, row: 0});
            expect(tRotation.filledCells()).toContain({col: 0, row: 1});
            expect(tRotation.filledCells()).toContain({col: 1, row: 1});
            expect(tRotation.filledCells()).toContain({col: 2, row: 1});
        });

        it('should use MatrixRotation', function () {
            const tRotation = new TRotation();

            expect(tRotation instanceof MatrixRotation).toBe(true);
        });
    });

    describe('"S" rotation', function () {
        it('should spawn with the flat side down and occupying the first 2 rows', function () {
            const sRotation = new SRotation();

            expect(sRotation.filledCells().length).toBe(4);
            expect(sRotation.filledCells()).toContain({col: 1, row: 0});
            expect(sRotation.filledCells()).toContain({col: 2, row: 0});
            expect(sRotation.filledCells()).toContain({col: 0, row: 1});
            expect(sRotation.filledCells()).toContain({col: 1, row: 1});
        });

        it('should use MatrixRotation', function () {
            const sRotation = new SRotation();

            expect(sRotation instanceof MatrixRotation).toBe(true);
        });
    });

    describe('"Z" rotation', function () {
        it('should spawn with the flat side down and occupying the first 2 rows', function () {
            const zRotation = new ZRotation();

            expect(zRotation.filledCells().length).toBe(4);
            expect(zRotation.filledCells()).toContain({col: 0, row: 0});
            expect(zRotation.filledCells()).toContain({col: 1, row: 0});
            expect(zRotation.filledCells()).toContain({col: 1, row: 1});
            expect(zRotation.filledCells()).toContain({col: 2, row: 1});
        });

        it('should use MatrixRotation', function () {
            const zRotation = new ZRotation();

            expect(zRotation instanceof MatrixRotation).toBe(true);
        });
    });

    describe('"J" rotation', function () {
        it('should spawn with the flat side down', function () {
            const jRotation = new JRotation();

            expect(jRotation.filledCells().length).toBe(4);
            expect(jRotation.filledCells()).toContain({col: 0, row: 0});
            expect(jRotation.filledCells()).toContain({col: 0, row: 1});
            expect(jRotation.filledCells()).toContain({col: 1, row: 1});
            expect(jRotation.filledCells()).toContain({col: 2, row: 1});
        });

        it('should use MatrixRotation', function () {
            const jRotation = new JRotation();

            expect(jRotation instanceof MatrixRotation).toBe(true);
        });
    });

    describe('"L" rotation', function () {
        it('should spawn with the flat side down', function () {
            const lRotation = new LRotation();

            expect(lRotation.filledCells().length).toBe(4);
            expect(lRotation.filledCells()).toContain({col: 2, row: 0});
            expect(lRotation.filledCells()).toContain({col: 0, row: 1});
            expect(lRotation.filledCells()).toContain({col: 1, row: 1});
            expect(lRotation.filledCells()).toContain({col: 2, row: 1});
        });

        it('should use MatrixRotation', function () {
            const lRotation = new LRotation();

            expect(lRotation instanceof MatrixRotation).toBe(true);
        });
    });

});
