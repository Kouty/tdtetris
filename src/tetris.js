"use strict";
exports.__esModule = true;
var playfield_1 = require("./playfield");
var tetrominoGenerator_1 = require("./tetrominoGenerator");
var Tetris = (function () {
    function Tetris(numRows, numCols) {
        this.generator = new tetrominoGenerator_1.TetrominoGenerator();
        this.playField = new playfield_1.PlayField(numRows, numCols);
        this.gameOverDetected = false;
    }
    Tetris.prototype.start = function () {
        this.spawnNext();
    };
    Tetris.prototype.moveDown = function () {
        var moved = this.playField.tetromino.moveDown();
        if (!moved) {
            this.spawnNext();
        }
    };
    Tetris.prototype.gameOver = function () {
        return this.gameOverDetected;
    };
    Tetris.prototype.spawnNext = function () {
        var spawned = this.playField.spawn(this.generator.next());
        this.gameOverDetected = !spawned;
    };
    return Tetris;
}());
exports.Tetris = Tetris;
