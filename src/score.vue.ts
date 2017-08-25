import Vue, {ComponentOptions} from 'vue';
import './tetris.css';

/* tslint:disable no-trailing-whitespace*/
const template = `<div class="score">
<span class="label">Score:</span> <span class="value">{{score}}</span> 
</div>
`;

/* tslint:enable no-trailing-whitespace*/

interface IScoreVue extends Vue {
    score: number;
}

const ScoreVue = {
    props: ['score'],
    template,
} as ComponentOptions<IScoreVue>;

export {ScoreVue};
