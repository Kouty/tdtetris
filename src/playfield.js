"use strict";
exports.__esModule = true;
var garbageArea_1 = require("./garbageArea");
var PlayField = (function () {
    function PlayField(numRows, numCols) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.garbageAreaImpl = new garbageArea_1.GarbageArea(this.numCols);
    }
    PlayField.prototype.spawn = function (tetromino) {
        var row = this.numRows - 1;
        var col = Math.floor((this.numCols - tetromino.width) / 2);
        this.placedTetromino = new PlacedTetromino(tetromino, { row: row, col: col }, this.numCols, this.garbageAreaImpl);
        return !this.placedTetromino.garbageAreaContainsTetromino();
    };
    Object.defineProperty(PlayField.prototype, "tetromino", {
        get: function () {
            return this.placedTetromino;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayField.prototype, "garbageArea", {
        get: function () {
            return this.garbageAreaImpl;
        },
        enumerable: true,
        configurable: true
    });
    return PlayField;
}());
exports.PlayField = PlayField;
var PlacedTetromino = (function () {
    function PlacedTetromino(tetromino, position, numCols, garbageArea) {
        this.tetromino = tetromino;
        this.numCols = numCols;
        this.garbageArea = garbageArea;
        this.position = {
            col: position.col,
            row: position.row
        };
    }
    Object.defineProperty(PlacedTetromino.prototype, "row", {
        get: function () {
            return this.position.row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlacedTetromino.prototype, "col", {
        get: function () {
            return this.position.col;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlacedTetromino.prototype, "width", {
        get: function () {
            return this.tetromino.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlacedTetromino.prototype, "height", {
        get: function () {
            return this.tetromino.height;
        },
        enumerable: true,
        configurable: true
    });
    PlacedTetromino.prototype.filledSquares = function () {
        return this.tetromino.filledSquares();
    };
    PlacedTetromino.prototype.moveLeft = function () {
        this.position.col--;
        if (this.outsideLeftBound() || this.garbageAreaContainsTetromino()) {
            this.position.col++;
        }
    };
    PlacedTetromino.prototype.moveRight = function () {
        this.position.col++;
        if (this.outsideRightBound() || this.garbageAreaContainsTetromino()) {
            this.position.col--;
        }
    };
    PlacedTetromino.prototype.moveDown = function () {
        this.position.row--;
        var moved = true;
        if (this.outsideBottomBound() || this.garbageAreaContainsTetromino()) {
            this.position.row++;
            moved = false;
            this.addTetrominoToGarbageArea();
        }
        return moved;
    };
    PlacedTetromino.prototype.garbageAreaContainsTetromino = function () {
        var _this = this;
        return this.tetromino.filledSquares().some(function (square) {
            return _this.garbageArea.filled({ row: _this.position.row - square.row, col: square.col + _this.position.col }) !== undefined;
        });
    };
    PlacedTetromino.prototype.addTetrominoToGarbageArea = function () {
        var _this = this;
        this.tetromino.filledSquares().forEach(function (square) {
            _this.garbageArea.fill({ row: _this.position.row - square.row, col: square.col + _this.position.col }, _this.tetromino);
        });
        this.garbageArea.clearFilledRows();
    };
    PlacedTetromino.prototype.outsideLeftBound = function () {
        var _this = this;
        return this.tetromino.filledSquares().some(function (square) {
            return square.col + _this.position.col < 0;
        });
    };
    PlacedTetromino.prototype.outsideRightBound = function () {
        var _this = this;
        return this.tetromino.filledSquares().some(function (square) {
            return square.col + _this.position.col >= _this.numCols;
        });
    };
    PlacedTetromino.prototype.outsideBottomBound = function () {
        var _this = this;
        return this.tetromino.filledSquares().some(function (square) {
            return -square.row + _this.position.row < 0;
        });
    };
    return PlacedTetromino;
}());
