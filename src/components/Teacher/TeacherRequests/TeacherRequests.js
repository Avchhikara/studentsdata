import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchURL } from "./../../../Actions/constants";
import setRequests from "./../../../Actions/Teacher/setRequests";

import "./TeacherRequests.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faFrown
} from "@fortawesome/free-solid-svg-icons";
import {
  Spinner,
  Card,
  CardTitle,
  CardFooter,
  Button,
  CardBody,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Row
} from "reactstrap";

class TeacherRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: this.props.teacher.requests,
      ajaxComp: false,
      res: { status: "", message: "" }
    };
  }

  componentWillMount() {
    if (!this.props.user.loggedIn && !this.props.user.teacher) {
      //Checking whether the user is logged in or not
      this.props.history.push("/teacher/login");
    } else {
      //Getting the requests for the user
      this.getRequest();
    }
  }

  onApprove = (e, ts_id, tc_id) => {
    const target = e.target;
    target.disabled = true;
    target.textContent = "Approving..";
    const send = {
      token: this.props.user.userData.token,
      t_id: this.props.user.userData.t_id,
      ts_id,
      tc_id
    };

    //Now, making the request
    axios.post(`${fetchURL}/teacher/request`, send).then(({ data }) => {
      this.setState({ res: data.res });
      this.getRequest();
    });
  };

  onDelete = (e, ts_id, tc_id) => {
    const target = e.target;
    target.disabled = true;
    target.textContent = "deleting...";
    const send = {
      token: this.props.user.userData.token,
      t_id: this.props.user.userData.t_id,
      ts_id,
      tc_id
    };

    //Now, making the request

    axios
      .delete(`${fetchURL}/teacher/request`, { data: send })
      .then(({ data }) => {
        this.setState({ res: data.res });

        this.getRequest();
      });
  };

  getRequest = () => {
    this.setState({ ajaxComp: false });
    const send = {
      t_id: this.props.user.userData.t_id,
      token: this.props.user.userData.token
    };
    axios.post(`${fetchURL}/teacher/requests`, send).then(({ data }) => {
      this.setState({ requests: data.data, ajaxComp: true });
      this.props.dispatch(setRequests(data.data));
    });
  };

  render() {
    return (
      <div className="teacher-requests__container">
        <Row>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/teacher">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Requests</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <h5>Here are some Requests for you</h5>
            {this.state.ajaxComp ? (
              ""
            ) : (
              <div className="loading">
                <Spinner color="success" size="lg" />
                <div>Getting the requests sent to you</div>
              </div>
            )}

            {this.state.ajaxComp
              ? this.state.requests.map((req, i) => {
                  return (
                    <Card key={i}>
                      <CardBody>
                        <CardTitle>
                          <span className="name">{req.by.name}</span> of{" "}
                          <span className="dept"> {req.by.department}</span>{" "}
                          department has requested you to APPROVE that he/she
                          is/was the Class Coordinator of class of admission
                          year <span className="year">{req.for.year}</span> of
                          his/her department.
                        </CardTitle>
                      </CardBody>
                      <CardFooter>
                        <Row>
                          <Col xs={6}>
                            <Button
                              color="success"
                              block
                              size="sm"
                              onClick={e =>
                                this.onApprove(e, req.ts_id, req.tc_id)
                              }
                            >
                              <FontAwesomeIcon icon={faThumbsUp} /> Approve
                            </Button>
                          </Col>
                          <Col xs={6}>
                            <Button
                              color="danger"
                              block
                              size="sm"
                              onClick={e =>
                                this.onDelete(e, req.ts_id, req.tc_id)
                              }
                            >
                              <FontAwesomeIcon icon={faThumbsDown} /> Reject
                            </Button>
                          </Col>
                        </Row>
                      </CardFooter>
                    </Card>
                  );
                })
              : ""}

            {this.state.ajaxComp && this.state.requests.length === 0 ? (
              <Card body>
                <CardTitle>
                  Sorry, you have no requests at this moment{" "}
                  <FontAwesomeIcon icon={faFrown} className="green-text" />
                </CardTitle>
              </Card>
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

export default connect(mapStateToProps)(TeacherRequests);
