import Vue, {ComponentOptions} from 'vue';
import {PlayFieldVue} from './playfield.vue';
import {IPlayFieldModel, Tetris} from './tetris';

interface ITetrisVue extends Vue {
    tetris: Tetris;
    area: IPlayFieldModel;
    timerId: any;

    calcArea(): IPlayFieldModel;

    onRight(): void;

    onLeft(): void;

    onDown(): void;

    moveDown(): void;

    restartTimer(): void;
}

const keyMap = {
    39: 'onRight', // arrow right
    37: 'onLeft', // arrow left
    40: 'onDown', // arrow down
};
const NULL_FUNCT = () => null;

const tetrisVue = {
    created() {
        this.tetris.start();
        this.area = this.calcArea();
        this.restartTimer();
    },
    components: {'play-field': PlayFieldVue},
    data: {
        area: null,
        tetris: new Tetris(20, 10),
        timerId: null,
    },
    el: '#app',
    methods: {
        calcArea(): IPlayFieldModel {
            return this.tetris.playFieldModel();
        },
        onKeyDown(evt) {
            const key = evt.which || evt.keyCode;
            (this[keyMap[key]] || NULL_FUNCT)();
            this.area = this.calcArea();
        },
        onRight() {
            this.tetris.moveRight();
        },
        onLeft() {
            this.tetris.moveLeft();
        },
        onDown() {
            this.restartTimer();
            this.moveDown();
        },
        moveDown() {
            this.tetris.moveDown();
            if (this.tetris.gameOver()) {
                clearTimeout(this.timerId);
                alert('Game over!');
            }
        },
        restartTimer() {
            clearTimeout(this.timerId);
            const moveDown = () => {
                this.area = this.calcArea();
                this.timerId = setTimeout(moveDown, 1500);
                this.moveDown();
            };
            this.timerId = setTimeout(moveDown, 1500);
        },
    },
    template: '<div tabindex="1" autofocus @keydown="onKeyDown($event)">' +
    '<play-field :area="area"></play-field>' +
    '</div>',
} as ComponentOptions<ITetrisVue>;

const app = new Vue(tetrisVue);
