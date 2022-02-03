// S = Spawn
// W = Wall
// A = Air
// D = Down Stairs
// U = Up Stairs
// T = Treasure
// E = Enemy
// I = Shop Item

const startRoom = [
    "W W W W W W W W",
    "W A A A A A A W",
    "W A A A A A A W",
    "W A A U A A A W",
    "W A A A S A A W",
    "W A A A A A A W",
    "W A A A A A A W",
    "W W W W W W W W",
];

const endRoom = [
    "W W W W W W W W",
    "W A A A A A T W",
    "W A W A A A A W",
    "W A A W A A A W",
    "W A A A D W A W",
    "W A A A W A A W",
    "W A A A A A A W",
    "W W W W W W W W",
];

const rooms = {
    room1: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A W A T W A W",
        "W A A W W A A W",
        "W A A W W A A W",
        "W A W E A W A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room2: [
        "W W W W W W W W",
        "W W A A A A W W",
        "W A E A A A A W",
        "W A A A A A A W",
        "W A A A A A A W",
        "W A A A A E A W",
        "W W A A A A W W",
        "W W W W W W W W",
    ],

    room3: [
        "W W W W W W W W",
        "W E A A A A E W",
        "W A A A A W A W",
        "W A A W T A A W",
        "W A A T W A A W",
        "W A W A A A A W",
        "W E A A A A E W",
        "W W W W W W W W",
    ],

    room4: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A W A A A A W",
        "W A A W A W A W",
        "W A W A W E A W",
        "W A A A A W A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room5: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A W W A A A W",
        "W A W E A A A W",
        "W A A A A W A W",
        "W A A A W W A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room6: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A W A A W A W",
        "W A W A E W A W",
        "W A W E A W A W",
        "W A W A A W A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room7: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A T A A A A W",
        "W A A A A A A W",
        "W A A A A A A W",
        "W A A A A E A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room8: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A A W A W A W",
        "W A W E A A A W",
        "W A A A A A A W",
        "W A W A A W A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room9: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A A W W A A W",
        "W A A A A A A W",
        "W A W T E W A W",
        "W A W A A W A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room10: [
        "W W W W W W W W",
        "W W W A A W W W",
        "W W W A A W W W",
        "W A A A A T A W",
        "W A A A A A A W",
        "W W W A A W W W",
        "W W W A A W W W",
        "W W W W W W W W",
    ],

    room11: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A A W A W A W",
        "W A W E A W A W",
        "W A W T E W A W",
        "W A A W W A A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room12: [
        "W W W W W W W W",
        "W A A A A A A W",
        "W A A A A A A W",
        "W A A A A A A W",
        "W A A A A A A W",
        "W A A A A A A W",
        "W A A A A A A W",
        "W W W W W W W W",
    ],

    room13: [
        "W W W W W W W W",
        "W A A A A A E W",
        "W A W A A W A W",
        "W A W W W W A W",
        "W A W W W W A W",
        "W A W A A W A W",
        "W E A A A A T W",
        "W W W W W W W W",
    ],

    room14: [
        "W W W W W W W W",
        "W E A A A A E W",
        "W W W A A W W W",
        "W A A A T A A W",
        "W A A A A A A W",
        "W A W A A W A W",
        "W E W A A W E W",
        "W W W W W W W W",
    ],

    room15: [
        "W W W W W W W W",
        "W A A A A A E W",
        "W A A W W A A W",
        "W A W E A A A W",
        "W A A A E W A W",
        "W A A W W A A W",
        "W E A A A A T W",
        "W W W W W W W W",
    ],

    room16: [
        "W W W W W W W W",
        "W W W A A W W W",
        "W W E A A T W W",
        "W A A W W A A W",
        "W A A W W A A W",
        "W W A A A E W W",
        "W W W A A W W W",
        "W W W W W W W W",
    ],
};

module.exports = {
    startRoom,
    endRoom,
    rooms,
};
