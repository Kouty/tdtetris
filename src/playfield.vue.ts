import Vue, {ComponentOptions} from 'vue';
import {IPlayFieldModel} from './tetris';
import './tetris.css';
import {TetrominoType} from './tetromino';

/* tslint:disable no-trailing-whitespace*/
const template = `<div>
<table class="play-field">
  <tbody>
    <tr v-for="row in area.numRows" v-show="row > 1">
      <td v-for="col in area.numCols">
        <div class="cell"
          :class="{'I':iCell(row,col),'O':oCell(row,col),'T':tCell(row,col),'S':sCell(row,col),'Z':zCell(row,col)}">
        </div>
      </td>  
    </tr>
  </tbody>
</table></div>
`;

/* tslint:enable no-trailing-whitespace*/

interface IPlayFieldVue extends Vue {
    area: IPlayFieldModel;

    iCell(row: number, col: number): boolean;

    oCell(row: number, col: number): boolean;

    tCell(row: number, col: number): boolean;

    sCell(row: number, col: number): boolean;

    zCell(row: number, col: number): boolean;

    tetrominoCell(row: number, col: number, type: TetrominoType): boolean;

    garbageCell(row: number, col: number, type: TetrominoType): boolean;
}

const PlayFieldVue = {
    data() {
        return {};
    },
    methods: {
        iCell(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.I)
                || this.garbageCell(row, col, TetrominoType.I);
        },
        oCell(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.O)
                || this.garbageCell(row, col, TetrominoType.O);
        },
        tCell(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.T)
                || this.garbageCell(row, col, TetrominoType.T);
        },
        sCell(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.S)
                || this.garbageCell(row, col, TetrominoType.S);
        },
        zCell(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.Z)
                || this.garbageCell(row, col, TetrominoType.Z);
        },
        tetrominoCell(row, col, type) {
            row--;
            col--;
            const numCols = this.area.numCols;
            const cell = this.area.cells[numCols * row + col];
            return cell !== undefined && cell.type === type;
        },
        garbageCell(row, col, type): boolean {
            row--;
            col--;
            const numCols = this.area.numCols;
            const cell = this.area.cells[numCols * row + col];
            return cell !== undefined && cell.type === type;
        },
    },
    props: ['area'],
    template,
} as ComponentOptions<IPlayFieldVue>;

export {PlayFieldVue};
