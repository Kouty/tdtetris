import {PlayField} from '../src/playfield';

describe('Playfield placed tetromino', function () {
    let oneSquareTetromino;

    beforeEach(function () {
        oneSquareTetromino = {width: 3, height: 1, filledSquares: () => [{row: 0, col: 1}]};
    });

    it('should return filled cells considering its own position', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);

        playField.spawn(oneSquareTetromino);
        const cell = playField.tetromino.filledSquaresInField()[0];

        expect(cell.row).toBe(NUM_ROWS - 1);
        expect(cell.col).toBe(2);
    });
});