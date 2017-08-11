import Vue, {ComponentOptions} from 'vue';
import {PlayFieldVue} from './playfield.vue';
import {Tetris} from './tetris';

interface ITetrisVue extends Vue {
    tetris: Tetris;
}

const tetrisVue = {
    created() {
        this.tetris.start();
    },
    components: {'play-field': PlayFieldVue},
    data: {
        tetris: new Tetris(20, 10),
    },
    el: '#app',
    template: '<div><play-field :play-field="tetris.playField"></play-field></div>',
} as ComponentOptions<ITetrisVue>;

const app = new Vue(tetrisVue);
