import Vue, {ComponentOptions} from 'vue';
import {IPlayFieldModel} from './tetris';
import './tetris.css';
import {ITetromino, Tetrominoes} from './tetromino';

/* tslint:disable no-trailing-whitespace*/
const template = `<div class="play-field-container">
<div class="play-field">
    <table >
      <tbody>
        <tr v-for="row in area.numRows" v-show="row > 1">
          <td v-for="col in area.numCols">
            <div class="cell" :class="classForCell(row, col)"></div>
          </td>
        </tr>
      </tbody>
</table>
</div>
</div>
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
