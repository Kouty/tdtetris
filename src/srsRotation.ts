export interface IPosition {
    row: number;
    col: number;
}

export interface InterfaceRotation {
    filledCells(): IPosition[];

    rotateClockwise(): void;

    rotateCounterClockwise(): void;
}

export class MatrixRotation {
    public readonly height;

    constructor(private crtMatrix: number[], public readonly width: number) {
        this.height = this.crtMatrix.length / this.width;
    }

    public rotateClockwise() {
        this.crtMatrix = this.rotate90(this.crtMatrix, -1);
    }

    public rotateCounterClockwise() {
        this.crtMatrix = this.rotate90(this.crtMatrix, +1);
    }

    get matrix(): number[] {
        return this.crtMatrix;
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

class AbstractRotation extends MatrixRotation implements InterfaceRotation {

    constructor(matrix: number[], width: number) {
        super(matrix, width);
    }

    public filledCells() {
        return this.toCoordinates();
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

export class TRotation extends AbstractRotation {
    private static readonly width: number = 3;

    constructor() {
        super([
            0, 1, 0,
            1, 1, 1,
            0, 0, 0], TRotation.width);
    }
}

export class SRotation extends AbstractRotation {
    private static readonly width: number = 3;

    constructor() {
        super([
            0, 1, 1,
            1, 1, 0,
            0, 0, 0], SRotation.width);
    }
}

export class ZRotation extends AbstractRotation {
    private static readonly width: number = 3;

    constructor() {
        super([
            1, 1, 0,
            0, 1, 1,
            0, 0, 0], ZRotation.width);
    }
}

export class JRotation extends AbstractRotation {
    private static readonly width: number = 3;

    constructor() {
        super([
            1, 0, 0,
            1, 1, 1,
            0, 0, 0], JRotation.width);
    }
}

export class LRotation extends AbstractRotation {
    private static readonly width: number = 3;

    constructor() {
        super([
            0, 0, 1,
            1, 1, 1,
            0, 0, 0], LRotation.width);
    }
}
