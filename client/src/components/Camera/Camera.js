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
        mapRef.current.style.transform = `translate3d(${xAxisMap * -16}px, ${
            yAxisMap * -16
        }px, 0)`;
        // playerRef.current.style.transform = `translate3d(${
        //     xAxisPlayer * -16
        // }px, ${yAxisPlayer * -16}px, 0)`;
    };

    return (
        <div className="camera">
            <div ref={mapRef} className="camera-map">
                <Map />
            </div>
            <div ref={playerRef} className="camera-player">
                <Player />
            </div>
        </div>
    );
};

export default Camera;
