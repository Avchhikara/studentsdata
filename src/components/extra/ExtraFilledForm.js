import React from "react";
import { Form, Col, FormGroup, Label, Input, Button, Alert } from "reactstrap";

import { faEdit, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fade } from "react-reveal";
import axios from "axios";
import { connect } from "react-redux";
import { fetchURL } from "../../Actions/constants";

class ExtraFilledForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      eactivity: this.props.value.eactivity,
      ename: this.props.value.ename,
      einstitution: this.props.value.einstitution,
      esemester: this.props.value.semester,
      eachievement: this.props.value.eachievement,
      res: { status: 0, message: "" }
    };
  }

  onEditSave = e => {
    //Making the put request to the server
    if (this.state.edit) {
      const send = {
        token: this.props.user.userData.id,
        s_id: this.props.user.userData.s_id,
        e_id: this.props.value.e_id,
        eactivity: this.state.eactivity,
        ename: this.state.ename,
        einstitution: this.state.einstitution,
        esemester: this.state.esemester,
        eachievement: this.state.eachievement
      };

      axios.put(`${fetchURL}/extra`, send).then(({ data }) => {
        this.setState({
          res: {
            ...data
          }
        });
        setTimeout(() => {
          this.setState({ res: { status: 0, message: "" } });
        }, 3000);
      });
    }
  };

  onValueDelete = e => {
    const send = {
      s_id: this.props.user.userData.s_id,
      e_id: this.props.value.e_id,
      token: this.props.user.userData.id
    };

    axios
      .delete(`${fetchURL}/extra`, { data: send })
      .then(({ data }) => {
        this.setState({ res: { ...data } });
        this.props.showFilledValues();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="extra-filled-form-container">
        <hr />
        <div className="clearfix">
          <span className="float-left">
            Values filled for{" "}
            <span className="green-text">Sem #{this.state.esemester}</span>
          </span>
          <span className="float-right">
            <Button
              color={this.state.edit ? "success" : "warning"}
              outline
              size="sm"
              className="ml-3"
              onClick={e => {
                this.setState(prevState => {
                  setTimeout(() => {
                    this.setState({ message: "" });
                  }, 3000);
                  return {
                    edit: !prevState.edit,
                    res: {
                      message:
                        prevState.edit === true
                          ? ""
                          : "You can edit the field Now",
                      status: 200
                    }
                  };
                });
                this.onEditSave(e);
              }}
            >
              {this.state.edit ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faEdit} />
              )}
            </Button>

            <Button
              color="danger"
              outline
              size="sm"
              onClick={e => this.onValueDelete(e)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </span>
        </div>
        {this.state.res.message !== "" ? (
          <Fade>
            <Alert
              color={this.state.res.status === 200 ? "success" : "danger"}
              className="mt-3"
            >
              {this.state.res.message}
            </Alert>
          </Fade>
        ) : (
          ""
        )}
        <Form>
          <FormGroup row>
            <Label for="ename" xs={4}>
              Activity name
            </Label>
            <Col xs={8}>
              <Input
                size="sm"
                type="text"
                name="ename"
                id="ename"
                disabled={!this.state.edit}
                value={this.state.ename}
                onChange={e => {
                  const val = e.target.value;
                  this.setState({ ename: val, saved: val.length === 0 });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="einstitution" xs={4}>
              Institution
            </Label>
            <Col xs={8}>
              <Input
                size="sm"
                type="text"
                name="einstitution"
                id="einstitution"
                disabled={!this.state.edit}
                value={this.state.einstitution}
                onChange={e => {
                  const val = e.target.value;
                  this.setState({
                    einstitution: val,
                    saved: val.length === 0
                  });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="eachievement" xs={4}>
              Achievement
            </Label>
            <Col xs={8}>
              <Input
                bsSize="sm"
                type="select"
                name="eachievement"
                id="eachievement"
                disabled={!this.state.edit}
                value={this.state.eachievement}
                onChange={e => {
                  const val = e.target.value;
                  this.setState({ eachievement: val });
                }}
              >
                <option value="nothing">Just Participated</option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
              </Input>
            </Col>
          </FormGroup>
          {this.state.edit ? (
            <Fade>
              <div className="row">
                <Col xs={6}>
                  <Button
                    color="success"
                    size="sm"
                    outline
                    block
                    onClick={e => {
                      this.setState(prevState => {
                        return {
                          edit: !prevState.edit
                        };
                      });
                      this.onEditSave(e);
                    }}
                  >
                    Save
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    color="danger"
                    outline
                    block
                    size="sm"
                    onClick={e => {
                      this.setState({
                        eactivity: this.props.value.eactivity,
                        ename: this.props.value.ename,
                        einstitution: this.props.value.einstitution,
                        esemester: this.props.value.semester,
                        eachievement: this.props.value.eachievement,
                        edit: false
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              </div>
            </Fade>
          ) : (
            ""
          )}
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(ExtraFilledForm);
