import {Tetromino} from './tetromino';

export interface Position {
    row: number;
}

interface PlacedTetronimo extends Position, Tetromino {
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
    constructor(private tetromino: Tetromino, private position: Position) {
    }

    get row(): number {
        return this.position.row;
    }
}
