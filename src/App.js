import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Fade } from "react-reveal";

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Profile from "./components/Profile/Profile";
import Notices from "./components/Notices/Notices";
import General from "./components/General/General";
import Confirm from "./components/Confirm/Confirm";
import TandP from "./components/tandp/TandP";
import Extra from "./components/extra/Extra";
import Result from "./components/Result/Result";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div>
            <Route path="/" component={NavBar} />
            <Fade big>
              <div className="container">
                <Switch>
                  <Route path="/" component={Home} exact={true} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/profile/:id" component={Profile} />
                  <Route path="/notices" component={Notices} />
                  <Route path="/general" component={General} />
                  <Route path="/confirm/:email" component={Confirm} />
                  <Route path="/tandp" component={TandP} />
                  <Route path="/extra" component={Extra} />
                  <Route path="/result" component={Result} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </Fade>
            <Route path="/" component={Footer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
