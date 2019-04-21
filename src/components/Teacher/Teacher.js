import React from "react";
import { connect } from "react-redux";
import "./Teacher.css";
import axios from "axios";
import { fetchURL } from "./../../Actions/constants";
import TeacherClasses from "./TeacherClasses";
import setClasses from "./../../Actions/Teacher/setClasses";
import setRequests from "./../../Actions/Teacher/setRequests";

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
  ModalFooter,
  Alert
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faPlus,
  faSearch,
  faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: {
        status: "",
        message: ""
      },
      mres: "",
      classes: this.props.teacher.classes,
      ajaxComp: false,
      search: {
        open: false,
        term: ""
      },
      tyear: "",
      showAddModal: false,
      timeoutID: []
    };
  }

  componentWillMount() {
    if (!(this.props.user.loggedIn && this.props.user.teacher)) {
      this.props.history.push("/teacher/login");
    }
  }

  componentWillUnmount() {
    const timeoutID = this.state.timeoutID;
    for (let i in timeoutID) {
      clearTimeout(timeoutID[i]);
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
        this.setState({ ajaxComp: true, classes: data });

        //Now, setting up the user classes
        this.props.dispatch(setClasses(data));

        //Now, loading up the requests
        this.getRequests();
      });
    }
  };

  //Now, getting the requests user have after classes are got
  getRequests = () => {
    //Making axios req
    axios
      .post(`${fetchURL}/teacher/requests`, {
        t_id: this.props.user.userData.t_id,
        token: this.props.user.userData.token
      })
      .then(({ data }) => {
        // console.log(data);
        this.props.dispatch(setRequests(data.data));
      });
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
        // this.props.dispatch(setClasses(data));

        //Now, enabling the button
        target.disabled = false;
        target.textContent = "Add";
        //And finally, closing the modal after showing message

        if (data.res.status !== 200) {
          //updating the error alert
          this.setState({
            mres: data.res.message
          });
        } else {
          this.setState({
            res: data.res
          });

          //Updating the class list
          this.getClasses();
          this.toggleAddModal();
        }
      });

      // this.props.history.push("/teacher");
    } else {
      //Setting a message that all values should be entered
    }
  };

  toggleAddModal = () => {
    this.setState(prev => ({ showAddModal: !prev.showAddModal, mres: "" }));
  };

  onSearch = () => {
    this.setState(prevState => ({
      search: {
        open: !prevState.search.open,
        term: ""
      }
    }));
  };

  onDeleteClass = send => {
    //Sending request to delete the class
    send.token = this.props.user.userData.token;

    axios.post(`${fetchURL}/teacher/delete`, send).then(({ data }) => {
      //Also, showing the message
      this.setState({ res: data.res });
      const id = setTimeout(() => {
        this.setState({ res: { status: 400, message: "" } });
      }, 2000);

      this.setState(prev => {
        return {
          timeoutID: prev.timeoutID.concat(id)
        };
      });

      //Now, reloading the classes
      this.getClasses();
    });
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
          {this.state.res.message.length !== 0 ? (
            <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
              <Alert
                color={this.state.res.status === 200 ? "success" : "danger"}
              >
                {this.state.res.message}
              </Alert>
            </Col>
          ) : (
            ""
          )}

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
              <Button
                size="sm"
                color={this.state.search.open ? "danger" : "success"}
                onClick={this.onSearch}
              >
                <FontAwesomeIcon
                  icon={this.state.search.open ? faTimesCircle : faSearch}
                />{" "}
              </Button>
            </span>
          </Col>
        </Row>
        {this.state.search.open ? (
          <div className="row">
            <Col
              xs={12}
              md={9}
              lg={7}
              style={{ margin: "0 auto" }}
              className="teacher__search-box"
            >
              <Input
                type="number"
                name="year"
                id="year"
                value={this.state.search.term}
                onChange={e => {
                  let val = e.target.value.toString();

                  this.setState(prevState => ({
                    search: {
                      open: prevState.search.open,
                      term: val ? val : ""
                    }
                  }));
                }}
                placeholder="Enter year to search for here"
                autoFocus
              />
            </Col>
          </div>
        ) : (
          ""
        )}
        <Row>
          {this.state.ajaxComp ? (
            <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
              <TeacherClasses
                addClass={this.addClass}
                tclasses={this.state.classes}
                history={this.props.history}
                search={this.state.search}
                deleteClass={this.onDeleteClass}
              />
            </Col>
          ) : (
            <div className="teacher__spinner col-12">
              <Spinner color="success" />
              <div>Getting your classes</div>
            </div>
          )}
        </Row>

        <Modal isOpen={this.state.showAddModal} toggle={this.toggleAddModal}>
          <ModalHeader toggle={this.toggleAddModal}>Add New Class</ModalHeader>
          <ModalBody>
            <Row>
              {this.state.mres.length !== 0 ? (
                <Col xs={12}>
                  <Alert color="danger">{this.state.mres}</Alert>
                </Col>
              ) : (
                ""
              )}
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
