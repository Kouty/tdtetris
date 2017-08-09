import {PlayField} from '../src/playfield';
import {Tetris} from '../src/tetris';
import {TetrominoGenerator} from '../src/tetrominoGenerator';

describe('Tetris', function () {
    let oneSquareTetromino;
    beforeEach(function () {
        oneSquareTetromino = {width: 1, height: 1, filledSquares: () => [{row: 0, col: 0}]};
    });

    it('should spawn first tetromino on start', function () {
        const tetris = new Tetris(20, 10);
        const firstTetromino = {};
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(firstTetromino);
        spyOn(PlayField.prototype, 'spawn').and.returnValue(firstTetromino);

        tetris.start();

        expect(TetrominoGenerator.prototype.next).toHaveBeenCalled();
        expect(PlayField.prototype.spawn).toHaveBeenCalledWith(firstTetromino);
    });

    it('should spawn a new tetromino, when current tetromino locks', function () {
        const tetris = new Tetris(1, 3);
        let counter = 0;
        const tetrominoes = [
            (Object as any).assign({}, oneSquareTetromino),
            (Object as any).assign({}, oneSquareTetromino)];
        spyOn(TetrominoGenerator.prototype, 'next').and.callFake(function () {
            return tetrominoes[counter++];
        });
        spyOn(PlayField.prototype, 'spawn').and.callThrough();

        tetris.start();
        tetris.moveDown();

        expect(PlayField.prototype.spawn).toHaveBeenCalledWith(tetrominoes[1]);
    });

    it('should tell when game is over', function () {
        const tetris = new Tetris(1, 3);
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneSquareTetromino);

        tetris.start();
        tetris.moveDown();

        expect(tetris.gameOver()).toBe(true);
    });
});
