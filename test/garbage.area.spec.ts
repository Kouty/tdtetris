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
        // |O  |
        // |OOO|
        garbageArea.fill({row: 0, col: 0}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 1}, oneSquareTetromino);
        garbageArea.fill({row: 0, col: 2}, oneSquareTetromino);
        garbageArea.fill({row: 1, col: 1}, oneSquareTetromino);

        // |   |
        // |O  |
        expect(garbageArea.filled({row: 0, col: 0})).not.toBe(undefined);
    });
});
