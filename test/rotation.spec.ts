import {IRotation} from '../src/srsRotation';

describe('SRS Rotation system', function () {

    describe('"I" rotation', function () {
        it('should spawn with  the 3rd row filled', function () {
            const iRotation = new IRotation();

            const allIn3rdRow = iRotation.filledCells().length > 0 &&
                iRotation.filledCells().every((cell) => {
                    return cell.row === 2;
                });

            expect(allIn3rdRow).toBe(true);
        });

        it('should rotate clockwise', function () {
            const iRotation = new IRotation();

            iRotation.rotateClockwise();

            const allIn2ndCol = iRotation.filledCells().length > 0 &&
                iRotation.filledCells().every((cell) => {
                    return cell.col === 1;
                });

            expect(allIn2ndCol).toBe(true);
        });

    });

});
