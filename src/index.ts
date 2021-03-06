import Hammer from 'hammerjs';
import Vue, {ComponentOptions} from 'vue';
import VueToast from 'vue-toast';
import 'vue-toast/dist/vue-toast.min.css';
import {PlayFieldVue} from './playfield.vue';
import {ScoreVue} from './score.vue';
import {IPlayFieldModel, Tetris} from './tetris';
import {TetrominoVue} from './tetromino.vue';

const template = `
<div tabindex="1" @keydown="onKeyDown($event)" class="tetris">
    <play-field :area="area"></play-field>
    <div class="status-area">
      <tetromino :tetromino="tetris.nextTetromino()"></tetromino>
      <score :score="tetris.score"></score>
    </div>
    <vue-toast ref='toast'></vue-toast>
</div>
`;

interface ITetrisVue extends Vue {
    tetris: Tetris;
    area: IPlayFieldModel;
    timerId: any;
    paused: boolean;
    toast: any;

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
    mounted() {
        this.$el.focus();
        this.toast = this.$refs.toast;
        this.toast.setOptions({position: 'top right'});

        const manager = new Hammer.Manager(this.$el);
        manager.add(new Hammer.Pan());
        manager.add(new Hammer.Tap({taps: 1}));
        let lastdX = 0;
        manager.on('panmove', (e) => {
            const amount = 30;
            if (lastdX - e.deltaX > +amount) {
                this.tetris.moveLeft();
                lastdX = e.deltaX;
            } else if (lastdX - e.deltaX < -amount) {
                this.tetris.moveRight();
                lastdX = e.deltaX;
            }
            this.update();
        });
        manager.on('panend', (e) => {
            lastdX = 0;
        });

        manager.on('tap', () => {
            this.tetris.rotateClockwise();
            this.update();
        });
    },
    components: {'play-field': PlayFieldVue, 'tetromino': TetrominoVue, VueToast, 'score': ScoreVue},
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
            if (this.paused) {
                this.restartTimer();
                this.toast.closeAll();
            } else {
                this.clearTimer();
                this.toast.showToast(' Paused', {timeLife: 1000000, theme: 'info'});
            }
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
            if (!this.tetris.gameOver()) {
                this.tetris.moveDown();
                if (this.tetris.gameOver()) {
                    this.clearTimer();
                    this.toast.showToast('Game Over!', {timeLife: 6000, theme: 'error'});
                }
                this.update();
            }
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
    template,
} as ComponentOptions<ITetrisVue>;

const app = new Vue(tetrisVue);
