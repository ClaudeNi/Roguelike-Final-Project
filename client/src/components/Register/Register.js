import React, { useState } from "react";
import api from "../../api/api";
import { useHistory } from "react-router-dom";
import "./register.css";

const Register = (props) => {
    let history = useHistory();

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [repeatPasswordValue, setRepeatPasswordValue] = useState("");

    const clearInputs = () => {
        setEmailValue("");
        setPasswordValue("");
        setRepeatPasswordValue("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser();
    };

    const registerUser = async () => {
        const response = await api.post("/users", {
            email: emailValue,
            password: passwordValue,
            rePassword: repeatPasswordValue,
        });
        console.log("response", response);

        if (response.data === true) {
            window.sessionStorage.setItem("isLoggedIn", true);
            window.sessionStorage.setItem("email", emailValue);
            history.push("/title");
        }
    };

    return (
        <div className="register-container">
            <span className="title-text">Register</span>
            <form className="register-form">
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
                    type={"password"}
                    value={repeatPasswordValue}
                    onChange={(e) => {
                        setRepeatPasswordValue(e.target.value);
                    }}
                ></input>
                <input
                    className="submit-btn"
                    type={"submit"}
                    value="Register"
                    onClick={handleSubmit}
                ></input>
            </form>
            <span>
                If you already have an account,{" "}
                <span
                    role={"button"}
                    onClick={() => {
                        props.handleSwitch();
                        clearInputs();
                    }}
                    className="link"
                >
                    login
                </span>{" "}
                here!
            </span>
        </div>
    );
};

export default Register;
