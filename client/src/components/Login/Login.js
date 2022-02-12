import React, { useState } from "react";
import "./login.css";

const Login = (props) => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const clearInputs = () => {
        setEmailValue("");
        setPasswordValue("");
    };

    return (
        <div className="login-container">
            <span className="title-text">Login</span>
            <form className="login-form">
                <label>Email:</label>
                <input
                    type={"email"}
                    value={emailValue}
                    onChange={(e) => {
                        setEmailValue(e.target.value);
                    }}
                ></input>
                <label>Password:</label>
                <input
                    type={"password"}
                    value={passwordValue}
                    onChange={(e) => {
                        setPasswordValue(e.target.value);
                    }}
                ></input>
                <input
                    className="submit-btn"
                    type={"submit"}
                    value="Login"
                ></input>
            </form>
            <span>
                If you don't have an account,{" "}
                <span
                    role={"button"}
                    onClick={() => {
                        props.handleSwitch();
                        clearInputs();
                    }}
                    className="link"
                >
                    register
                </span>{" "}
                here!
            </span>
        </div>
    );
};

export default Login;
