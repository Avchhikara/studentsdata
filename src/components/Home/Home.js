import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./Home.css";
import Notices from "./../Notices/Notices";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    };
  }

  componentWillMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  }

  render() {
    if (this.props.userData) {
      const { email } = this.props.userData;

      return (
        <div className="home-container">
          <h2>
            Welcome <span className="green-text">{email ? email : ""}</span>,{" "}
          </h2>
          <p className="green-text">
            Following are your options{" "}
            <FontAwesomeIcon icon={faHandPointDown} />{" "}
          </p>

          <Row>
            <Col sm={12} lg={8} md={12}>
              <Row>
                <Col sm={12} lg={6} md={6}>
                  <Link
                    to="/general"
                    className="home-button__link btn btn-success btn-block home-button"
                  >
                    Enter General Data
                  </Link>
                </Col>
                <Col sm={12} md={6} lg={6}>
                  <Link
                    className="home-button__link btn btn-success btn-block home-button"
                    to="/extra"
                  >
                    Enter extra curricular activites
                  </Link>
                </Col>

                <Col sm={12} md={6} lg={6}>
                  <Link
                    to="/result"
                    className="home-button__link btn btn-success btn-block home-button"
                  >
                    Enter Result
                  </Link>
                </Col>

                <Col sm={12} md={6} lg={6}>
                  <Link
                    to="/tandp"
                    className="home-button__link btn btn-success btn-block home-button"
                  >
                    Enter Training and Placement related data
                  </Link>
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={12} lg={4}>
              <Notices purpose={"Home"} />
            </Col>
          </Row>
        </div>
      );
    } else {
      return <div>Please login first</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(Home);
