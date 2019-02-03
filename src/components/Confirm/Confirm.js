import React from "react";

import { connect } from "react-redux";
import axios from "axios";
import { Alert, Spinner, Row, Col } from "reactstrap";

import "./Confirm.css";

import onLoggingIn from "../../Actions/Login";

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "Confirming your mail-id, please wait!"
    };
  }

  componentDidMount = () => {
    //Now, setting logging in
    if (this.props.match.params.email) {
      //Now, making request to the backend
      const fetchURL = "https://studentsdata-api-server.herokuapp.com/confirm";
      axios
        .post(fetchURL, {
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
              <Spinner
                color="success"
                style={{ height: "3rem", width: "3rem", marginTop: "20vh" }}
              />
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
