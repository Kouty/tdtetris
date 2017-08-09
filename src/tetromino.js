"use strict";
exports.__esModule = true;
var I = (function () {
    function I() {
        this.width = 4;
        this.height = 4;
    }
    I.create = function () {
        return new I();
    };
    I.prototype.filledSquares = function () {
        return [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }, { row: 3, col: 2 }];
    };
    return I;
}());
var Tetrominoes = {
    I: I
};
exports.Tetrominoes = Tetrominoes;
