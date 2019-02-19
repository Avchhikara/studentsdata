import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Forget.css";
import axios from "axios";
import { fetchURL } from "./../../Actions/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  Col,
  Row,
  CardBody,
  CardHeader,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert
} from "reactstrap";

class Forget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      res: { status: "", message: "" }
    };
  }

  scrollToTop = () => {
    const breadcrumb = document.querySelector(".breadcrumb");
    breadcrumb.scrollIntoView({ behavior: "smooth" });
  };

  onEmailSubmit = e => {
    const btn = e.target;
    btn.disabled = true;
    btn.textContent = "Sending...";

    const send = {
      email: this.state.email
    };

    //Now, making post request to the backend
    // axios.post(`${fetchURL}/forget`, send).then(({data}) => {
    //     console.log(data);
    // })

    //Now, scrolling to top
    this.scrollToTop();
    //Resetting the email
    this.setState({ email: "" });
    //enabling the button
    btn.disabled = false;
    btn.textContent = "Send me reset Link";
  };

  onSavePassword = e => {
    console.log("Password is saved");
  };

  render() {
    const { email, token } = this.props.match.params;
    if (email && token) {
      //Now, what to be returned when the email link is clicked
      return (
        <div className="forget-container">
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/login">Login</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Forget Password</BreadcrumbItem>
              </Breadcrumb>
            </Col>

            <Col xs={12}>
              {this.state.res.message !== "" ? (
                <Alert
                  color={this.state.res.status === 200 ? "success" : "danger"}
                >
                  {this.state.res.message}
                </Alert>
              ) : (
                ""
              )}
            </Col>

            <Col xs={12}>
              <Card>
                <CardHeader className="h4 green-text text-center">
                  New Password
                </CardHeader>
                <CardBody>
                  Provide us your new password
                  <Form className="mt-4">
                    <FormGroup row>
                      <Label for="password" xs={3}>
                        Password
                      </Label>
                      <Col xs={9}>
                        <Input
                          name="password"
                          type="text"
                          id="password"
                          value={this.state.password}
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col xs={6} style={{ margin: "0 auto" }}>
                        <Button
                          color="success"
                          className="mt-3"
                          outline
                          size="sm"
                          block
                          onClick={this.onSavePassword}
                        >
                          Save
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    } else {
      //Now, in case when the user is just visiting the forget password page
      return (
        <div className="forget-container">
          <Row>
            <Col xs={12}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/login">Login</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Forget Password</BreadcrumbItem>
              </Breadcrumb>
            </Col>

            <Col xs={12}>
              {this.state.res.message !== "" ? (
                <Alert
                  color={this.state.res.status === 200 ? "success" : "danger"}
                >
                  {this.state.res.message}
                </Alert>
              ) : (
                ""
              )}
            </Col>

            <Col xs={12}>
              <Card>
                <CardHeader className="green-text text-center h4">
                  Forget Password
                </CardHeader>
                <CardBody>
                  Enter your registered email below{" "}
                  <span className="green-text">
                    <FontAwesomeIcon icon={faHandPointDown} />
                  </span>
                  <Form className="mt-4">
                    <FormGroup row>
                      <Label for="email" xs={3}>
                        Email
                      </Label>
                      <Col xs={9}>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          value={this.state.email}
                          onChange={e => {
                            //Setting up the state as the input values have been fetched
                            const val = e.target.value;
                            this.setState({ email: val });
                          }}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row className="text-center">
                      <Col xs={6} style={{ margin: "0 auto" }}>
                        <Button
                          color="success"
                          outline
                          size="sm"
                          block
                          onClick={this.onEmailSubmit}
                          className="mt-3"
                        >
                          Send me reset Link
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Forget;
