import {PlayField} from '../src/playfield';

describe('Playfield events', function () {
    let oneCellTetromino;

    beforeEach(function () {
        oneCellTetromino = {width: 1, height: 1, filledCells: () => [{row: 0, col: 0}]};
    });

    it('should notify when current moving tetromino gets locked', function () {
        const playfield = new PlayField(1, 20);
        playfield.spawn(oneCellTetromino);

        const lockSpy = jasmine.createSpy('lockSpy');
        playfield.onLock(lockSpy);
        playfield.tetromino.moveDown();

        expect(lockSpy).toHaveBeenCalled();
    });

    it('should notify when current garbage area rows gets cleared', function () {
        const playfield = new PlayField(1, 2);
        playfield.spawn(oneCellTetromino);
        const clearSpy = jasmine.createSpy('clearSpy');
        playfield.onGarbageRowsClear(clearSpy);

        // |  |
        // | O|
        playfield.tetromino.moveRight();
        playfield.tetromino.moveDown();

        // |  |
        // |OO|
        playfield.spawn(oneCellTetromino);
        playfield.tetromino.moveDown();

        expect(clearSpy).toHaveBeenCalledWith(1);
    });
});
