import {Tetrominoes} from '../src/tetromino';
import {TetrominoGenerator} from '../src/tetrominoGenerator';

describe('TetrominoGenerator', function () {
    beforeEach(function () {
        spyOn(Math, 'random');
    });

    it('should generate T tetromino ', function () {
        const tetrominoGenerator = new TetrominoGenerator();
        Object.keys(Tetrominoes).forEach((key, index, array) => {
            const threshold = index / array.length;
            (Math.random as any).and.returnValue(threshold);
            spyOn(Tetrominoes[key], 'create');

            tetrominoGenerator.next();

            expect(Tetrominoes[key].create).toHaveBeenCalled();
        });
    });
});
