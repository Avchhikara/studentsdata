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
import { fetchURL } from "../../Actions/constants";
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

    if (document.cookie) {
      try {
        const cook = document.cookie.split(";");
        const cookFilter = cook.filter((ele, index) => {
          if (ele.match("studentdata")) {
            return true;
          }
          return false;
        })[0];

        const { studentdata } = JSON.parse(cookFilter.split("=")[1]);
        const { teacher } = studentdata;
        if (studentdata) {
          this.props.dispatch(onLoggingIn({ ...studentdata }));
          //Setting up the cookies
          document.cookie =
            "studentdata = " + JSON.stringify({ studentdata }) + ";";

          if (teacher === "1") {
            //Dispatching values for teacher
            this.props.history.push("/teacher");
          } else {
            this.props.history.push("/");
          }
        }
      } catch (error) {
        // const { studentdata } = JSON.parse(document.cookie);
        const { studentdata } = document.cookie;
        if (studentdata) {
          this.props.dispatch(onLoggingIn({ ...studentdata }));
          //Setting up the cookies
          document.cookie =
            "studentdata = " + JSON.stringify({ studentdata }) + ";";
          this.props.history.push("/");
        }
      }
    }
  }

  onLoggingIn = e => {
    //Now, getting info from db
    const { email, pass } = this.state;

    if (email !== "" && pass !== "") {
      axios
        .post(`${fetchURL}/login`, {
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
              id: data.id,
              teacher: data.teacher
            };
            document.cookie =
              "studentdata = " + JSON.stringify({ studentdata }) + ";";

            if (data.teacher === "1") {
              this.props.history.push("/teacher");
            } else {
              this.props.history.push("/");
            }
          } else {
            this.setState(() => ({ res: res.data.message }));
            const button = document.querySelector("#login-button");
            button.disabled = false;
            button.innerHTML = '<i class="fa fa-lock"></i>  Login';
            this.scrollToTop();
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
    } else {
      this.setState({ res: "Please fill all the fields!" });
      const button = document.querySelector("#login-button");
      button.disabled = false;
      button.innerHTML = '<i class="fa fa-lock"></i>  Login';
      this.scrollToTop();
      this.hideAlert();
    }

    e.preventDefault();
  };

  scrollToTop = () => {
    const cardTitle = document.querySelector(".card-title");
    cardTitle.scrollIntoView({ behavior: "smooth" });
  };

  hideAlert() {
    setTimeout(() => {
      this.setState({ res: "" });
    }, 3000);
  }

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
                  <Label sm={5} md={4} lg={3} xs={4} for="email">
                    Email
                  </Label>
                  <Col sm={7} md={8} lg={9} xs={8}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={e => {
                        this.setState({ email: e.target.value.toLowerCase() });
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={5} md={4} lg={3} xs={4} for="password">
                    Password
                  </Label>
                  <Col sm={7} md={8} lg={9} xs={8}>
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
              <p className="clearfix" style={{ marginTop: "35px" }}>
                <span className="float-left">
                  Teacher{" "}
                  <Link to="/teacher/login">
                    {" "}
                    <FontAwesomeIcon icon={faLock} /> Login
                  </Link>{" "}
                  /{" "}
                  <Link to="/teacher/signup">
                    {" "}
                    <FontAwesomeIcon icon={faUserPlus} /> Signup
                  </Link>
                </span>
                <span className="float-right">
                  New User ?,{" "}
                  <Link to="/signup">
                    Sign up <FontAwesomeIcon icon={faUserPlus} />
                  </Link>
                </span>
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
