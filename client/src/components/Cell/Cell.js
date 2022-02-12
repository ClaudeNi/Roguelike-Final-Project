import React, { useEffect, useState } from "react";
import "./cell.css";

const Cell = (props) => {
    const [classBG, setclassBG] = useState("gray");

    useEffect(() => {
        findType();
    }, []);

    const findType = () => {
        let cellType = props.map[`${props.x},${props.y}`];
        switch (cellType) {
            case ".":
                setclassBG("floor");
                break;
            case "#":
                setclassBG("wall-1");
                break;
            case "P":
                setclassBG("player-1");
                break;
            case "E":
                setclassBG("enemy-1");
                break;
            case "S":
                setclassBG("staircase");
                break;
            default:
                setclassBG("empty");
                break;
        }
    };

    return <div className={`pixel ${classBG}`} x={props.x} y={props.y}></div>;
};

export default Cell;
