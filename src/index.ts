import Vue, {ComponentOptions} from 'vue';
import {IArea, PlayFieldVue} from './playfield.vue';
import {Tetris} from './tetris';

interface ITetrisVue extends Vue {
    tetris: Tetris;
    area: IArea;

    calcArea(): IArea;
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
    },
    components: {'play-field': PlayFieldVue},
    data: {
        area: null,
        tetris: new Tetris(20, 10),
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
            this.tetris.moveDown();
            if (this.tetris.gameOver()) {
                alert('Game over!');
            }
        },
    },
    template: '<div tabindex="1" autofocus @keydown="onKeyDown($event)">' +
    '<play-field :area="area"></play-field>' +
    '</div>',
} as ComponentOptions<ITetrisVue>;

const app = new Vue(tetrisVue);
