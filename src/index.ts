import Vue from 'vue';
import {Tetris} from './tetris';

const app = new Vue({
    created() {
        console.log(new Tetris(20, 10));
    },
    data: {
        message: 'Hello Vue!',
    },
    el: '#app',
    template: '<div>{{message}}</div>',
});
