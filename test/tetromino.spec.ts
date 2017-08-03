import {Tetrominoes} from '../src/tetromino';

describe('Tetromino', function () {

    it('should have a containing rectangle', function () {
        const tetrominoI = Tetrominoes.I.create();

        expect(tetrominoI.width).toBe(4);
        expect(tetrominoI.height).toBe(4);
    });

});
