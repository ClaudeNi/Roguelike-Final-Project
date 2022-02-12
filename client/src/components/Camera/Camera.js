import React, { useEffect, useRef, useState } from "react";
import Map from "../Map/Map";
import Player from "../Player/Player";
import "./camera.css";

const Camera = () => {
    let xAxisMap = 0;
    let yAxisMap = 0;
    let xAxisPlayer = 0;
    let yAxisPlayer = 0;

    const mapRef = useRef();
    const playerRef = useRef();

    useEffect(() => {
        window.addEventListener("keypress", (e) => {
            let key = e.key;
            window.requestAnimationFrame(() => {
                moveMap(key);
            });
        });
    });

    const moveMap = (key) => {
        switch (key) {
            case "d":
                xAxisMap++;
                xAxisPlayer--;
                break;
            case "a":
                xAxisMap--;
                xAxisPlayer++;
                break;
            case "w":
                yAxisMap--;
                yAxisPlayer++;
                break;
            case "s":
                yAxisMap++;
                yAxisPlayer--;
                break;
        }
        translateMap();
        // playerRef.current.style.transform = `translate3d(${
        //     xAxisPlayer * -16
        // }px, ${yAxisPlayer * -16}px, 0)`;
    };

    const translateMap = () => {
        mapRef.current.style.transform = `translate3d(${xAxisMap * -16}px, ${
            yAxisMap * -16
        }px, 0)`;
    };

    const setPos = (coords, maxX, maxY) => {
        const coord = coords.split(",");
        const tempX = parseInt(coord[0]);
        const tempY = parseInt(coord[1]);
        // let moveX = 0;
        // let moveY = 0;
        // if (tempX <= maxX / 2) {
        //     moveX = Math.floor(maxX / 2) - (Math.floor(maxX / 2) - tempX);
        // }
        // if (tempX > maxX / 2) {
        //     moveX = Math.floor(maxX / 2 - (Math.floor(maxX / 2) - tempX)) * -1;
        // }
        // if (tempY <= maxY / 2) {
        //     moveY = Math.floor(maxY / 2) - (Math.floor(maxY / 2) - tempY);
        // }
        // if (tempY > maxY / 2) {
        //     moveY = Math.floor(maxY / 2 - (Math.floor(maxY / 2) - tempY)) * -1;
        // }
        // console.log(maxX, maxY, coords, moveX, moveY);
        // xAxisMap = tempX;
        // yAxisMap = tempY;
        // translateMap();
        // playerRef.current.style.top = `${(maxY / 2) * 16}px`;
        // playerRef.current.style.left = `${(maxX / 2) * 16}px`;
    };

    return (
        <div className="camera">
            <div ref={mapRef} className="camera-map">
                <Map mapHandle={setPos} />
            </div>
            <div ref={playerRef} className="camera-player">
                <Player />
            </div>
        </div>
    );
};

export default Camera;
