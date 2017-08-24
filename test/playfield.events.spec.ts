import {PlayField} from '../src/playfield';
import {ITetromino} from '../src/tetromino';

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
});
