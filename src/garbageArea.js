"use strict";
exports.__esModule = true;
var GarbageArea = (function () {
    function GarbageArea(numCols) {
        this.numCols = numCols;
        this.area = [];
    }
    GarbageArea.prototype.fill = function (position, tetromino) {
        this.area[this.toIndex(position)] = tetromino;
    };
    GarbageArea.prototype.filled = function (position) {
        return this.area[this.toIndex(position)];
    };
    GarbageArea.prototype.clearFilledRows = function () {
        for (var row = 0; row < Math.ceil(this.area.length / this.numCols); row++) {
            var counter = 0;
            for (var col = 0; col < this.numCols; col++) {
                if (this.filled({ row: row, col: col })) {
                    counter++;
                }
            }
            if (counter === this.numCols) {
                this.clearRow(row);
                row--;
            }
        }
    };
    GarbageArea.prototype.clearRow = function (row) {
        for (var col = 0; col < this.numCols; col++) {
            this.fill({ row: row, col: col }, undefined);
        }
        this.area.splice(row * this.numCols, this.numCols);
    };
    GarbageArea.prototype.toIndex = function (position) {
        return position.row * this.numCols + position.col;
    };
    return GarbageArea;
}());
exports.GarbageArea = GarbageArea;
