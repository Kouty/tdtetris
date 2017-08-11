import Vue, {ComponentOptions} from 'vue';
import {PlayField} from './playfield';
import './tetris.css';

/* tslint:disable no-trailing-whitespace*/
const template = `
<table class="play-field">
  <tbody>
    <tr v-for="row in playField.numRows">
      <td v-for="col in playField.numCols">
        <div class="cell" :class="{'garbage-cell': garbageCell(row,col), 'tetromino-cell':tetrominoCell(row,col)}">
        </div>
      </td>  
    </tr>
  </tbody>
</table>
`;

/* tslint:enable no-trailing-whitespace*/

interface IPlayFieldVue extends Vue {
    playField: PlayField;
}

const PlayFieldVue = {
    data() {
        return {};
    },
    methods: {
        tetrominoCell(row, col) {
            row = this.playField.numRows - row - 1;
            const tetromino = this.playField.tetromino;
            return tetromino.filledSquares().some((cell) => {
                return tetromino.row - cell.row === row && cell.col + tetromino.col === col;
            });
        },
        garbageCell(row, col): boolean {
            const garbageArea = this.playField.garbageArea;
            return garbageArea.filled({row, col}) !== undefined;
        },
    },
    props: ['playField'],
    template,
} as ComponentOptions<IPlayFieldVue>;

export {PlayFieldVue};
