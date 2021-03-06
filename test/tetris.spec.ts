import {IGarbageAreaReadOnly} from '../src/garbageArea';
import {PlayField} from '../src/playfield';
import {ScoreCalculator} from '../src/scoreCalculator';
import {IPosition} from '../src/srsRotation';
import {Tetris} from '../src/tetris';
import {IPlacedTetromino} from '../src/tetromino';
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
        const placedTetromino: IPlacedTetromino = {
            col: 1,
            height: 1,
            moveDown: nullLambda,
            moveLeft: nullLambda,
            moveRight: nullLambda,
            rotateClockwise: nullLambda,
            rotateCounterClockwise: nullLambda,
            row: 1,
            type: null,
            width: 1,
            filledCells(): IPosition[] {
                return [{row: 1, col: 1}];
            },
        };
        const playFieldMock = {
            garbageArea,
            numCols: 3,
            numRows: 2,
            tetromino: placedTetromino,
        } as PlayField;

        const model = Tetris.playFieldModel(playFieldMock);

        expect(model.numCols).toBe(playFieldMock.numCols);
        expect(model.numRows).toBe(playFieldMock.numRows);

        // | T |
        // |g  |
        model.cells.length = 6; // Changing the size to be exactly 2 rows
        expect(model.cells).toEqual([
            undefined, placedTetromino, undefined,
            garbageTetromino, undefined, undefined]);
    });

    it('should rotate clockwise current tetromino', function () {
        const tetris = new Tetris(10, 3);
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneCellTetromino);

        tetris.start();
        spyOn(tetris.playField.tetromino, 'rotateClockwise');
        tetris.rotateClockwise();

        expect(tetris.playField.tetromino.rotateClockwise).toHaveBeenCalled();
    });

    it('should rotate rotateCounterClockwise current tetromino', function () {
        const tetris = new Tetris(10, 3);
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneCellTetromino);

        tetris.start();
        spyOn(tetris.playField.tetromino, 'rotateCounterClockwise');
        tetris.rotateCounterClockwise();

        expect(tetris.playField.tetromino.rotateCounterClockwise).toHaveBeenCalled();
    });

    it('should provide the next Tetromino that will spawn', function () {
        const tetris = new Tetris(10, 3);
        const toBeSpawned = [oneCellTetromino, {}];
        let counter = 0;
        spyOn(TetrominoGenerator.prototype, 'next').and.callFake(() => {
            return toBeSpawned[counter++];
        });

        tetris.start();

        expect(tetris.nextTetromino()).toBe(toBeSpawned[1]);
    });

    it('should call score calculator on tetromino lock', function () {
        const tetris = new Tetris(1, 2);
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneCellTetromino);
        spyOn(ScoreCalculator.prototype, 'addPointsForLock');

        tetris.start();
        tetris.moveDown();

        expect(ScoreCalculator.prototype.addPointsForLock).toHaveBeenCalled();
    });

    it('should call score calculator on garbage area row clear', function () {
        const tetris = new Tetris(1, 2);
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneCellTetromino);
        spyOn(ScoreCalculator.prototype, 'addPointsForClear');

        // |0 |
        tetris.start();
        tetris.moveDown();
        // |00|
        tetris.moveRight();
        tetris.moveDown();

        expect(ScoreCalculator.prototype.addPointsForClear).toHaveBeenCalledWith(1);
    });

    it('should return the current score, even before start', function () {
        const tetris = new Tetris(1, 2);

        expect(tetris.score).toBe(0);
    });

    it('should return the current score', function () {
        const tetris = new Tetris(1, 2);
        spyOn(TetrominoGenerator.prototype, 'next').and.returnValue(oneCellTetromino);

        tetris.start();
        tetris.moveDown();

        expect(tetris.score).toBe(1);
    });
});
