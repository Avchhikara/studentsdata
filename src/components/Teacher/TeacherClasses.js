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

  classesToShow = () => {
    //This function will give back classes according to the search term
    return this.state.classes.filter(classs => {
      const year = classs.student_admission_year.toString();
      return year.includes(this.props.search.term);
    });
  };

  render() {
    const classes = this.classesToShow();
    // console.log()
    // console.log(!classes[0] && !this.props.search.open);

    return (
      <div className="teacher__classes">
        {!classes[0] && !this.props.search.open ? (
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

        {!classes[0] && this.state.classes[0] && this.props.search.open ? (
          <div className="teacher__classes">
            No class with year {this.props.search.term} is present
          </div>
        ) : (
          ""
        )}

        {classes[0] ? (
          <div className="teacher__classes col-12">
            {showClasses(classes, this.props, this.props.history)}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const showClasses = (classes, { history, deleteClass }) => {
  // console.log(deleteClass);
  return classes.map(function(eachclass, index) {
    // console.log(eachclass);
    return (
      <Card
        key={index}
        className={!eachclass.confirmed ? "teacher-class__unconfirm" : ""}
      >
        <CardBody className="clearfix">
          <span className="float-left">
            Class of Year{" "}
            <span className="green-text">
              {eachclass.student_admission_year}
            </span>
          </span>
          <span className="float-right">
            {!eachclass.confirmed ? (
              <span>
                <Button
                  color="danger"
                  className="mr-2"
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
                <Button
                  color="danger"
                  outline
                  size="sm"
                  onClick={e => {
                    //Doing everything related to class deleting here
                    //First, asking whether the user really wants to delte class
                    if (
                      window.confirm(
                        `Are you sure to delete class of year: ${
                          eachclass.student_admission_year
                        } ? Please note that, this change can't be reversed at any condition!`
                      )
                    ) {
                      deleteClass({
                        ts_id: eachclass.ts_id,
                        t_id: eachclass.t_id
                      });
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </span>
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
                    //Doing everything related to class deleting here
                    //First, asking whether the user really wants to delte class
                    if (
                      window.confirm(
                        `Are you sure to delete class of year: ${
                          eachclass.student_admission_year
                        } ? Please note that, this change can't be reversed at any condition!`
                      )
                    ) {
                      deleteClass({
                        ts_id: eachclass.ts_id,
                        t_id: eachclass.t_id
                      });
                    }
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
