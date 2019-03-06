import React from "react";
import { connect } from "react-redux";
import "./Teacher.css";
import axios from "axios";
import { fetchURL } from "./../../Actions/constants";
import TeacherClasses from "./TeacherClasses";
import setClasses from "./../../Actions/Teacher/setClasses";

import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Row,
  Spinner,
  Button,
  Input,
  Label,
  FormGroup,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faPlus,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: {
        status: "",
        message: ""
      },
      classes: this.props.teacher.classes,
      ajaxComp: false,
      search: {
        show: false,
        terms: ""
      },
      tyear: "",
      showAddModal: false
    };
  }

  componentWillMount() {
    if (!(this.props.user.loggedIn && this.props.user.teacher)) {
      this.props.history.push("/teacher/login");
    }
  }

  componentDidMount() {
    this.getClasses();
  }

  getClasses = () => {
    //Make axios request here
    this.setState({ ajaxComp: false });

    const { userData } = this.props.user;
    if (userData.t_id) {
      axios.post(`${fetchURL}/teacher/classes`, userData).then(({ data }) => {
        if (data[0]) {
          // console.log(data);
          //Now, if any of the entry exist
          this.setState({ classes: data, ajaxComp: true });
        } else {
          //Now, setting state value
          this.setState({ ajaxComp: true });
        }
        //Now, setting up the user classes
        this.props.dispatch(setClasses(data));
      });
    }
  };

  addClass = e => {
    // this.props.history.push("/teacher/add");
    this.toggleAddModal();
  };

  sendAddClassRequest = e => {
    //Now, first checking whether values have been provided
    if (this.state.tyear !== "") {
      //First, getting the button
      const target = e.target;
      target.disabled = true;
      target.textContent = "Please Wait...";

      //Now, making the ajax request to the backend

      //Data to be send
      const send = {
        t_id: this.props.user.userData.t_id,
        token: this.props.user.userData.token,
        year: this.state.tyear
      };

      axios.post(`${fetchURL}/teacher/add`, send).then(({ data }) => {
        console.log(data);

        //Updating the classes in the redux
        this.props.dispatch(setClasses(data));

        //Now, enabling the button
        target.disabled = false;
        target.textContent = "Add";
        //And finally, closing the modal after showing message
        this.setState({
          res: {
            status: 200,
            message:
              "Class has been added, please proceed to the verification section"
          }
        });
        //Updating the class list
        // this.forceUpdate();
        this.getClasses();
        this.toggleAddModal();
      });

      // this.props.history.push("/teacher");
    } else {
      //Setting a message that all values should be entered
    }
  };

  toggleAddModal = () => {
    this.setState(prev => ({ showAddModal: !prev.showAddModal }));
  };

  render() {
    return (
      <div className="teacher-container">
        <Row>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <Breadcrumb>
              <BreadcrumbItem active>Home</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col
            xs={12}
            md={9}
            lg={7}
            className="h5 clearfix"
            style={{ margin: "0 auto" }}
          >
            <span className="float-left">
              Your{" "}
              <span className="green-text">
                classes <FontAwesomeIcon icon={faHandPointDown} />
              </span>
            </span>
            <span className="float-right">
              <Button
                size="sm"
                color="success"
                className="mr-2"
                onClick={this.addClass}
              >
                Add new <FontAwesomeIcon icon={faPlus} />{" "}
              </Button>
              <Button size="sm" color="success">
                <FontAwesomeIcon icon={faSearch} />{" "}
              </Button>
            </span>
          </Col>
          {this.state.ajaxComp ? (
            <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
              <TeacherClasses
                addClass={this.addClass}
                tclasses={this.state.classes}
              />
            </Col>
          ) : (
            <div className="teacher__spinner col-12">
              <Spinner color="success" />
              <div>Getting your classes</div>
            </div>
          )}
          <Col xs={12} />
        </Row>

        <Modal isOpen={this.state.showAddModal} toggle={this.toggleAddModal}>
          <ModalHeader toggle={this.toggleAddModal}>Add New Class</ModalHeader>
          <ModalBody>
            <Row>
              <Col xs={12} style={{ margin: "0 auto" }}>
                <Form>
                  <FormGroup row>
                    <Label for="tyear" xs={4}>
                      Admission Year
                    </Label>
                    <Col xs={8}>
                      <Input
                        type="select"
                        id="tyear"
                        name="tyear"
                        onChange={e => {
                          const val = e.target.value;
                          if (val !== "--Select Year--") {
                            this.setState({ tyear: val });
                          } else {
                            this.setState({ tyear: "" });
                          }
                        }}
                      >
                        <option defaultValue>--Select Year--</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                      </Input>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              size="sm"
              className="mr-4"
              onClick={this.sendAddClassRequest}
            >
              Add
            </Button>
            <Button
              color="danger"
              outline
              size="sm"
              onClick={this.toggleAddModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
