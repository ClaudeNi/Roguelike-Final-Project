import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../api/api";
import "./login.css";

const Login = (props) => {
    let history = useHistory();

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const clearInputs = () => {
        setEmailValue("");
        setPasswordValue("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    const loginUser = async () => {
        const response = await api.post(`users/${emailValue}`, {
            password: passwordValue,
        });
        console.log(response);
        if (response.data === true) {
            window.sessionStorage.setItem("isLoggedIn", true);
            window.sessionStorage.setItem("email", emailValue);
            history.push("/title");
        }
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
                    onClick={handleSubmit}
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
