import React from "react";
import "./TeacherSignup.css";

import { Link } from "react-router-dom";

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
      res: { status: "", message: "This feature is not currently working" }
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
                      <Input type="text" id="name" name="name" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="email" xs={3}>
                      Email
                    </Label>
                    <Col xs={9}>
                      <Input type="email" id="email" name="email" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password" xs={4} sm={3}>
                      Password
                    </Label>
                    <Col xs={8} sm={9}>
                      <Input type="password" id="password" name="password" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="university" xs={4} sm={3}>
                      University
                    </Label>
                    <Col xs={8} sm={9}>
                      <Input type="select" id="university" name="university">
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
                      <Input type="select" name="department" id="department">
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
                  <Button color="success" block>
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
