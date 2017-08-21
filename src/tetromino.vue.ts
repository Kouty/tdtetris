import Vue, {ComponentOptions} from 'vue';
import {ITetromino} from './tetromino';

/* tslint:disable no-trailing-whitespace*/
const template = `
<div class="preview-box">
  <div class>
    <div class="preview-box-cell" v-for="cell in tetromino.filledCells()"
      :style="{top: top(cell), left: left(cell)}" :class="tetrominoClass()">
    </div>
  </div>
</div>
`;

/* tslint:enable no-trailing-whitespace*/

interface ITetrominoVue extends Vue {
    tetromino: ITetromino;
    bounds;
    length: number;

    top(): string;

    left(): string;

    classForCell(): string;

    updateBounds(): void;
}

const TetrominoVue = {
    data() {
        return {length: 20};
    },
    created() {
        this.updateBounds();
    },
    methods: {
        top(cell) {
            const offset = (3 - (this.bounds.maxRow - this.bounds.minRow)) / 2;
            return (offset + cell.row - this.bounds.minRow) * this.length + 1 + 'px';
        },
        left(cell) {
            const offset = (3 - (this.bounds.maxCol - this.bounds.minCol)) / 2;
            return (offset + cell.col - this.bounds.minCol) * this.length + 1 + 'px';
        },
        tetrominoClass() {
            return (this.tetromino.type as any).name.toString();
        },
        updateBounds() {
            const bounds = {maxRow: 0, maxCol: 0, minRow: 4, minCol: 4};
            this.tetromino.filledCells().forEach((cell) => {
                if (cell.row > bounds.maxRow) {
                    bounds.maxRow = cell.row;
                }
                if (cell.col > bounds.maxCol) {
                    bounds.maxCol = cell.col;
                }
                if (cell.row < bounds.minRow) {
                    bounds.minRow = cell.row;
                }
                if (cell.col < bounds.minCol) {
                    bounds.minCol = cell.col;
                }
            });

            this.bounds = bounds;
        },
    },
    watch: {
        tetromino() {
            this.updateBounds();
        },
    },
    props: ['tetromino'],
    template,
} as ComponentOptions<ITetrominoVue>;

export {TetrominoVue};
