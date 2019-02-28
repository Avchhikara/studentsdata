import React from "react";
import "./TeacherSignup.css";

import { Link } from "react-router-dom";
import axios from "axios";
import { fetchURL } from "./../../../Actions/constants";

import {
  Card,
  Alert,
  CardTitle,
  CardBody,
  Form,
  FormGroup,
  Col,
  Row,
  Input,
  Label,
  Button
} from "reactstrap";

class TeacherSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: { status: "", message: "This feature is not currently working" },
      name: "",
      email: "",
      password: "",
      university: "",
      department: ""
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

  onSignup = e => {
    //Disabling the signup btn
    const target = e.target;
    target.disabled = true;
    target.textContent = "Please wait..";

    //First, checking that all values have been provided
    const { name, email, password, university, department } = this.state;
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      university !== "" &&
      department !== ""
    ) {
      //What to do when all the columns are filled

      const send = {
        name,
        email,
        password,
        university,
        department
      };

      //Now, sending request to backend
      axios
        .post(`${fetchURL}/teacher/signup`, send)
        .then(({ data }) => {
          //updating the state
          this.setState({ res: data.res });

          //Enabling the btn
          target.disabled = false;
          target.textContent = "SignUp";

          //Scrolling to top
          this.scrollToTop();
        })
        .catch(err => {
          console.log(err);
          //Enabling the btn
          target.disabled = false;
          target.textContent = "SignUp";
        });
    } else {
      //When any of the filed is vacant
      this.setState({
        res: { status: 404, message: "Please fill all the columns" }
      });
      //Enabling the btn
      target.disabled = false;
      target.textContent = "SignUp";
      //Moving to top
      this.scrollToTop();
    }
  };

  render() {
    return (
      <div className="teacher-signup-container">
        <Row>
          <Col xs={12} md={9} sm={10} lg={7} style={{ margin: "0 auto" }}>
            <Card style={{ padding: "5px" }}>
              <CardTitle className="text-center">
                <span className="h3">
                  Teacher <span className="green-text">Signup</span>
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
                    <Label for="name" xs={3}>
                      Name
                    </Label>
                    <Col xs={9}>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState({ name: val });
                        }}
                      />
                    </Col>
                  </FormGroup>
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
                  <FormGroup row>
                    <Label for="university" xs={4} sm={3}>
                      University
                    </Label>
                    <Col xs={8} sm={9}>
                      <Input
                        type="select"
                        id="university"
                        name="university"
                        value={this.state.university}
                        onChange={e => {
                          const val = e.target.value;
                          if (val !== "--Select University--") {
                            this.setState({ university: val });
                          } else {
                            this.setState({ university: "" });
                          }
                        }}
                      >
                        <option defaultValue>--Select University--</option>
                        <option value="DCRUSTM">D.C.R.U.S.T. Murthal</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="department" xs={3}>
                      Dept.
                    </Label>
                    <Col xs={9}>
                      <Input
                        type="select"
                        name="department"
                        id="department"
                        value={this.state.department}
                        onChange={e => {
                          const val = e.target.value;
                          if (val !== "--Select Department--") {
                            this.setState({ department: val });
                          } else {
                            this.setState({ department: "" });
                          }
                        }}
                      >
                        <option defaultValue>--Select Department--</option>
                        <option value="ECE">ECE</option>
                        <option value="CE">CE(Civil)</option>
                        <option value="CSE">CSE</option>
                        <option value="ME">Mechanical Engg.</option>
                        <option value="BT">Bio Tech.</option>
                        <option value="CHE">Chemical engg.</option>
                        <option value="EE">Electrical engg.</option>
                        <option value="BArch">Architecture</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
              <Row>
                <Col style={{ margin: "0 auto" }} xs={5}>
                  <Button color="success" block onClick={this.onSignup}>
                    SignUp
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
                  Teacher <Link to="/teacher/login">Login</Link> instead?
                </span>
              </Col>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TeacherSignup;
