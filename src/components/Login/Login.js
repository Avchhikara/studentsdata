import React from "react";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardText,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  FormText,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import onLoggingIn from "./../../Actions/Login";
import axios from "axios";

import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "",
      email: "",
      pass: ""
    };
  }

  //Check in login whether the user is logged in or not before displaying the componenet
  componentDidMount() {
    //Checking cookies for loggin in
    console.log(document.cookie);
    if (document.cookie) {
      try {
        const { studentdata } = JSON.parse(
          document.cookie
            .split(";")
            .filter((ele, index) => {
              if (ele.match("studentsdata")) {
                return true;
              }
              return false;
            })
            .split("=")[1]
        );
        if (studentdata) {
          this.props.dispatch(onLoggingIn({ ...studentdata }));
          //Setting up the cookies
          document.cookie =
            "studentsdata = " + JSON.stringify({ studentdata }) + ";";
          this.props.history.push("/");
        }
        console.log(studentdata);
      } catch (error) {
        const { studentdata } = JSON.parse(document.cookie);
        if (studentdata) {
          this.props.dispatch(onLoggingIn({ ...studentdata }));
          //Setting up the cookies
          document.cookie = JSON.stringify({ studentdata });
          this.props.history.push("/");
        }
        console.log(studentdata);
      }
    }
  }

  onLoggingIn = e => {
    //Now, getting info from db
    const { email, pass } = this.state;
    const fetchURL = "https://studentsdata-api-server.herokuapp.com/login";
    axios
      .post(fetchURL, {
        email,
        pass
      })
      .then(res => {
        if (res.data.status) {
          const { data } = res;
          //Dispatching the action
          this.props.dispatch(onLoggingIn({ ...data }));
          //Setting up the cookies
          const studentdata = {
            email: data.email,
            s_id: data.s_id,
            id: data.id
          };
          document.cookie = JSON.stringify({ studentdata });

          this.props.history.push("/");
        } else {
          this.setState(() => ({ res: res.data.message }));
          const button = document.querySelector("#login-button");
          button.disabled = false;
          button.innerHTML = '<i class="fa fa-lock"></i>  Login';
        }
      })
      .catch(err => console.log(err));

    // const id = uuid();
    // const xhr = new XMLHttpRequest();
    // xhr.open(
    //   "GET",
    //   `http://localhost:8888/studentsdata.xyz/login.php?email=${
    //     this.state.email
    //   }&pass=${this.state.pass}&uuid=${id}`,
    //   true
    // );
    // xhr.onreadystatechange = e => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const res = JSON.parse(xhr.responseText);
    //     if (res.status) {
    //       //Dispatching the action
    //       this.props.dispatch(onLoggingIn({ ...res, id: id }));
    //       //Setting up the cookies
    //       const studentdata = {
    //         email: res.email,
    //         s_id: res.s_id,
    //         id
    //       };
    //       document.cookie = JSON.stringify({ studentdata });

    //       this.props.history.push("/");
    //     } else {
    //       this.setState(() => ({ res: res.message }));
    //       const button = document.querySelector("#login-button");
    //       button.disabled = false;
    //       button.innerHTML = '<i class="fa fa-lock"></i>  Login';
    //     }
    //   }
    // };
    // xhr.send();

    e.preventDefault();
  };

  render() {
    return (
      <div className="login-container">
        <Row>
          <Col sm="12" md={9} lg={6} xl={6} style={{ margin: "0 auto" }}>
            {this.state.res !== "" ? (
              <Alert color="danger">{this.state.res}</Alert>
            ) : (
              ""
            )}
            <Card body>
              <CardTitle className="h2">
                <span className="green-text">Login</span> Form
              </CardTitle>

              <Form>
                <FormGroup row>
                  <Label sm={5} md={4} lg={3} for="email">
                    Email
                  </Label>
                  <Col sm={7} md={8} lg={9}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value });
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={5} md={4} lg={3} for="password">
                    Password
                  </Label>
                  <Col sm={7} md={8} lg={9}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.pass}
                      onChange={e => {
                        this.setState({ pass: e.target.value });
                      }}
                    />
                    <FormText color="muted">
                      <Link to="/forget">Forget Password ?</Link>
                    </FormText>
                  </Col>
                </FormGroup>
              </Form>

              <CardText>
                <Button
                  color="success"
                  id="login-button"
                  onClick={e => {
                    this.setState({ res: "" });
                    e.target.disabled = true;
                    e.target.innerHTML =
                      '<div class="spinner-border spinner-border-sm text-light" role="status"><span class="sr-only">Loading...</span></div>';

                    this.onLoggingIn(e);
                  }}
                >
                  <FontAwesomeIcon icon={faLock} /> Login
                </Button>
              </CardText>
              <p style={{ textAlign: "right" }}>
                New User ?,{" "}
                <Link to="/signup">
                  Sign up <FontAwesomeIcon icon={faUserPlus} />
                </Link>
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const loggedIn = state.loggedIn;
  return {
    loggedIn,
    ...state
  };
};

export default connect(mapStateToProps)(Login);
