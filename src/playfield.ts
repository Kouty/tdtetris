import {ITetromino} from './tetromino';

export interface IPosition {
    row: number;
}

export interface IPlacedTetromino extends IPosition, ITetromino {
}

export class PlayField {
    private placedTetromino: PlacedTetromino;

    constructor(private numRows: number) {
    }

    public spawn(tetromino: ITetromino) {
        const row: number = this.numRows - 1;
        this.placedTetromino = new PlacedTetromino(tetromino, {row});
    }

    get tetromino(): IPlacedTetromino {
        return this.placedTetromino;
    }
}

class PlacedTetromino implements IPlacedTetromino {
    constructor(private tetromino: ITetromino, private position: IPosition) {
    }

    get row(): number {
        return this.position.row;
    }

    get width() {
        return this.tetromino.width;
    }

    get height() {
        return this.tetromino.height;
    }

    public fills(row, col) {
        return this.tetromino.fills(row, col);
    }
}
