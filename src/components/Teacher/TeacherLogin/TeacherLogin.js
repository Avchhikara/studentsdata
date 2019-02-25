import React from "react";
import "./TeacherLogin.css";

import { Link } from "react-router-dom";

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
                      <Input type="email" id="email" name="email" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password" xs={3}>
                      Password
                    </Label>
                    <Col xs={9}>
                      <Input type="password" id="password" name="password" />
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>

              <Row>
                <Col style={{ margin: "0 auto" }} xs={5}>
                  <Button color="success" block onClick={this.scrollToTop}>
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

export default TeacherLogin;
