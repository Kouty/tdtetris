import {Tetrominoes} from '../src/tetromino';
import {TetrominoGenerator} from '../src/tetrominoGenerator';

describe('TetrominoGenerator', function () {
    beforeEach(function () {
        spyOn(Math, 'random');
    });

    it('should generate I tetromino ', function () {
        (Math.random as any).and.returnValue(0);
        const tetrominoGenerator = new TetrominoGenerator();
        spyOn(Tetrominoes.I, 'create');

        tetrominoGenerator.next();

        expect(Tetrominoes.I.create).toHaveBeenCalled();
    });

    it('should generate O tetromino ', function () {
        const tetrominoGenerator = new TetrominoGenerator();
        const threshold =  1 / Object.keys(Tetrominoes).length;
        (Math.random as any).and.returnValue(threshold);
        spyOn(Tetrominoes.O, 'create');

        tetrominoGenerator.next();

        expect(Tetrominoes.O.create).toHaveBeenCalled();
    });

    it('should generate T tetromino ', function () {
        const tetrominoGenerator = new TetrominoGenerator();
        const threshold =  2 / Object.keys(Tetrominoes).length;
        (Math.random as any).and.returnValue(threshold);
        spyOn(Tetrominoes.T, 'create');

        tetrominoGenerator.next();

        expect(Tetrominoes.T.create).toHaveBeenCalled();
    });
});
