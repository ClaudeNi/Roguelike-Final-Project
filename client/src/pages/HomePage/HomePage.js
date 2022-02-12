import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn/Btn";
import "./homePage.css";

const HomePage = () => {
    const [loadBtnText, setLoadBtnText] = useState("Load Game");
    const loadRef = useRef();

    useEffect(() => {
        if (!checkIfLoggedIn()) {
            loadRef.current.style.pointerEvents = "none";
            setLoadBtnText("Login to load game");
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

    return (
        <div className="homepage">
            <div className="top-container">
                <span className="title-text">How to Play</span>
                <ul>
                    <li>Arrow Keys - Move around the map.</li>
                    <li>Enter - Interact with the stairs.</li>
                </ul>
                <span className="title-text">Goal</span>
                <span>
                    Survive as many floors as you can (currently no way to die)
                    and reach as far as you can!
                </span>
            </div>
            <div className="buttons-container">
                <Link to="/game" style={{ textDecoration: "none" }}>
                    <Btn text={"New Game"} />
                </Link>
                <Link
                    ref={loadRef}
                    to="/game"
                    style={{ textDecoration: "none" }}
                >
                    <Btn text={loadBtnText} />
                </Link>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Btn text={"Exit Game"} />
                </Link>
            </div>
            <div></div>
        </div>
    );
};

export default HomePage;
