import React from "react";

import "./Result.css";
import { fetchURL } from "./../../Actions/constants";
import { Fade } from "react-reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faCheck,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import setResultData from "./../../Actions/result";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Alert
} from "reactstrap";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rsemester: "",
      rattempt: "",
      rsgpa: "",
      saved: true,
      res: {
        status: "",
        message: ""
      },
      showFilledValue: false,
      timeoutId: []
    };
  }

  componentWillMount() {
    if (!this.props.user.loggedIn) {
      this.props.history.push("/");
    }
  }

  componentWillUnmount() {
    if (!this.state.saved) {
      alert(
        "Values you have entered are not saved and will be lost, Please enter them again to save"
      );
    }

    //Clearing all timeoutid's
    const tid = this.state.timeoutId;
    tid.forEach(id => {
      clearTimeout(id);
    });
  }

  onClickSave = e => {
    const target = e.target;
    target.textContent = "";
    target.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
    `;
    target.disabled = true;
    const { rsemester, rattempt, rsgpa } = this.state;
    //Now, making post request to the server
    const send = {
      type: "set",
      s_id: this.props.user.userData.s_id,
      token: this.props.user.userData.id,
      rsemester,
      rattempt,
      rsgpa
    };

    axios.post(`${fetchURL}/result`, send).then(({ data }) => {
      // console.log(data);
      //enabling the button
      target.disabled = false;
      target.innerHTML = "";
      target.textContent = "Save";
      //Now, clearing the state and showing the success message to user
      this.setState({
        rattempt: "",
        rsemester: "",
        rsgpa: "",
        saved: true,
        res: data
      });
      //Now, clear res after 3 sec
      this.hideRes(3000);
    });

    this.props.dispatch(
      setResultData({
        rsemester,
        rattempt,
        rsgpa,
        r_id: this.props.student.resultData.r_id
      })
    );
  };

  fetchValues = rsemester => {
    const send = {
      s_id: this.props.user.userData.s_id,
      token: this.props.user.userData.id,
      rsemester,
      type: "get"
    };
    axios.post(`${fetchURL}/result`, send).then(({ data }) => {
      //Now, setting up the redux state
      this.props.dispatch(setResultData(data));

      //Also, setting up the state
      this.setState({ ...data, saved: true });
    });
  };

  onClickCancel = e => {
    this.setState({
      rsemester: "",
      rattempt: "",
      rsgpa: "",
      saved: true,
      res: {
        status: "404",
        message: "Current entry has been canceled!"
      }
    });
    //Scrolling the message into view
    const breadcrumb = document.querySelector(".breadcrumb");

    breadcrumb.scrollIntoView({ behavior: "smooth" });

    this.hideRes(3000);
  };

  showFilledValues = e => {
    this.setState({
      res: {
        status: 400,
        message:
          "This feature is not available right now, you will be mailed once available"
      }
    });
    this.hideRes();
  };

  hideRes = (time = 3000) => {
    const id = setTimeout(() => {
      this.setState({
        res: {
          status: "",
          message: ""
        }
      });
    }, time);
    this.setState(prevState => ({
      timeoutId: prevState.timeoutId.concat([id])
    }));
  };

  render() {
    return (
      <div className="result-container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Result</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col xs={12}>
            {this.state.res.message !== "" ? (
              <Fade>
                <Alert
                  color={this.state.res.status !== 200 ? "danger" : "success"}
                >
                  {this.state.res.message}
                </Alert>
              </Fade>
            ) : (
              ""
            )}
          </Col>
          <Col xs={12} className="clearfix">
            <h4 className="float-left">
              Enter{" "}
              <span className="green-text">
                Result <FontAwesomeIcon icon={faHandPointDown} />{" "}
              </span>{" "}
            </h4>
            <span className="float-right">
              {this.state.rattempt !== "" ? (
                <span>
                  <Button
                    size="sm"
                    outline
                    color="success"
                    onClick={this.onClickSave}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                  <Button
                    size="sm"
                    outline
                    color="danger"
                    onClick={this.onClickCancel}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </span>
              ) : (
                <Button
                  color="success"
                  size="sm"
                  outline
                  onClick={this.showFilledValues}
                >
                  {this.state.showFilledValue
                    ? "Hide Filled Values"
                    : "Show filled values"}
                </Button>
              )}
            </span>
          </Col>
          <Col xs="12">
            <hr />
          </Col>
        </Row>

        <Row>
          <Col xs={12} className="mt-3">
            <Form>
              <Fade>
                <FormGroup row>
                  <Label for="rsemester" xs={3}>
                    Semester
                  </Label>
                  <Col xs={9}>
                    <Input
                      type="select"
                      name="sem"
                      id="rsemester"
                      value={this.state.rsemester}
                      onChange={e => {
                        const val = e.target.value;
                        if (val !== "--Select--") {
                          this.setState({ rsemester: val, saved: false });
                          this.fetchValues(val);
                        } else {
                          this.setState({ saved: true, rsemester: "" });
                        }
                      }}
                    >
                      <option defaultValue>--Select--</option>
                      <option value="1">1st</option>
                      <option value="2">2nd</option>
                      <option value="3">3rd</option>
                      <option value="4">4th</option>
                      <option value="5">5th</option>
                      <option value="6">6th</option>
                      <option value="7">7th</option>
                      <option value="8">8th</option>
                    </Input>
                  </Col>
                </FormGroup>
              </Fade>
              {this.state.rsemester === "" ? (
                ""
              ) : (
                <Fade bottom>
                  <FormGroup row>
                    <Label for="rattempt" xs={3}>
                      Attempt
                    </Label>
                    <Col xs={9}>
                      <Input
                        type="select"
                        name="attempt"
                        id="rattempt"
                        value={this.state.rattempt}
                        onChange={e => {
                          const val = e.target.value;
                          if (val !== "--Select--") {
                            this.setState({ rattempt: val, saved: false });
                          } else {
                            this.setState({ saved: true, rattempt: "" });
                          }
                        }}
                      >
                        <option defaultValue>--Select--</option>
                        <option value="1">1st</option>
                        <option value="2">2nd</option>
                        <option value="3">3rd</option>
                        <option value="4">4th</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Fade>
              )}
              {this.state.rattempt === "" ? (
                ""
              ) : (
                <Fade bottom>
                  <FormGroup row>
                    <Label for="rsgpa" xs={3}>
                      SGPA
                    </Label>
                    <Col xs={9}>
                      <Input
                        type="number"
                        name="sgpa"
                        id="rsgpa"
                        value={this.state.rsgpa}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState({ rsgpa: val, saved: false });
                          if (val === "") {
                            this.setState({ saved: true });
                          }
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col xs={6}>
                      <Button
                        color="success"
                        outline
                        block
                        size="sm"
                        onClick={this.onClickSave}
                      >
                        Save
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button
                        color="danger"
                        outline
                        block
                        size="sm"
                        onClick={this.onClickCancel}
                      >
                        {" "}
                        Cancel{" "}
                      </Button>
                    </Col>
                  </Row>
                </Fade>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(Result);
