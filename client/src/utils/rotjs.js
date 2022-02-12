const ROT = require("rot-js");

let Game = {
    display: null,
    map: {},
    player: null,
    engine: null,
    enemies: [],

    init: function (canvasDiv) {
        this.display = new ROT.Display({ spacing: 1.1 });
        canvasDiv.appendChild(this.display.getContainer());

        this._generateMap();
    },

    _generateMap: function () {
        this.display.clear();
        this.resetAll();
        let digger = new ROT.Map.Digger();
        let freeCells = [];

        let digCallback = function (x, y, value) {
            if (value) {
                return;
            }

            let key = x + "," + y;
            this.map[key] = ".";
            // freeCells.push(key);
        };
        digger.create(digCallback.bind(this));
        this.generateWalls();
        Object.keys(this.map).forEach((coords) => {
            if (this.map[coords] === ".") {
                if (this.checkIfNotCorridor(coords)) {
                    freeCells.push(coords);
                }
            }
        });
        this.generateWhat(freeCells, "Staircase");

        this._createPlayer(freeCells);

        // this.map[`${this.player.getX()},${this.player.getY()}`] = "P";
        for (let i = 0; i < 5; i++) {
            this.generateWhat(freeCells, "Enemy");
        }

        this._drawWholeMap();

        let scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },

    _drawWholeMap: function () {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            if (this.map[key] === "P") {
                this.player._draw();
                continue;
            }
            let color = "#fff";
            switch (this.map[key]) {
                case "E":
                    color = "#f00";
                    break;
                case "S":
                    color = "#0f0";
                    break;
                case "#":
                    color = "#ccc";
                    break;
                default:
                    color = "#fff";
                    break;
            }
            this.display.draw(x, y, this.map[key], color);
        }
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

    resetAll: function () {
        this.map = {};
        this.player = null;
        this.enemies = [];
    },

    _createPlayer: function (freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.player = new Player(x, y);
    },

    generateWhat: function (freeCells, what) {
        let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        let key = freeCells.splice(index, 1)[0];
        let type = "";
        switch (what) {
            case "Staircase":
                type = "S";
                break;
            case "Player":
                type = "P";
                this.player = key;
                break;
            case "Enemy":
                type = "E";
                this.enemies.push(key);
                break;
            default:
                type = ".";
                break;
        }
        this.map[key] = type;
    },

    checkIfNotCorridor: function (coord) {
        let coords = coord.split(",");
        let x = parseInt(coords[0]);
        let y = parseInt(coords[1]);
        let left,
            right,
            top,
            bottom,
            topRight,
            topLeft,
            bottomRight,
            bottomLeft;
        left = this.map[`${x - 1},${y}`];
        right = this.map[`${x + 1},${y}`];
        top = this.map[`${x},${y + 1}`];
        bottom = this.map[`${x},${y - 1}`];
        topRight = this.map[`${x + 1},${y + 1}`];
        topLeft = this.map[`${x - 1},${y + 1}`];
        bottomRight = this.map[`${x + 1},${y - 1}`];
        bottomLeft = this.map[`${x - 1},${y - 1}`];

        if (
            (left === "#" && right === "#") ||
            (top === "#" && bottom === "#")
        ) {
            return false;
        }
        if (
            (left === "#" && bottom === "#" && topRight === "#") ||
            (left === "#" && top === "#" && bottomRight === "#") ||
            (right === "#" && bottom === "#" && topLeft === "#") ||
            (right === "#" && top === "#" && bottomLeft === "#")
        ) {
            return false;
        }
        return true;
    },
};

var Player = function (x, y) {
    this._x = x;
    this._y = y;
    this._draw();
};

Player.prototype.getSpeed = function () {
    return 100;
};
Player.prototype.getX = function () {
    return this._x;
};
Player.prototype.getY = function () {
    return this._y;
};

Player.prototype.act = function () {
    Game.engine.lock();
    window.addEventListener("keydown", this);
};

Player.prototype.handleEvent = function (e) {
    var code = e.keyCode;
    if (code === 13 || code === 32) {
        this._checkBox();
        return;
    }

    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    /* one of numpad directions? */
    if (!(code in keyMap)) {
        return;
    }

    /* is there a free space? */
    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    var newKey = newX + "," + newY;
    if (Game.map[newKey] === "#") {
        return;
    }

    let color = "#fff";
    switch (Game.map[this._x + "," + this._y]) {
        case "E":
            color = "#f00";
            break;
        case "S":
            color = "#0f0";
            break;
        default:
            color = "#fff";
            break;
    }

    Game.display.draw(
        this._x,
        this._y,
        Game.map[this._x + "," + this._y],
        color
    );
    // Game.map[`${this._X},${this._Y}`] = ".";
    this._x = newX;
    this._y = newY;
    // Game.map[`${newX},${newY}`] = "P";
    this._draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
};

Player.prototype._draw = function () {
    Game.display.draw(this._x, this._y, "P", "#ff0");
};

Player.prototype._checkBox = function () {
    var key = this._x + "," + this._y;
    if (Game.map[key] === "S") {
        Game._generateMap();
        window.removeEventListener("keydown", this);
    }
};

exports.module = Game;
