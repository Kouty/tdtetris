import {IRotation, JRotation, LRotation, ORotation, SRotation, TRotation, ZRotation} from '../src/srsRotation';

describe('SRS Rotation system', function () {

    describe('"I" rotation', function () {
        it('should spawn with  the 2nd row filled', function () {
            const iRotation = new IRotation();

            const allIn3rdRow = iRotation.filledCells().length > 0 &&
                iRotation.filledCells().every((cell) => {
                    return cell.row === 1;
                });

            expect(allIn3rdRow).toBe(true);
        });

        it('should rotate clockwise', function () {
            const iRotation = new IRotation();

            iRotation.rotateClockwise();

            const allIn3rdCol = iRotation.filledCells().length > 0 &&
                iRotation.filledCells().every((cell) => {
                    return cell.col === 2;
                });

            expect(allIn3rdCol).toBe(true);
        });

        it('should rotate clockwise twice', function () {
            const iRotation = new IRotation();

            iRotation.rotateClockwise();
            iRotation.rotateClockwise();

            const allIn3rdRow = iRotation.filledCells().length > 0 &&
                iRotation.filledCells().every((cell) => {
                    return cell.row === 2;
                });

            expect(allIn3rdRow).toBe(true);
        });

        it('should rotate counterclockwise', function () {
            const iRotation = new IRotation();

            iRotation.rotateCounterClockwise();

            const allIn2ndCol = iRotation.filledCells().length > 0 &&
                iRotation.filledCells().every((cell) => {
                    return cell.col === 1;
                });

            expect(allIn2ndCol).toBe(true);
        });

        it('rotate clockwise and then rotate counterClockwise should restore initial position', function () {
            const iRotation = new IRotation();

            const before = iRotation.filledCells();
            iRotation.rotateClockwise();
            iRotation.rotateCounterClockwise();
            const after = iRotation.filledCells();

            expect(before).toEqual(after);
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

        it('should not change filled cells when rotations', function () {
            const oRotation = new ORotation();

            oRotation.rotateClockwise();

            expect(oRotation.filledCells().length).toBe(4);
            expect(oRotation.filledCells()).toContain({col: 0, row: 0});
            expect(oRotation.filledCells()).toContain({col: 1, row: 0});
            expect(oRotation.filledCells()).toContain({col: 0, row: 1});
            expect(oRotation.filledCells()).toContain({col: 1, row: 1});
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
    });

});
