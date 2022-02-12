import React, { useEffect, useRef, useState } from "react";
import Cell from "../Cell/Cell";
import Btn from "../Btn/Btn";
import ROT from "../../utils/rotjs";
import api from "../../api/api";
import "./map.css";
import { Link } from "react-router-dom";

const Map = (props) => {
    const [saveBtnText, setSaveBtnText] = useState("Save Game");
    const [showTiles, setShowTiles] = useState(false);
    const [map, setMap] = useState({});
    const [maxX, setMaxX] = useState(0);
    const [maxY, setMaxY] = useState(0);

    const gridRef = useRef();
    const canvasRef = useRef();
    const saveRef = useRef();

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
        if (!checkIfLoggedIn()) {
            setSaveBtnText("Login to save game");
        }
    }, []);

    const checkIfLoggedIn = () => {
        const myStorage = window.sessionStorage;
        if (
            myStorage.getItem("isLoggedIn") === null ||
            myStorage.getItem("isLoggedIn") === "false"
        ) {
            myStorage.setItem("isLoggedIn", false);
            return false;
        }
        return true;
    };

    const saveMap = async () => {
        if (checkIfLoggedIn()) {
            const id = "abc";
            const response = await api.patch(`${id}/save`, {
                map: ROT.module.map,
            });
            console.log(response);
        }
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
            <div className="top-btns-container">
                <Btn
                    text="Change Style"
                    handleClick={() => {
                        setShowTiles(!showTiles);
                    }}
                />
                <Btn text={saveBtnText} handleClick={saveMap} />
                <Link to={"/title"} style={{ textDecoration: "none" }}>
                    <Btn text="Exit Game" />
                </Link>
            </div>
            <div
                ref={gridRef}
                className="map-grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${maxX + 1}, 16px)`,
                    gridTemplateRows: `repeat(${maxY + 1}, 16px)`,
                }}
            >
                {displayMap()}
            </div>
            <div ref={canvasRef}></div>
        </div>
    );
};

export default Map;
