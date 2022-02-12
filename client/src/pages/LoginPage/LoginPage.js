import React, { useEffect, useRef, useState } from "react";
import titleImg from "../../assets/title.png";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import "./loginPage.css";

const LoginPage = () => {
    const [loginPhase, setLoginPhase] = useState(true);

    const loginRef = useRef();
    const registerRef = useRef();

    useEffect(() => {
        if (loginPhase) {
            loginRef.current.style.display = "block";
            registerRef.current.style.display = "none";
        } else if (!loginPhase) {
            loginRef.current.style.display = "none";
            registerRef.current.style.display = "block";
        }
    }, [loginPhase]);

    const switchComp = () => {
        setLoginPhase(!loginPhase);
    };
    return (
        <div className="login-page">
            <img
                className="title-img"
                src={titleImg}
                alt="title logo, untitiled roguelike"
            />
            <div ref={loginRef}>
                <Login handleSwitch={switchComp} />
            </div>
            <div ref={registerRef}>
                <Register handleSwitch={switchComp} />
            </div>

            <span className="warning">
                * Music will start playing once you move to the next page *
            </span>
        </div>
    );
};

export default LoginPage;
