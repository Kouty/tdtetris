import {IPlacedTetronimo, PlacedTetronimoImpl} from './placed_tetronimo';
import {Tetromino} from './tetromino';

export class PlayField {
    public tetronimo: IPlacedTetronimo;

    constructor(private numRows: number) {
    }

    public spawn(tetromino: Tetromino) {
        const row: number = this.numRows - 1;
        this.tetronimo = new PlacedTetronimoImpl(tetromino, {row});
    }
}
