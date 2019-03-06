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
import Teacher from "./components/Teacher/Teacher";
import TeacherLogin from "./components/Teacher/TeacherLogin/TeacherLogin";
import Forget from "./components/Forget/Forget";
import TeacherSignup from "./components/Teacher/TeacherSignup/TeacherSignup";
import TeacherConfirm from "./components/Teacher/TeacherConfirm/TeacherConfirm";
import TeacherClass from "./components/Teacher/TeacherClass/TeacherClass";
import TeacherAddClass from "./components/Teacher/TeacherAddClass/TeacherAddClass";

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
                  <Route path="/forget/:email/:token" component={Forget} />
                  <Route path="/forget" component={Forget} />
                  <Route path="/teacher" component={Teacher} exact={true} />
                  <Route path="/teacher/login" component={TeacherLogin} />
                  <Route path="/teacher/signup" component={TeacherSignup} />
                  <Route
                    path="/teacher/confirm/:email"
                    component={TeacherConfirm}
                  />
                  <Route path="/teacher/class/:year" component={TeacherClass} />
                  <Route path="/teacher/add" component={TeacherAddClass} />
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
