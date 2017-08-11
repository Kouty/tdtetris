import Vue, {ComponentOptions} from 'vue';
import {IArea, PlayFieldVue} from './playfield.vue';
import {Tetris} from './tetris';

interface ITetrisVue extends Vue {
    tetris: Tetris;
    area: IArea;
    timerId: any;

    calcArea(): IArea;

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
        calcArea(): IArea {
            const colors: number[] = [];
            const tetromino = this.tetris.playField.tetromino;
            const numCols = this.tetris.playField.numCols;
            const numRows = this.tetris.playField.numRows;

            const garbageArea = this.tetris.playField.garbageArea;
            for (let row = 0; row < numRows; row++) {
                for (let col = 0; col < numCols; col++) {
                    if (garbageArea.filled({row, col}) !== undefined) {
                        const rowInPlayField = numRows - 1 - row;
                        colors[rowInPlayField * numCols + col] = 0;
                    }
                }
            }

            tetromino.filledSquares().forEach((cell) => {
                const row = numRows - 1 - (tetromino.row - cell.row);
                const col = tetromino.col + cell.col;
                colors[row * numCols + col] = 1;
            });

            return {
                colors,
                numCols: this.tetris.playField.numCols,
                numRows: this.tetris.playField.numRows,
            };
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
                this.moveDown();
                this.area = this.calcArea();
                this.timerId = setTimeout(moveDown, 1500);
            };
            this.timerId = setTimeout(moveDown, 1500);
        },
    },
    template: '<div tabindex="1" autofocus @keydown="onKeyDown($event)">' +
    '<play-field :area="area"></play-field>' +
    '</div>',
} as ComponentOptions<ITetrisVue>;

const app = new Vue(tetrisVue);
