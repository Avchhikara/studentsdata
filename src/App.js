import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Notices from "./components/Notices/Notices";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/" component={NavBar} />
            <div className="container">
              <Switch>
                <Route path="/" component={Home} exact={true} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/profile/:id" component={Profile} />
                <Route path="/notices" component={Notices} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Route path="/" component={Footer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
