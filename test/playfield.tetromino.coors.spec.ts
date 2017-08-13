import {PlayField} from '../src/playfield';

describe('Playfield placed tetromino', function () {
    let oneCellTetromino;

    beforeEach(function () {
        oneCellTetromino = {width: 3, height: 1, filledCells: () => [{row: 0, col: 1}]};
    });

    it('should return filled cells considering its own position', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);

        playField.spawn(oneCellTetromino);
        const cell = playField.tetromino.filledCells()[0];

        expect(cell.row).toBe(NUM_ROWS - 1);
        expect(cell.col).toBe(2);
    });
});