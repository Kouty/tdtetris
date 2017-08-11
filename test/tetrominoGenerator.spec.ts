import {TetrominoGenerator} from '../src/tetrominoGenerator';
import {Tetrominoes} from '../src/tetromino';

describe('TetrominoGenerator', function () {

    it('should generate I tetrominoes (until the game is I tetris)', function () {
        const tetrominoGenerator = new TetrominoGenerator();
        spyOn(Tetrominoes.I, 'create');

        tetrominoGenerator.next();

        expect(Tetrominoes.I.create).toHaveBeenCalled();
    });

});
