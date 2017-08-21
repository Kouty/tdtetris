import Vue, {ComponentOptions} from 'vue';
import {IPlayFieldModel} from './tetris';
import './tetris.css';
import {ITetromino, Tetrominoes} from './tetromino';

/* tslint:disable no-trailing-whitespace*/
const template = `<div>
<table class="play-field">
  <tbody>
    <tr v-for="r in area.numRows" v-show="r > 1">
      <td v-for="c in area.numCols">
        <div class="cell"
          :class="classForCell(r,c)">
        </div>
      </td>  
    </tr>
  </tbody>
</table></div>
`;

/* tslint:enable no-trailing-whitespace*/

interface IPlayFieldVue extends Vue {
    area: IPlayFieldModel;

    classForCell(row: number, col: number): string;

    getCellAt(row: number, col: number): ITetromino;
}

const PlayFieldVue = {
    data() {
        return {};
    },
    methods: {
        classForCell(row, col) {
            const cell = this.getCellAt(row, col) || {type: {name: 'empty'}};
            return (cell.type as any).name.toString();
        },
        getCellAt(row, col) {
            row--;
            col--;
            const numCols = this.area.numCols;
            return this.area.cells[numCols * row + col];
        },
    },
    props: ['area'],
    template,
} as ComponentOptions<IPlayFieldVue>;

export {PlayFieldVue};
