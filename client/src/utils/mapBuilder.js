const rooms = require("./rooms");
const ROT = require("rot-js");

let curLevel = 1;

const START_ROOM_COUNT = 3;
const ROOM_COUNT_INCREASE_PER_LEVEL = 2;

const ROOM_SIZE = 8;

const START_ENEMY_COUNT = 2;
const ENEMY_COUNT_INCREASE_PER_LEVEL = 1;

function generate_world(level) {
    curLevel = level;
    let roomsData = generate_room_data();
    let newRoomsData = findMin(roomsData);
    let spawnLocations = generate_rooms(newRoomsData);
    let worldData = generate_objects(spawnLocations);
    return worldData;
}

function generate_room_data() {
    let room_count =
        START_ROOM_COUNT + curLevel + ROOM_COUNT_INCREASE_PER_LEVEL;
    let rooms_data = {
        "0,0": {
            type: "startRoom",
            coords: [0, 0],
        },
    };

    let possible_room_locations = get_available_room_slots(rooms_data, [0, 0]);
    let generated_rooms = [];
    for (let i = 0; i < room_count; i++) {
        let rand_room_type = ROT.RNG.getItem(Object.keys(rooms.rooms));
        let rand_room_loc = select_rand_room_location(
            possible_room_locations,
            rooms_data
        );
        rooms_data[rand_room_loc] = {
            type: rand_room_type,
            coords: rand_room_loc,
        };
        generated_rooms.push(rand_room_loc); // never used again?
        possible_room_locations = possible_room_locations.concat(
            get_available_room_slots(rooms_data, rand_room_loc)
        );
    }

    let rand_room_loc = select_rand_room_location(
        possible_room_locations,
        rooms_data
    );
    rooms_data[rand_room_loc] = {
        type: "endRoom",
        coords: rand_room_loc,
    };

    return rooms_data;
}

function select_rand_room_location(possible_room_locations, rooms_data) {
    let rand_ind = Math.floor(Math.random() * possible_room_locations.length);
    let rand_room_loc = possible_room_locations[rand_ind];
    possible_room_locations.splice(rand_ind, 1);
    if (rooms[rand_room_loc.join(",")] !== undefined) {
        rand_room_loc = select_rand_room_location(
            possible_room_locations,
            rooms_data
        );
    }
    return rand_room_loc;
}

function get_available_room_slots(rooms, coords) {
    let empty_available_rooms = [];
    let ava_rooms = [
        [parseInt(coords[0]) + 0, parseInt(coords[1]) + 1],
        [parseInt(coords[0]) + 1, parseInt(coords[1]) + 0],
        [parseInt(coords[0]) + 0, parseInt(coords[1]) - 1],
        [parseInt(coords[0]) - 1, parseInt(coords[1]) + 0],
    ];
    for (let coord of ava_rooms) {
        if (rooms[coord.join(",")] === undefined) {
            empty_available_rooms.push(coord);
        }
    }
    return empty_available_rooms;
}

function findMin(roomsData) {
    let minX = 0,
        minY = 0;
    let newRoomsData = {};
    for (let room of Object.keys(roomsData)) {
        let coords = room.split(",");
        if (parseInt(coords[0]) < minX) {
            minX = parseInt(coords[0]);
        }
        if (parseInt(coords[1]) < minY) {
            minY = parseInt(coords[1]);
        }
    }
    for (let room of Object.keys(roomsData)) {
        let coords = room.split(",");
        let coord = `${parseInt(coords[0]) + Math.abs(minX)},${
            parseInt(coords[1]) + Math.abs(minY)
        }`;
        newRoomsData[coord] = roomsData[room];
        newRoomsData[coord].coords = coord;
    }

    return newRoomsData;
}

function generate_rooms(rooms_data) {
    let spawn_locations = {
        walls: [],
        enemy_spawn_locations: [],
        pickup_spawn_locations: [],
        up_coords: [],
        down_coords: [],
        player: [],
        air: [],
    };

    const iterable_rooms = rooms.rooms;
    iterable_rooms.startRoom = rooms.startRoom;
    iterable_rooms.endRoom = rooms.endRoom;

    for (let room_data of Object.values(rooms_data)) {
        let coords = room_data.coords.split(",");
        let type = room_data.type;
        let x_pos = 0;
        let y_pos = 0;
        let x_cell_pos = parseInt(coords[0]) * ROOM_SIZE + x_pos;
        let y_cell_pos = parseInt(coords[1]) * ROOM_SIZE + y_pos;
        let spacesY = 0;
        for (let y of iterable_rooms[type]) {
            x_pos = 0;
            let spacesX = 0;
            for (let x of y) {
                x_cell_pos = parseInt(coords[0]) * ROOM_SIZE + x_pos;
                y_cell_pos = parseInt(coords[1]) * ROOM_SIZE + y_pos;
                let cell_type = "";
                switch (x) {
                    case "W":
                        cell_type = "walls";
                        break;
                    case "E":
                        cell_type = "enemy_spawn_locations";
                        break;
                    case "T":
                        cell_type = "pickup_spawn_locations";
                        break;
                    case "U":
                        cell_type = "up_coords";
                        break;
                    case "D":
                        cell_type = "down_coords";
                        break;
                    case "S":
                        cell_type = "player";
                        break;
                    case "A":
                        cell_type = "air";
                        break;
                    default:
                        cell_type = "";
                        spacesX++;
                        break;
                }
                if (cell_type !== "") {
                    spawn_locations[cell_type].push(
                        `${x_cell_pos - spacesX},${y_cell_pos - spacesY}`
                    );
                }

                x_pos++;
            }
            spacesY++;
            y_pos++;
        }

        // let room_at_left =
        //     rooms_data[`${coords[0] - 1},${coords[1]}`] !== undefined;
        // let room_at_right =
        //     rooms_data[`${coords[0] + 1},${coords[1]}`] !== undefined;
        // let room_at_top =
        //     rooms_data[`${coords[0]},${coords[1] - 1}`] !== undefined;
        // let room_at_bottom =
        //     rooms_data[`${coords[0]},${coords[1] + 1}`] !== undefined;

        // if (room_at_left) {
        //     for (let i = 3; i < 5; i++) {
        //         const ind = spawn_locations.walls.indexOf([
        //             coords[0] * ROOM_SIZE,
        //             coords[1] * ROOM_SIZE + i,
        //         ]);
        //         spawn_locations.walls.splice(ind, 1);
        //     }
        // }
        // if (room_at_right) {
        //     for (let i = 3; i < 5; i++) {
        //         const ind = spawn_locations.walls.indexOf([
        //             coords[0] * ROOM_SIZE + ROOM_SIZE - 1,
        //             coords[1] * ROOM_SIZE + i,
        //         ]);
        //         spawn_locations.walls.splice(ind, 1);
        //     }
        // }
        // if (room_at_top) {
        //     for (let i = 3; i < 5; i++) {
        //         const ind = spawn_locations.walls.indexOf([
        //             coords[0] * ROOM_SIZE + i,
        //             coords[1] * ROOM_SIZE,
        //         ]);
        //         spawn_locations.walls.splice(ind, 1);
        //     }
        // }
        // if (room_at_bottom) {
        //     for (let i = 3; i < 5; i++) {
        //         const ind = spawn_locations.walls.indexOf([
        //             coords[0] * ROOM_SIZE + i,
        //             coords[1] * ROOM_SIZE + ROOM_SIZE - 1,
        //         ]);
        //         spawn_locations.walls.splice(ind, 1);
        //     }
        // }
    }

    return spawn_locations;
}

function generate_objects(spawn_locations) {
    let enemy_count =
        START_ENEMY_COUNT + ENEMY_COUNT_INCREASE_PER_LEVEL * curLevel;
    let enemies_locations = [...spawn_locations.enemy_spawn_locations];
    let enemies = [];
    for (let i = 0; i < enemy_count; i++) {
        if (enemies_locations.length === 0) {
            break;
        }
        const enemy_ind = Math.floor(Math.random() * enemies_locations.length);
        enemies.push(enemies_locations[enemy_ind]);
        enemies_locations.splice(enemy_ind, 1);
    }

    let pickups_locations = [...spawn_locations.pickup_spawn_locations];
    let pickups = [];
    for (let j = 0; j < spawn_locations.pickup_spawn_locations.length; j++) {
        const chance = Math.random();
        if (chance >= 0.25) {
            const pickup_ind = Math.floor(
                Math.random() * pickups_locations.length
            );
            pickups.push(pickups_locations[pickup_ind]);
            pickups_locations.splice(pickup_ind, 1);
        }
    }

    let data = {
        walls: spawn_locations.walls,
        enemies: enemies,
        pickups: pickups,
        player: spawn_locations.player,
        upStairs: spawn_locations.up_coords,
        downStairs: spawn_locations.down_coords,
    };

    return data;
}

module.exports = generate_world;
