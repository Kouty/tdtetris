import Vue from 'vue';
import {PlayFieldComponent} from './playfield.vue';
import {Tetris} from './tetris';

const app = new Vue({
    created() {
        // NO-OP for now
    },
    components: {'play-field': PlayFieldComponent},
    data: {
        tetris: new Tetris(20, 10),
    },
    el: '#app',
    template: '<div><play-field></play-field></div>',
});
