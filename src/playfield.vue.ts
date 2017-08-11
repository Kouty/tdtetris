import Vue, {ComponentOptions} from 'vue';
import {PlayField} from './playfield';
import './tetris.css';

/* tslint:disable no-trailing-whitespace*/
const template = `
<table>
  <tbody>
    <tr v-for="row in playField.numRows">
      <td v-for="col in playField.numCols"><div :class="{garbageCell: garbageCellFilled(row,col)}"></div></td>  
    </tr>
  </tbody>
</table>
`;

/* tslint:enable no-trailing-whitespace*/

interface IPlayFieldVue extends Vue {
    message: string;
    playField: PlayField;

    onClick (): void;
}

const PlayFieldVue = {
    created() {
        console.log(this.playField);
    },
    data() {
        return {
            message: 'Hello!',
        };
    },
    methods: {
        garbageCellClass(row, col) {
            // AAA
        },
        garbageCellFilled(row, col): boolean {
            return Math.random() >= 0.5;
        },
    },
    props: ['playField'],
    template,
} as ComponentOptions<IPlayFieldVue>;

export {PlayFieldVue};
