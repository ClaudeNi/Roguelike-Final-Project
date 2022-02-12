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
    const [player, setPlayer] = useState(null);
    const [maxX, setMaxX] = useState(0);
    const [maxY, setMaxY] = useState(0);

    const gridRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        if (window.sessionStorage.getItem("load") === "true") {
            loadSaveData();
            ROT.module.init(canvasRef.current);
            // ROT.module.setMap(map, player);
        } else {
            ROT.module.init(canvasRef.current, {}, null);
            ROT.module._generateMap();
            setMap(ROT.module.map);
        }
    }, []);

    useEffect(() => {
        ROT.module.setMap(map, player);
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

    const loadSaveData = async () => {
        const email = window.sessionStorage.getItem("email");
        const response = await api.get(`/users/load/${email}`);
        setMap(response.data.map);
        setPlayer(response.data.player);
    };

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
            const email = window.sessionStorage.getItem("email");
            const response = await api.patch(`/users/save/${email}`, {
                map: ROT.module.map,
                player: ROT.module.player,
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
