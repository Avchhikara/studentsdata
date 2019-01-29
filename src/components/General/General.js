import React from "react";
import {
  Row,
  Col,
  Alert,
  Spinner,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { toast } from "react-toastify";
import { connect } from "react-redux";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./General.css";
import fetchGeneralData from "./../../Actions/fetchGeneralData";

class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      rno: "",
      mname: "",
      fname: "",
      gender: "",
      address: ""
    };
  }

  componentDidMount = () => {
    //Now, here request the users data from backend
    //Then, dispatch it to the state

    //Then, hide the alert which would be shown to the user
    //Using setTimeOut for fun

    const alert = document.querySelector("#general-data-alert");
    setTimeout(() => {
      if (alert) {
        alert.style.display = "none";
      }
    }, 2000);

    setTimeout(() => {
      this.autoSave();
    }, 5000);
  };

  showLoading(e) {
    const btn = e.target;
    btn.innerHTML = `
    <div class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
    `;
    btn.disabled = true;
  }

  autoSave = () => {
    //Everything regarding autosaving
    //First, make a request to backend,
    //Second, dispatch to the redux store

    //Dispatching to redux store automatically
    this.props.dispatch(fetchGeneralData(this.state));
    const Message = () => (
      <div className="green-text">Data is saved automatically!</div>
    );

    toast(<Message />);

    this.autoSaveCallback();
  };

  autoSaveCallback = () => {
    setTimeout(() => {
      this.autoSave();
    }, 15000);
  };

  onGeneralSave(e) {
    console.log(this.state);

    //After everything, setting it to save again
    const btn = e.target;
    btn.innerHTML = `
      Save <i class="fas fa-save></i>
    `;
    btn.disabled = false;
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <div className="general-container">
          Please <a href="/login">Login</a> first
        </div>
      );
    }

    return (
      <div className="general-container">
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>General Data</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col xs={12}>
            <span className="h2">
              Enter <span className="green-text">General</span> data{" "}
            </span>{" "}
            ,{" "}
            <span className="green-text hide-on-small mb-4">
              {
                //this.props.userData.email
              }
            </span>
            <Alert color="success" className="mt-4" id="general-data-alert">
              <Spinner color="dark" size="sm" /> Getting your previously filled
              data if exist
            </Alert>
          </Col>
          <Col xs={12}>
            <Form className="mt-4">
              <FormGroup row>
                <Label for="roll" xs={3} sm={2}>
                  R No.
                </Label>
                <Col xs={9} sm={10}>
                  <Input
                    type="number"
                    id="roll"
                    name="roll"
                    value={this.state.rno}
                    onChange={e => {
                      this.setState({ rno: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="name" xs={3} sm={2}>
                  Name
                </Label>
                <Col xs={9} sm={10}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="fname" xs={3} sm={2}>
                  FName
                </Label>
                <Col xs={9} sm={10}>
                  <Input
                    type="text"
                    id="fname"
                    name="fname"
                    value={this.state.fname}
                    onChange={e => this.setState({ fname: e.target.value })}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="mname" xs={3} sm={2}>
                  MName
                </Label>
                <Col xs={9} sm={10}>
                  <Input
                    type="text"
                    id="mname"
                    name="mname"
                    value={this.state.mname}
                    onChange={e => this.setState({ mname: e.target.value })}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col xs={2}>Gender</Col>
                <Col xs={10}>
                  <ButtonGroup>
                    <Button
                      color="success"
                      outline
                      onClick={() => this.setState({ gender: "male" })}
                      active={this.state.gender === "male"}
                    >
                      Male
                    </Button>
                    <Button
                      color="success"
                      outline
                      onClick={() => this.setState({ gender: "female" })}
                      active={this.state.gender === "female"}
                    >
                      Female
                    </Button>
                    <Button
                      color="success"
                      outline
                      onClick={() =>
                        this.setState({ gender: "decline to say" })
                      }
                      active={this.state.gender === "decline to say"}
                    >
                      Decline to say
                    </Button>
                  </ButtonGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="address" xs={3} sm={2}>
                  Permanent Address
                </Label>
                <Col xs={9} sm={10}>
                  <Input
                    type="textarea"
                    id="address"
                    name="address"
                    value={this.state.address}
                    onChange={e => this.setState({ address: e.target.value })}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Col>
          <Col xs={{ size: 12 }} className="mt-4 mb-4">
            <Button
              color="success"
              block
              outline
              onClick={e => {
                this.showLoading(e);
                this.onGeneralSave(e);
              }}
            >
              Save <FontAwesomeIcon icon={faSave} />
            </Button>
          </Col>
        </Row>
        <ToastContainer position="top-left" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(General);
