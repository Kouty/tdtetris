import Vue, {ComponentOptions} from 'vue';
import {IPlayFieldModel} from './tetris';
import './tetris.css';
import {TetrominoType} from './tetromino';

/* tslint:disable no-trailing-whitespace*/
const template = `<div>
<table class="play-field">
  <tbody>
    <tr v-for="row in area.numRows">
      <td v-for="col in area.numCols">
        <div class="cell" :class="{'garbage-cell': garbageCell(row,col), 'tetromino-cell':tetrominoCell(row,col)}">
        </div>
      </td>  
    </tr>
  </tbody>
</table></div>
`;

/* tslint:enable no-trailing-whitespace*/

interface IPlayFieldVue extends Vue {
    area: IPlayFieldModel;
}

const PlayFieldVue = {
    data() {
        return {};
    },
    methods: {
        tetrominoCell(row, col) {
            row--;
            col--;
            const numCols = this.area.numCols;
            const cell = this.area.cells[numCols * row + col];
            return cell && cell.type === TetrominoType.I;
        },
        garbageCell(row, col): boolean {
            row--;
            col--;
            const numCols = this.area.numCols;
            const cell = this.area.cells[numCols * row + col];
            return cell && cell.type === TetrominoType.I;
        },
    },
    props: ['area'],
    template,
} as ComponentOptions<IPlayFieldVue>;

export {PlayFieldVue};
