import Vue, {ComponentOptions} from 'vue';
import {ITetromino} from './tetromino';

/* tslint:disable no-trailing-whitespace*/
const template = `
<div>
    <table class="preview-box">
      <tbody>
        <tr v-for="r in tetromino.height" v-show="r > 1">
          <td v-for="c in tetromino.width">
            <div class="cell">A
            </div>
          </td>  
        </tr>
      </tbody>
    </table>
</div>
`;

/* tslint:enable no-trailing-whitespace*/

interface ITetrominoVue extends Vue {
    tetromino: ITetromino;
}

const TetrominoVue = {
    created() {
    },
    data: {},
    methods: {},
    props: ['tetromino'],
    template,
} as ComponentOptions<ITetrominoVue>;

export {TetrominoVue};