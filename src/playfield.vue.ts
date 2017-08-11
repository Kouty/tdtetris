import Vue, {ComponentOptions} from 'vue';
import './tetris.css';

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

export interface IArea {
    numRows: number;
    numCols: number;
    colors: number[];

}

interface IPlayFieldVue extends Vue {
    area: IArea;
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
            const cell = this.area.colors[numCols * row + col];
            return cell === 1;
        },
        garbageCell(row, col): boolean {
            row--;
            col--;
            const numCols = this.area.numCols;
            const cell = this.area.colors[numCols * row + col];
            return cell === 0;
        },
    },
    props: ['area'],
    template,
} as ComponentOptions<IPlayFieldVue>;

export {PlayFieldVue};
