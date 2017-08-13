import {IGarbageAreaReadOnly} from '../src/garbageArea';
import {PlayField} from '../src/playfield';
import {Tetris} from '../src/tetris';
import {IPlacedTetromino, IPosition} from '../src/tetromino';
import {TetrominoGenerator} from '../src/tetrominoGenerator';

describe('Tetris', function () {
    let oneCellTetromino;
    beforeEach(function () {
        oneCellTetromino = {width: 1, height: 1, filledCells: () => [{row: 0, col: 0}]};
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
            (Object as any).assign({}, oneCellTetromino),
            (Object as any).assign({}, oneCellTetromino)];
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
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneCellTetromino);

        tetris.start();
        tetris.moveDown();

        expect(tetris.gameOver()).toBe(true);
    });

    it('should move right', function () {
        const tetris = new Tetris(10, 3);
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneCellTetromino);

        tetris.start();
        spyOn(tetris.playField.tetromino, 'moveRight');
        tetris.moveRight();

        expect(tetris.playField.tetromino.moveRight).toHaveBeenCalled();
    });

    it('should move left', function () {
        const tetris = new Tetris(10, 3);
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneCellTetromino);

        tetris.start();
        spyOn(tetris.playField.tetromino, 'moveLeft');
        tetris.moveLeft();

        expect(tetris.playField.tetromino.moveLeft).toHaveBeenCalled();
    });

    it('should return the PlayField view model', function () {
        const garbageTetromino = oneCellTetromino;
        const garbageArea: IGarbageAreaReadOnly = {
            filled({row, col}) {
                if (row === 0 && col === 0) {
                    return garbageTetromino;
                }
                return undefined;
            },
        };
        const nullLambda = () => null;
        const tetromino: IPlacedTetromino = {
            col: 1,
            height: 1,
            moveDown: nullLambda,
            moveLeft: nullLambda,
            moveRight: nullLambda,
            row: 1,
            width: 1,
            filledCells(): IPosition[] {
                return [{row: 1, col: 1}];
            },
        };
        const playFieldMock = {
            garbageArea,
            numCols: 3,
            numRows: 2,
            tetromino,
        } as PlayField;

        const model = Tetris.playFieldModel(playFieldMock);

        expect(model.numCols).toBe(playFieldMock.numCols);
        expect(model.numRows).toBe(playFieldMock.numRows);

        // | T |
        // |g  |
        model.cells.length = 6; // Changing the size to be exactly 2 rows
        expect(model.cells).toEqual([
            undefined, tetromino, undefined,
            garbageTetromino, undefined, undefined]);
    });
});
