export interface IPosition {
    row: number;
    col: number;
}

export interface InterfaceRotation {
    filledCells(): IPosition[];

    rotateClockwise(): void;

    rotateCounterClockwise(): void;
}

class AbstractRotation implements InterfaceRotation {
    constructor(private matrix: number[], readonly width: number) {
    }

    public filledCells() {
        return this.toCoordinates();
    }

    public rotateClockwise() {
        this.matrix = this.rotate90(this.matrix, -1);
    }

    public rotateCounterClockwise() {
        this.matrix = this.rotate90(this.matrix, +1);
    }

    private toCoordinates() {
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
            let newX = rowLength - 1 - y;
            let newY = x;
            if (direction > 0) {
                newY = rowLength - 1 - x;
                newX = y;
            }
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
            1, 1, 1, 1,
            0, 0, 0, 0,
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
