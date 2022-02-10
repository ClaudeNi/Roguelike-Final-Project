const ROT = require("rot-js");

var Game = {
    display: null,
    map: {},

    _generateMap: function () {
        this.map = {};
        var digger = new ROT.Map.Digger();
        var freeCells = [];

        var digCallback = function (x, y, value) {
            if (value) {
                return;
            }

            var key = x + "," + y;
            this.map[key] = ".";
            freeCells.push(key);
        };
        digger.create(digCallback.bind(this));
        this.generateWalls();

        return {
            map: this.map,
            freeCells: freeCells,
        };
    },

    generateWalls: function () {
        Object.keys(this.map).forEach((cell) => {
            let coords = cell.split(",");
            if (
                this.map[
                    `${parseInt(coords[0]) + 1},${parseInt(coords[1])}`
                ] === undefined
            ) {
                this.map[`${parseInt(coords[0]) + 1},${parseInt(coords[1])}`] =
                    "#";
            }
            if (
                this.map[
                    `${parseInt(coords[0])},${parseInt(coords[1]) + 1}`
                ] === undefined
            ) {
                this.map[`${parseInt(coords[0])},${parseInt(coords[1]) + 1}`] =
                    "#";
            }
            if (
                this.map[
                    `${parseInt(coords[0]) - 1},${parseInt(coords[1])}`
                ] === undefined
            ) {
                this.map[`${parseInt(coords[0]) - 1},${parseInt(coords[1])}`] =
                    "#";
            }
            if (
                this.map[
                    `${parseInt(coords[0])},${parseInt(coords[1]) - 1}`
                ] === undefined
            ) {
                this.map[`${parseInt(coords[0])},${parseInt(coords[1]) - 1}`] =
                    "#";
            }
        });
    },
};

exports.module = Game;
