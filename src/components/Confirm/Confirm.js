import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Alert, Spinner, Row, Col } from "reactstrap";

import "./Confirm.css";
import { fetchURL } from "./../../Actions/constants.js";

import onLoggingIn from "../../Actions/Login";

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "Confirming your mail-id, please wait!",
      showSpinner: true
    };
  }

  componentDidMount = () => {
    //Now, setting logging in
    if (this.props.match.params.email) {
      //Now, making request to the backend

      axios
        .post(`${fetchURL}/confirm`, {
          email: this.props.match.params.email
        })
        .then(({ data }) => {
          console.log(data);
          if (data.status === 200) {
            this.props.dispatch(onLoggingIn({ ...data }));
            //Setting up the cookies
            const studentdata = {
              email: data.email,
              s_id: data.s_id,
              id: data.id
            };
            document.cookie = JSON.stringify({ studentdata });
            this.props.history.push("/");
          } else if (data.status === 400) {
            this.setState({
              res: "Your email is already confirmed!",
              showSpinner: false
            });
          }
        })
        .catch(err => console.log(err));
    } else {
      this.props.history.push("/");
    }
  };

  render() {
    // if (!this.props.loggedIn) {
    //   return (
    //     <div className="confirm-container">
    //       <div>
    //         Please <a href="/">Login </a> First
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className="confirm-container">
        <div>
          <Alert color="success">{this.state.res}</Alert>
          <Row>
            <Col xs={12} className="text-center">
              {this.state.showSpinner ? (
                <Spinner
                  color="success"
                  style={{ height: "3rem", width: "3rem", marginTop: "20vh" }}
                />
              ) : (
                <div>
                  Please <Link to="/login">Login </Link> First
                </div>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(Confirm);
