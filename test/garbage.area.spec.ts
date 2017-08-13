import {GarbageArea} from '../src/garbageArea';

describe('Garbage area', function () {
    let oneSquareTetromino;
    let garbageArea;

    beforeEach(function () {
        oneSquareTetromino = {width: 1, height: 1, filledCells: () => [{row: 0, col: 0}]};
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

    it('should use naive clear gravity', function () {
        const A = {width: 1, height: 1, filledCells: () => [{row: 0, col: 0}], debug: 'A'};
        const B = {width: 1, height: 1, filledCells: () => [{row: 0, col: 0}], debug: 'B'};
        const C = {
            debug: 'C',
            filledCells: () => [{row: 0, col: 0}, {row: 1, col: 0}, {row: 2, col: 0}],
            height: 3, width: 1,
        };
        // | B |
        // |OOC|
        // |A C|
        // |OOC|
        garbageArea.fill({row: 0, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 1}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 2}, C);
        garbageArea.fill({row: 1, col: 0}, A);
        garbageArea.fill({row: 1, col: 2}, C);
        garbageArea.fill({row: 2, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 2, col: 1}, oneSquareTetromino);
        garbageArea.fill({row: 2, col: 2}, C);
        garbageArea.fill({row: 3, col: 1}, B);
        garbageArea.clearFilledRows();

        // | B |
        // |A C|
        expect(garbageArea.filled({row: 0, col: 0})).toBe(A);
        expect(garbageArea.filled({row: 1, col: 1})).toBe(B);
        expect(garbageArea.filled({row: 0, col: 2})).toBe(C);
    });

});
