import React from "react";
import "./TeacherConfirm.css";
import axios from "axios";
import { fetchURL } from "./../../../Actions/constants";
import { Link } from "react-router-dom";

import { Alert, Row, Col, Spinner } from "reactstrap";

class TeacherConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: { status: 200, message: "Please wait while we confirm your email" },
      showSpinner: true
    };
  }

  componentDidMount() {
    //Now, making here a post request
    const email = this.props.match.params.email;
    if (email) {
      //Making request
      const send = { email };
      axios.post(`${fetchURL}/teacher/confirm`, send).then(({ data }) => {
        this.setState({ res: data.res, showSpinner: false });
        console.log(data);
      });
    } else {
      //Just setting up the response
      this.setState({
        res: {
          status: 404,
          message: "Please proceed to the login page"
        },
        showSpinner: false
      });
    }
  }
  render() {
    return (
      <div className="teacher-confirm-container">
        <Row>
          <Col xs={12}>
            <Alert color={this.state.res.status === 200 ? "success" : "danger"}>
              {this.state.res.message}
            </Alert>
          </Col>
          {this.state.showSpinner ? (
            <Col xs={12} className="teacher-confirm__spinner-col">
              <Spinner color="success" />
            </Col>
          ) : (
            <Col xs={12} className="teacher-confirm__login-col">
              Please <Link to="/teacher/login">Login</Link> Now.
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default TeacherConfirm;
