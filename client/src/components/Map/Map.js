import React, { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import ROT from "../../utils/rotjs";
import "./map.css";

const Map = () => {
    const [map, setMap] = useState({});
    // const [level, setLevel] = useState(1);
    const [maxX, setMaxX] = useState(0);
    const [maxY, setMaxY] = useState(0);

    useEffect(() => {
        setMap(ROT.module._generateMap());
    }, []);

    useEffect(() => {
        findMax();
    }, [map]);

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
                    setMap(ROT.module._generateMap());
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
