import Vue, {ComponentOptions} from 'vue';
import {PlayField} from './playfield';
import './tetris.css';

/* tslint:disable no-trailing-whitespace*/
const template = `
<table class="play-field">
  <tbody>
    <tr v-for="row in playField.numRows">
      <td v-for="col in playField.numCols">
        <div :class="{'garbage-cell': garbageCell(row,col), 'tetromino-cell':tetrominoCell(row,col)}"></div></td>  
    </tr>
  </tbody>
</table>
`;

/* tslint:enable no-trailing-whitespace*/

interface IPlayFieldVue extends Vue {
    playField: PlayField;
}

const PlayFieldVue = {
    created() {
    },
    data() {
        return {
            message: 'Hello!',
        };
    },
    methods: {
        tetrominoCell(row, col) {
            return false;
        },
        garbageCell(row, col): boolean {
            return Math.random() >= 0.5;
        },
    },
    props: ['playField'],
    template,
} as ComponentOptions<IPlayFieldVue>;

export {PlayFieldVue};
