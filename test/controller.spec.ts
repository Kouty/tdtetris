import {Tetris} from '../src/controller';
import {PlayField} from '../src/playfield';
import {TetrominoGenerator} from '../src/tetrominoGenerator';

describe('Tetris controller', function () {

    it('should spawn first tetromino on start', function () {
        const controller = new Tetris();
        const firstTetromino = {};
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(firstTetromino);
        spyOn(PlayField.prototype, 'spawn').and.returnValue(firstTetromino);

        controller.start();

        expect(TetrominoGenerator.prototype.next).toHaveBeenCalled();
        expect(PlayField.prototype.spawn).toHaveBeenCalledWith(firstTetromino);
    });
});
