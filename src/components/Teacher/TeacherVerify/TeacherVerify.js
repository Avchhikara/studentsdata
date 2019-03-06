import React from "react";
import "./TeacherVerify.css";
import { Link } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class TeacherVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="teacher-verify">
        This is for verification of class {this.props.match.params.year}
      </div>
    );
  }
}

export default TeacherVerify;
