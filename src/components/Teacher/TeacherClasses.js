import React from "react";
import { connect } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {} from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, CardTitle } from "reactstrap";

class TeacherClasses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: this.props.tclasses,
      ajaxComp: false
    };
  }

  //   componentDidMount() {}

  render() {
    const classes = this.props.tclasses;

    return (
      <div className="teacher__classes">
        {!classes[0] ? (
          <div className="teacher__classes">
            <Card
              className="teacher__noclass"
              onClick={() => this.props.addClass()}
            >
              <CardBody>
                <CardTitle>You have no classes added!</CardTitle>Click to add
                one!
              </CardBody>
            </Card>
          </div>
        ) : (
          ""
        )}
        {classes[0] ? (
          <div className="teacher__classes col-12">
            {showClasses(this.state.classes)}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const showClasses = classes => {
  return classes.map(function(eachclass, index) {
    // console.log(eachclass);
    return (
      <Card key={index}>
        <CardBody>
          {" "}
          Class of Year{" "}
          <span className="green-text">
            {eachclass.student_admission_year}
          </span>{" "}
        </CardBody>
      </Card>
    );
  });
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(TeacherClasses);
