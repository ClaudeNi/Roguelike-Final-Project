import React, { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import ROT from "../../utils/rotjs";
import "./map.css";

const Map = () => {
    const [map, setMap] = useState({});
    const [freeCells, setFreeCells] = useState([]);
    // const [level, setLevel] = useState(1);
    const [maxX, setMaxX] = useState(0);
    const [maxY, setMaxY] = useState(0);

    useEffect(() => {
        setMap(ROT.module._generateMap());
    }, []);

    useEffect(() => {
        findMax();
    }, [map]);

    useEffect(() => {
        placePlayer();
    }, [freeCells]);

    const placePlayer = () => {
        const ind = Math.floor(Math.random() * (freeCells.length - 1));
        const coords = freeCells[ind];
        console.log(coords);
        const newMap = map;
        newMap[coords] = "P";
        setMap(newMap);
    };

    const findMax = () => {
        let tempMaxX = 0;
        let tempMaxY = 0;
        for (let coords of Object.keys(map)) {
            let coord = coords.split(",");
            let coordX = parseInt(coord[0]);
            let coordY = parseInt(coord[1]);
            if (coordX > tempMaxX) {
                tempMaxX = coordX;
            }
            if (coordY > tempMaxY) {
                tempMaxY = coordY;
            }
        }
        setMaxX(tempMaxX);
        setMaxY(tempMaxY);
    };

    const displayMap = () => {
        let arr = [];
        for (let y = 0; y <= maxY; y++) {
            for (let x = 0; x <= maxX; x++) {
                arr.push(<Cell key={`${x},${y}`} x={x} y={y} map={map} />);
            }
        }
        return arr.map((cell) => {
            return cell;
        });
    };

    return (
        <div className="map">
            map
            <div
                className="map-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${maxX + 1}, 16px)`,
                    gridTemplateRows: `repeat(${maxY + 1}, 16px)`,
                    // width: `${16 * maxX}px`,
                    // height: `${16 * maxY}px`,
                }}
            >
                {displayMap()}
            </div>
            <button
                onClick={() => {
                    setMap({});
                    setFreeCells([]);
                    setTimeout(() => {
                        const mapInfo = ROT.module._generateMap();
                        setMap(mapInfo.map);
                        setFreeCells(mapInfo.freeCells);
                    }, 0);
                }}
            >
                get map
            </button>
            <button
                onClick={() => {
                    console.log(map);
                    console.log(maxX, maxY);
                }}
            >
                click
            </button>
        </div>
    );
};

export default Map;
