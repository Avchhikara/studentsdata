import React from "react";
import { connect } from "react-redux";
import "./Teacher.css";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class Teacher extends React.Component {
  componentWillMount() {
    if (!(this.props.user.loggedIn && this.props.user.teacher)) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div className="teacher-container">
        <Breadcrumb>
          <BreadcrumbItem active>Home</BreadcrumbItem>
        </Breadcrumb>
        <div>This is for teachers</div>
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
