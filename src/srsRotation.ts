import {IPosition} from './tetromino';

export interface InterfaceRotation {
    filledCells(): IPosition[];

    rotateClockwise(): void;

    rotateCounterClockwise(): void;
}

class AbstractRotation implements InterfaceRotation {
    constructor(private matrix: number[], readonly width: number) {
    }

    public filledCells() {
        return this.toCoordinates(this.matrix);
    }

    public rotateClockwise() {
        this.matrix = this.rotate90(this.matrix, -1);
    }

    public rotateCounterClockwise() {
        this.matrix = this.rotate90(this.matrix, +1);
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

    private rotate90(grid, direction): number[] {
        const newGrid = [];
        const rowLength = Math.sqrt(grid.length);
        newGrid.length = grid.length;

        for (let i = 0; i < grid.length; i++) {
            const x = i % rowLength;
            const y = Math.floor(i / rowLength);
            const newX = (rowLength - 1 + direction * y) % (rowLength - 1);
            const newY = x;
            const newPosition = newY * rowLength + newX;
            newGrid[newPosition] = grid[i];
        }

        return newGrid;
    }
}

export class IRotation extends AbstractRotation {
    private static readonly width: number = 4;

    constructor() {
        super([
            0, 0, 0, 0,
            0, 0, 0, 0,
            1, 1, 1, 1,
            0, 0, 0, 0], IRotation.width);
    }

}

export class ORotation extends AbstractRotation {
    private static readonly width: number = 2;

    constructor() {
        super([
            1, 1,
            1, 1], ORotation.width);
    }
}
