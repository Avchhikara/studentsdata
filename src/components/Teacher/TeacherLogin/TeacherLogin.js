import React from "react";
import "./TeacherLogin.css";

import { connect } from "react-redux";

import axios from "axios";
import teacherLogin from "./../../../Actions/Teacher/Login";
import { Link } from "react-router-dom";
import { fetchURL } from "./../../../Actions/constants";
import {
  Card,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Col,
  Row,
  Input,
  Label,
  Button,
  Alert
} from "reactstrap";

class TeacherLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: { status: "", message: "This feature is not currently working" },
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    //Scrolling to top when component is mounted
    this.scrollToTop();
  }

  scrollToTop = () => {
    const cardTitle = document.querySelector(".card-title");
    cardTitle.scrollIntoView({ behavior: "smooth" });
  };

  onLogginIn = e => {
    const target = e.target;
    target.disabled = true;
    target.textContent = "Please wait...";

    const { email, password } = this.state;

    //Now, checking that all values have been provided
    if (email !== "" && password !== "") {
      //Now, making request to the backend
      const send = {
        email,
        password
      };

      axios.post(`${fetchURL}/teacher/login`, send).then(({ data }) => {
        //Now, setting up the state
        this.setState({ res: data.res });

        //Scrolling up
        this.scrollToTop();

        //Now, changing the route or main state

        this.props.dispatch(teacherLogin({ userData: data.userData }));

        //Now, moving to teacher's dashboard
        this.props.history.push("/teacher");

        //Enabling the button
        target.disabled = false;
        target.textContent = "Login";
      });
    } else {
      this.setState({
        res: {
          status: 404,
          message: "Please provide all the values"
        }
      });

      //Enabling all fields
      target.disabled = false;
      target.textContent = "Login";

      //Now,scrolling to top
      this.scrollToTop();
    }
  };

  render() {
    return (
      <div className="teacher-login-container">
        <Row>
          <Col xs={12} md={9} sm={10} lg={7} style={{ margin: "0 auto" }}>
            <Card style={{ padding: "5px" }}>
              <CardTitle className="text-center" id="card-title">
                <span className="h3">
                  Teacher <span className="green-text">Login</span>
                </span>
              </CardTitle>
              <CardBody>
                {this.state.res.message !== "" ? (
                  <Alert
                    color={this.state.res.status === 200 ? "success" : "danger"}
                  >
                    {this.state.res.message}
                  </Alert>
                ) : (
                  ""
                )}

                <Form>
                  <FormGroup row>
                    <Label for="email" xs={3}>
                      Email
                    </Label>
                    <Col xs={9}>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={e => {
                          const val = e.target.value.toLowerCase();
                          this.setState({ email: val });
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password" xs={4} sm={3}>
                      Password
                    </Label>
                    <Col xs={8} sm={9}>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState({ password: val });
                        }}
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>

              <Row>
                <Col style={{ margin: "0 auto" }} xs={5}>
                  <Button color="success" block onClick={this.onLogginIn}>
                    Login
                  </Button>
                </Col>
              </Row>

              <Col xs={12} className="clearfix mt-4 mb-4">
                <span className="float-left">
                  Student : <Link to="/login">Login </Link>/
                  <Link to="/signup"> Signup</Link>{" "}
                </span>
                <span className="float-right">
                  {" "}
                  Teacher <Link to="/teacher/signup">Signup</Link> instead?
                </span>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(TeacherLogin);
