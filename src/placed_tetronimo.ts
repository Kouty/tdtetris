import {Tetromino} from './tetromino';

export interface IPosition {
    row: number;
}

export interface IPlacedTetronimo extends IPosition, Tetromino {
}

export class PlacedTetronimoImpl implements IPlacedTetronimo {
    constructor(private tetromino: Tetromino, private position: IPosition) {
    }

    get row(): number {
        return this.position.row;
    }
}
