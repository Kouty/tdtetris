import {Tetrominoes} from '../src/tetromino';
import {TetrominoGenerator} from '../src/tetrominoGenerator';

describe('TetrominoGenerator', function () {

    beforeEach(function () {
        spyOn(Math, 'random');
    });

    it('should generate I tetromino ', function () {
        Math.random.and.returnValue(0);
        const tetrominoGenerator = new TetrominoGenerator();
        spyOn(Tetrominoes.I, 'create');

        tetrominoGenerator.next();

        expect(Tetrominoes.I.create).toHaveBeenCalled();
    });

    it('should generate O tetromino ', function () {
        const tetrominoGenerator = new TetrominoGenerator();
        Math.random.and.returnValue(0.5);
        spyOn(Tetrominoes.O, 'create');

        tetrominoGenerator.next();

        expect(Tetrominoes.O.create).toHaveBeenCalled();
    });

});
