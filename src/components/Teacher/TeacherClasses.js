import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Card, CardBody, CardTitle, Button } from "reactstrap";

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
    // console.log(this.props.history);

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
            {showClasses(this.state.classes, this.props.history)}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const showClasses = (classes, history) => {
  return classes.map(function(eachclass, index) {
    // console.log(eachclass.confirmed);
    return (
      <Card
        key={index}
        className={
          eachclass.confirmed === "0" ? "teacher-class__unconfirm" : ""
        }
        onClick={e => {
          //Now, what to do when card is clicked
          if (eachclass.confirmed === "0") {
            //Now, when card is unconfirmed
            history.push(`/teacher/verify/${eachclass.student_admission_year}`);
          } else {
            //When teacher is confirmed
            //Now, when the delete button is clicked
            if (e.target.classList.contains("btn")) {
            } else {
              history.push(
                `/teacher/class/${eachclass.student_admission_year}`
              );
            }
          }
        }}
      >
        <CardBody className="clearfix">
          <span className="float-left">
            Class of Year{" "}
            <span className="green-text">
              {eachclass.student_admission_year}
            </span>
          </span>
          <span className="float-right">
            {eachclass.confirmed === "0" ? (
              <Button
                color="danger"
                outline
                size="sm"
                onClick={() =>
                  history.push(
                    `/teacher/verify/${eachclass.student_admission_year}`
                  )
                }
              >
                Verify
              </Button>
            ) : (
              <span>
                <Button
                  color="success"
                  outline
                  size="sm"
                  className="mr-2"
                  onClick={() =>
                    history.push(
                      `/teacher/class/${eachclass.student_admission_year}`
                    )
                  }
                >
                  View
                </Button>
                <Button
                  color="danger"
                  outline
                  size="sm"
                  onClick={e => {
                    console.log("Delete for class");
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </span>
            )}
          </span>
        </CardBody>
      </Card>
    );
  });
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(TeacherClasses);
