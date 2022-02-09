const ROT = require("rot-js");
// const imgsrc = require("./sprite-sheet.png");

// // var image = new Image();
// // image.src = imgsrc;

// var tileSet = document.createElement("img");
// tileSet.src = "./sprite-sheet.png";

// var options = {
//     layout: "tile-gl",
//     bg: "transparent",
//     tileWidth: 16,
//     tileHeight: 16,
//     tileSet: imgsrc,
//     tileMap: {
//         ".": [1, 1],
//         // "@": [1, 1],
//         "#": [1, 18],
//     },
// };

var Game = {
    display: null,
    map: {},

    init: function () {
        this.display = new ROT.Display();
        document.querySelector(".map").appendChild(this.display.getContainer());

        this._generateMap();
    },

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

        return this.map;

        // this._generateBoxes(freeCells);

        // this._drawWholeMap();
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

    // _generateBoxes: function(freeCells) {
    //     for (var i=0;i<10;i++) {
    //         var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    //         var key = freeCells.splice(index, 1)[0];
    //         this.map[key] = "*";
    //     }
    // },

    // _drawWholeMap: function () {
    //     for (var key in this.map) {
    //         var parts = key.split(",");
    //         var x = parseInt(parts[0]);
    //         var y = parseInt(parts[1]);
    //         this.display.draw(x, y, this.map[key]);
    //     }
    // },
};

exports.module = Game;
