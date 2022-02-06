const rooms = require("./rooms");
const ROT = require("rot-js");

let cur_level = 1;

const START_ROOM_COUNT = 3;
const ROOM_COUNT_INCREASE_PER_LEVEL = 2;

const CELL_SIZE = 16;
const ROOM_SIZE = 8;

const START_ENEMY_COUNT = 2;
const ENEMY_COUNT_INCREASE_PER_LEVEL = 1;

function generate_world(level) {
    cur_level = level;
    let rooms_data = generate_room_data();
    let spawn_locations = generate_rooms(rooms_data);
    // let world_data = generate_objects(spawn_locations);
    // return world_data;
}
generate_world(1);

function generate_room_data() {
    let room_count =
        START_ROOM_COUNT + cur_level + ROOM_COUNT_INCREASE_PER_LEVEL;
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

function generate_rooms(rooms) {
    let spawn_locations = {
        enemy_spawn_locations: [],
        pickup_spawn_locations: [],
        exit_coords: [0, 0],
    };
    let ind = 0;
    let walkable_floor_tiles = {};
    for (let room_data of Object.values(rooms)) {
        let only_do_walls = ind === 0;
        ind++;
        let coords = room_data.coords;
        let x_pos = coords[0] * ROOM_SIZE;
        let y_pos = coords[1] * ROOM_SIZE;
        let type = room_data.type;
    }

    return spawn_locations;
}

function generate_objects(spawn) {}
