import React from "react";
import { connect } from "react-redux";
import "./Teacher.css";

import { Breadcrumb, BreadcrumbItem, Col, Row } from "reactstrap";

class Teacher extends React.Component {
  componentWillMount() {
    if (!(this.props.user.loggedIn && this.props.user.teacher)) {
      this.props.history.push("/");
    }
    console.log(this.props);
  }

  render() {
    return (
      <div className="teacher-container">
        <Breadcrumb>
          <BreadcrumbItem active>Home</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col xs={12} className="h5">
            Hello <span className="green-text">{"{TeacherName}"},</span>{" "}
          </Col>
          <Col xs={12} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(Teacher);
