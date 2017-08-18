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
          :class="{'I':i(row,col),'O':o(row,col),'T':t(row,col),'S':s(row,col),'Z':z(row,col), 'J':j(row,col)}">
        </div>
      </td>  
    </tr>
  </tbody>
</table></div>
`;

/* tslint:enable no-trailing-whitespace*/

interface IPlayFieldVue extends Vue {
    area: IPlayFieldModel;

    i(row: number, col: number): boolean;

    o(row: number, col: number): boolean;

    t(row: number, col: number): boolean;

    s(row: number, col: number): boolean;

    z(row: number, col: number): boolean;

    tetrominoCell(row: number, col: number, type: TetrominoType): boolean;

    garbageCell(row: number, col: number, type: TetrominoType): boolean;
}

const PlayFieldVue = {
    data() {
        return {};
    },
    methods: {
        i(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.I)
                || this.garbageCell(row, col, TetrominoType.I);
        },
        o(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.O)
                || this.garbageCell(row, col, TetrominoType.O);
        },
        t(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.T)
                || this.garbageCell(row, col, TetrominoType.T);
        },
        s(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.S)
                || this.garbageCell(row, col, TetrominoType.S);
        },
        z(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.Z)
                || this.garbageCell(row, col, TetrominoType.Z);
        },
        j(row, col) {
            return this.tetrominoCell(row, col, TetrominoType.J)
                || this.garbageCell(row, col, TetrominoType.J);
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
