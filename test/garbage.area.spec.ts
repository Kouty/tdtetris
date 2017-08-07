import {GarbageArea} from '../src/garbageArea';

describe('Garbage area', function () {
    let oneSquareTetromino;
    let garbageArea;

    beforeEach(function () {
        oneSquareTetromino = {width: 1, height: 1, filledSquares: () => [{row: 0, col: 0}]};
        const NUM_COLS = 3;
        garbageArea = new GarbageArea(NUM_COLS);
    });

    it('should clear out rows completely filled with garbage cells', function () {
        // |   |
        // |OOO|
        garbageArea.fill({row: 0, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 1}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 2}, oneSquareTetromino);
        garbageArea.clearFilledRows();

        expect(garbageArea.filled({row: 0, col: 1})).toBe(undefined);
    });

    it('should NOT clear out rows completely filled with garbage cells', function () {
        // |   |
        // |OOO|
        garbageArea.fill({row: 0, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 1}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 2}, oneSquareTetromino);

        expect(garbageArea.filled({row: 0, col: 1})).not.toBe(undefined);
    });

    it('should move down garbage cells, after one or more rows has been cleared', function () {
        // | O |
        // |OOO|
        garbageArea.fill({row: 0, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 1}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 2}, oneSquareTetromino);
        garbageArea.fill({row: 1, col: 1}, oneSquareTetromino);
        garbageArea.clearFilledRows();

        // |   |
        // | O |
        expect(garbageArea.filled({row: 0, col: 0})).toBe(undefined);
        expect(garbageArea.filled({row: 0, col: 1})).not.toBe(undefined);
        expect(garbageArea.filled({row: 0, col: 0})).toBe(undefined);
    });

    xit('should move down garbage cells according to the cleared rows', function () {
        // | B |
        // |OOO|
        // |A  |
        // |OOO|
        garbageArea.fill({row: 0, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 1}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 2}, oneSquareTetromino);
        garbageArea.fill({row: 1, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 2, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 2, col: 1}, oneSquareTetromino);
        garbageArea.fill({row: 2, col: 2}, oneSquareTetromino);
        garbageArea.fill({row: 3, col: 1}, oneSquareTetromino);

        // |   |
        // |AB |
        expect(garbageArea.filled({row: 0, col: 0})).not.toBe(undefined);
        expect(garbageArea.filled({row: 1, col: 0})).not.toBe(undefined);
    });

});
