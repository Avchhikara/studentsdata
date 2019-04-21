import React from "react";
import "./TeacherVerify.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchURL } from "./../../../Actions/constants";
import axios from "axios";
import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Card,
  Spinner,
  Button
} from "reactstrap";

class TeacherVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collegues: {
        sent: [],
        left: []
      },
      ts_id: "",
      fetchingCollegues: true
    };
  }

  componentDidMount() {
    //Now, add here to check whether the user is logged in or not
    if (!(this.props.user.loggedIn && this.props.user.teacher)) {
      this.props.history.push("/teacher/login");
    }
    //Then check whether the user is visiting the classes he/she had added
    this.fetchCollegues();
  }

  fetchCollegues = () => {
    //Getting the ts_id of class
    let ts_id = "";
    for (let i of this.props.teacher.classes) {
      // console.log(i, i.student_admission_year, this.props.match.params.year);
      if (
        i.student_admission_year.toString() === this.props.match.params.year
      ) {
        ts_id = i.ts_id;
        break;
      }
    }
    // console.log(ts_id);
    this.setState({ ts_id });

    const { t_id, token } = this.props.user.userData;
    const send = {
      t_id,
      token,
      ts_id
    };

    axios.post(`${fetchURL}/teacher/collegues`, send).then(({ data }) => {
      this.setState({ collegues: data, fetchingCollegues: false });
      console.log(this.state.collegues);
    });
  };

  onInvite = e => {
    const target = e.target;
    // console.log(target);
    const id = target.parentElement.parentElement.id;
    // console.log(this.state.collegues);
    //Now, setting target to disabled
    target.disabled = true;
    target.textContent = "Asking...";

    //Now, sending request to adding
    const send = {
      verify: this.state.collegues.left[id],
      t_id: this.props.user.userData.t_id,
      token: this.props.user.userData.token,
      ts_id: this.state.ts_id,
      name: this.props.user.userData.name,
      year: this.props.match.params.year,
      department: this.props.user.userData.department
    };

    axios.post(`${fetchURL}/teacher/verify`, send).then(({ data }) => {
      // console.log(data);

      target.disabled = false;
      target.textContent = "Ask";
      //Now, diffusing the ask and asked list
      // target.style.display = "none";
      setTimeout(() => {
        this.setAskAndAsked(id);
      }, 500);
    });
  };

  setAskAndAsked = id => {
    let left = this.state.collegues.left;
    let sent = this.state.collegues.sent;
    const send = left[id];
    left = left.filter(val => {
      return val !== send;
    });

    sent.push(send);
    console.log(left, sent);
    this.setState({
      collegues: {
        left: left,
        sent: sent
      }
    });
  };

  onInviteAgain = e => {
    console.log("On invite again");
  };

  render() {
    return (
      <div className="teacher-verify">
        <Row>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/teacher">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                Verification for class of{" "}
                {this.props.match.params.year
                  ? this.props.match.params.year
                  : ""}
              </BreadcrumbItem>
            </Breadcrumb>
            <div
              className="clearfix "
              style={{ verticalAlign: "middle !important" }}
            >
              <span className="float-left h4">
                Verify
                <span className="green-text"> your class</span>
              </span>
              <span className="float-right">
                <Link to="/teacher">Back to Home</Link>
              </span>
            </div>
            <hr />
          </Col>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            {this.state.fetchingCollegues ? "" : "Ask your collegues"}
            <Card body className="mt-4">
              {this.state.fetchingCollegues ? (
                <div className="teacher-verify__spinner">
                  <Spinner color="success" size="lg" />
                  <div>Fetching your collegues</div>
                </div>
              ) : (
                ""
              )}

              {!this.state.fetchingCollegues && this.state.collegues.left[0]
                ? //when collegues is found
                  this.state.collegues.left.map((val, index) => {
                    return (
                      <Card
                        body
                        key={index}
                        className="teacher-verify__card"
                        id={index}
                      >
                        <div className="clearfix">
                          <span className="float-left">
                            <span className="green-text">{val.name}</span> of{" "}
                            <span className="green-text">{val.department}</span>{" "}
                            department
                          </span>

                          <Button
                            color="success"
                            size="sm"
                            outline
                            onClick={this.onInvite}
                            className="float-right"
                          >
                            Ask
                          </Button>
                        </div>
                      </Card>
                    );
                  })
                : ""}
              {!this.state.fetchingCollegues &&
              !this.state.collegues.left[0] ? (
                <div className="teacher-verify__no-collegue">
                  No one of your university is there to ask{" "}
                  <FontAwesomeIcon icon={faFrown} className="green-text" />
                </div>
              ) : (
                ""
              )}
            </Card>

            {!this.state.fetchingCollegues && this.state.collegues.sent[0] ? (
              <div className="teacher-verify__asked">
                <div className="teacher-verify__asked-head">
                  Invitations your have sent
                </div>
                <Card body>
                  {this.state.collegues.sent.map((val, index) => {
                    return (
                      <Card
                        body
                        key={index}
                        id={index}
                        className="teacher-verify__asked-card"
                      >
                        <div className="clearfix">
                          <span className="float-left">
                            <span className="green-text">{val.name}</span> of{" "}
                            <span className="green-text">{val.department}</span>{" "}
                            department
                          </span>
                          {
                            // Will be uncommented after the error is resolved
                            // <Button
                            //   color="danger"
                            //   size="sm"
                            //   outline
                            //   onClick={this.onInvite}
                            //   className="float-right"
                            // >
                            //   Ask Again
                            // </Button>
                          }
                        </div>
                      </Card>
                    );
                  })}
                </Card>
              </div>
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(TeacherVerify);
