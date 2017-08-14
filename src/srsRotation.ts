import {IPosition} from './tetromino';

export interface IRotation {
    filledCells(): IPosition[];
    rotateClockwise(): void;
}

export class IRotation implements IRotation {
    private matrix: number[];
    private readonly width: number = 4;

    constructor() {
        this.matrix = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0];
    }

    public filledCells() {
        return this.toCoordinates(this.matrix);
    }

    public rotateClockwise() {
        this.matrix = this.rotate90(this.matrix);
    }

    private toCoordinates(matrix) {
        const newMatrix: IPosition[] = [];
        this.matrix.forEach((filled, index) => {
            if (filled) {
                const row = Math.floor(index / this.width);
                const col = index % this.width;
                newMatrix.push({row, col});
            }
        });

        return newMatrix;
    }

    private rotate90(grid): number[] {
        const newGrid = [];
        const rowLength = Math.sqrt(grid.length);
        newGrid.length = grid.length;

        for (let i = 0; i < grid.length; i++) {
            const x = i % rowLength;
            const y = Math.floor(i / rowLength);
            const newX = rowLength - y - 1;
            const newY = x;
            const newPosition = newY * rowLength + newX;
            newGrid[newPosition] = grid[i];
        }

        return newGrid;
    }
}
