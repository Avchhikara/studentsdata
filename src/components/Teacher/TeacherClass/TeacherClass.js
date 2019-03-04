import React from "react";

import "./TeacherClass.css";

class TeacherClass extends React.Component {
  render() {
    return (
      <div className="teacher-class__container">
        <div>This is for teacher class</div>
        <div>This is for class {this.props.match.params.year}</div>
      </div>
    );
  }
}

export default TeacherClass;
