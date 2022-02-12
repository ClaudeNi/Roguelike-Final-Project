import React, { useEffect, useRef, useState } from "react";
import Cell from "../Cell/Cell";
import ROT from "../../utils/rotjs";
import "./map.css";

const Map = (props) => {
    const [showTiles, setShowTiles] = useState(false);
    const [map, setMap] = useState({});
    const [freeCells, setFreeCells] = useState([]);
    // const [level, setLevel] = useState(1);
    const [maxX, setMaxX] = useState(0);
    const [maxY, setMaxY] = useState(0);

    const gridRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        ROT.module.init(canvasRef.current);
        setMap(ROT.module.map);
    }, []);

    useEffect(() => {
        findMax();
    }, [map]);

    useEffect(() => {
        if (showTiles) {
            gridRef.current.style.display = "grid";
            canvasRef.current.style.display = "none";
        } else {
            gridRef.current.style.display = "none";
            canvasRef.current.style.display = "block";
        }
    }, [showTiles]);

    useEffect(() => {
        window.addEventListener("keypress", (e) => {
            let key = e.key;
            // ROT.module.movePlayer(e);
            setMap(ROT.module.map);
        });
    });

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
            <button
                onClick={() => {
                    setShowTiles(!showTiles);
                }}
            >
                Change Appearance
            </button>
            <div
                ref={gridRef}
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
            <div ref={canvasRef}></div>
        </div>
    );
};

export default Map;
