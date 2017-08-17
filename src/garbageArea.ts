import {IPosition} from './srsRotation';
import {ITetromino} from './tetromino';

export interface IGarbageAreaReadOnly {
    filled(position: IPosition): ITetromino;
}

export class GarbageArea {
    private area: ITetromino[];

    constructor(private numCols) {
        this.area = [];
    }

    public fill(position: IPosition, tetromino: ITetromino): void {
        this.area[this.toIndex(position)] = tetromino;
    }

    public filled(position: IPosition) {
        return this.area[this.toIndex(position)];
    }

    public clearFilledRows(): void {
        for (let row = 0; row < Math.ceil(this.area.length / this.numCols); row++) {
            let counter = 0;
            for (let col = 0; col < this.numCols; col++) {
                if (this.filled({row, col})) {
                    counter++;
                }
            }

            if (counter === this.numCols) {
                this.clearRow(row);
                row--;
            }
        }
    }

    private clearRow(row: number) {
        for (let col = 0; col < this.numCols; col++) {
            this.fill({row, col}, undefined);
        }
        this.area.splice(row * this.numCols, this.numCols);
    }

    private toIndex(position: IPosition): number {
        return position.row * this.numCols + position.col;
    }
}
