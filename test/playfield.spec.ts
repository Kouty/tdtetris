describe('Playfield', function () {

    it('should spawn tetrominoes', function () {
        const NUM_ROWS = 10;
        const playField = new TdTetris.PlayField(NUM_ROWS);

        const tetromino: TdTetris.Tetromino = {};
        playField.spawn(tetromino);

        expect(playField.tetronimo.row).toBe(NUM_ROWS - 1);
    });

});

namespace TdTetris {

    export interface Tetromino {

    }

    export interface Position {
        row: number;
    }

    export interface PlacedTetronimo extends Position, Tetromino {
    }


    export class PlayField {
        public tetronimo: PlacedTetronimo;

        constructor(private numRows: number) {
        }

        spawn(tetromino: Tetromino) {
            const row: number = this.numRows - 1;
            this.tetronimo = new PlacedTetronimoImpl(tetromino, {row});
        }
    }

    class PlacedTetronimoImpl implements PlacedTetronimo {
        constructor(private tetronimo: Tetromino, private position: Position) {

        }

        get row(): number {
            return this.position.row;
        }

    }
}