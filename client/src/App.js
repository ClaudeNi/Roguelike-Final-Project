import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import Map from "./components/Map/Map";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import "./App.css";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={LoginPage} />
                    <Route path="/title" exact component={HomePage} />
                    <Route path="/game" exact component={Map} />
                    <Route component={ErrorPage} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
