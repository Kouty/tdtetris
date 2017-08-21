import Vue, {ComponentOptions} from 'vue';
import {PlayFieldVue} from './playfield.vue';
import {IPlayFieldModel, Tetris} from './tetris';

interface ITetrisVue extends Vue {
    tetris: Tetris;
    area: IPlayFieldModel;
    timerId: any;
    paused: boolean;

    calcArea(): IPlayFieldModel;

    onRight(): void;

    onLeft(): void;

    onDown(): void;

    moveDown(): void;

    onPause(): void;

    restartTimer(): void;

    clearTimer(): void;

    update(): void;
}

// http://www.tetrisfriends.com/help/tips_appendix.php#controls
// Move Left	LEFT Arrow	Numpad 4
// Move Right	RIGHT Arrow	Numpad 6
// Hard Drop	Space Bar	Numpad 8
// Soft Drop	DOWN Arrow	Numpad 2
// Rotate Right	UP Arrow, X	Numpad 1, 5, 9
// Rotate Left	Control, Z	Numpad 3, 7
// Pause	    ESC, F1, P

const keyMap = {
    17: 'onRotateCounterClockwise', // ctrl
    27: 'onPause', // ESC
    38: 'onRotateClockwise', // arrow up
    39: 'onRight', // arrow right
    37: 'onLeft', // arrow left
    40: 'onDown', // arrow down
    80: 'onPause', // P
    88: 'onRotateClockwise', // X key
    90: 'onRotateCounterClockwise', // X key
};
const NULL_FUNCT = () => null;

const tetrisVue = {
    created() {
        this.paused = false;
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
        },
        onPause() {
            this.paused ? this.restartTimer() : this.clearTimer();
            this.paused = !this.paused;
        },
        onRotateClockwise() {
            this.tetris.rotateClockwise();
            this.update();
        },
        onRotateCounterClockwise() {
            this.tetris.rotateCounterClockwise();
            this.update();
        },
        onRight() {
            this.tetris.moveRight();
            this.update();
        },
        onLeft() {
            this.tetris.moveLeft();
            this.update();
        },
        onDown() {
            this.restartTimer();
            this.moveDown();
        },
        moveDown() {
            this.tetris.moveDown();
            if (this.tetris.gameOver()) {
                this.clearTimer();
                setTimeout(() => {
                    alert('Game over!');
                }, 10);
            }
            this.update();
        },
        restartTimer() {
            this.clearTimer();
            const moveDown = () => {
                this.timerId = setTimeout(moveDown, 1500);
                this.moveDown();
            };
            this.timerId = setTimeout(moveDown, 1500);
        },
        clearTimer() {
            clearTimeout(this.timerId);
        },
        update() {
            this.area = this.calcArea();
        },
    },
    template: '<div tabindex="1" autofocus @keydown="onKeyDown($event)">' +
    '<play-field :area="area"></play-field>' +
    '</div>',
} as ComponentOptions<ITetrisVue>;

const app = new Vue(tetrisVue);
