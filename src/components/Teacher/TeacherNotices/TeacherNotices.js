import React from "react";

import "./TeacherNotices.css";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { fetchURL } from "./../../../Actions/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Button,
  Spinner,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem
} from "reactstrap";

class TeacherNotices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: [],
      modal: {
        open: false,
        purpose: "Add",
        header: "Add Notice",
        title: "",
        body: ""
      },
      loadingNotices: true
    };
  }

  //Add a component did mount thing here
  componentDidMount() {
    if (!(this.props.user.loggedIn && this.props.user.teacher)) {
      this.props.history.push("/teacher/login");
    } else {
      this.getNotices();
    }
  }

  getNotices = () => {
    this.setState({ loadingNotices: true });

    //Make an axios request here and then update the state properly

    const send = {
      t_id: this.props.user.userData.t_id || "",
      ts_id: this.getTs_id(
        this.props.teacher.classes,
        this.props.match.params.year
      ),
      token: this.props.user.userData.token
    };

    axios.post(`${fetchURL}/teacher/get/notices`, send).then(({ data }) => {
      this.setState(prev => ({
        loadingNotices: false,
        notices: data.res.status === 200 ? data.res.notices : []
      }));
    });
  };

  getTs_id = (classes, year) => {
    // console.log(year);
    year = parseInt(year);
    let ts_id = 0;
    classes.forEach(classs => {
      if (classs.student_admission_year === year) {
        ts_id = classs.ts_id;
      }
    });

    return ts_id;
  };

  toggleModal = () => {
    this.setState(prev => {
      return {
        modal: {
          open: !prev.modal.open,
          purpose: "Add",
          header: "Add Notice",
          title: "",
          body: ""
        }
      };
    });
  };

  addNotice = e => {
    const btn = e.target;
    btn.disabled = true;
    btn.textContent = "Posting...";

    const send = {
      t_id: this.props.user.userData.t_id || "",
      ts_id: this.getTs_id(
        this.props.teacher.classes,
        this.props.match.params.year
      ),
      token: this.props.user.userData.token,
      title: this.state.modal.title === "" ? undefined : this.state.modal.title,
      body: this.state.modal.body === "" ? undefined : this.state.modal.body
    };

    //Now, making the request
    axios.post(`${fetchURL}/teacher/add/notice`, send).then(({ data }) => {
      console.log(data);

      btn.textContent = "Posted!";
      this.getNotices();
      this.toggleModal();
    });
  };

  render() {
    return (
      <div className="teacher-notices__container">
        <Row>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/teacher">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link
                  to={`/teacher/class/${this.props.match.params.year || ""}`}
                >
                  Class of year: {this.props.match.params.year || ""}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Notices</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <div className="clearfix">
              <h5 className="float-left">
                Notices for this class:{" "}
                <span className="green-text">
                  {this.props.match.params.year || ""}
                </span>{" "}
              </h5>
              <Button
                color="success"
                size="sm"
                className="float-right"
                onClick={() => this.toggleModal()}
              >
                <FontAwesomeIcon icon={faPlus} /> Add New
              </Button>
            </div>
          </Col>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <hr />
          </Col>

          {this.state.loadingNotices ? (
            <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
              <div className="spinner-col">
                <Spinner size="lg" color="success" />
                <div>Loading notices</div>
              </div>
            </Col>
          ) : (
            ""
          )}

          {!this.state.loadingNotices && this.state.notices.length === 0 ? (
            <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
              <h6>
                You have no notices added for this class, please click on the
                'Add new' button above to add a notice
              </h6>
            </Col>
          ) : (
            ""
          )}

          {!this.state.loadingNotices && this.state.notices.length > 0 ? (
            <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
              <ListGroup>
                {this.state.notices.map((notice, index) => {
                  return (
                    <ListGroupItem key={index}>{notice.title}</ListGroupItem>
                  );
                })}
              </ListGroup>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Modal isOpen={this.state.modal.open} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            {this.state.modal.header}
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
                <Form>
                  <FormGroup row>
                    <Label for="title" xs={2}>
                      Title
                    </Label>
                    <Col xs={10}>
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        value={this.state.modal.title}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState(prev => {
                            return {
                              modal: {
                                ...prev.modal,
                                title: val
                              }
                            };
                          });
                        }}
                        placeholder="Notice title here"
                        autoFocus={true}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="body" xs={2}>
                      Body
                    </Label>
                    <Col xs={10}>
                      <Input
                        value={this.state.modal.body}
                        onChange={e => {
                          const val = e.target.value;
                          this.setState(prev => ({
                            modal: {
                              ...prev.modal,
                              body: val
                            }
                          }));
                        }}
                        type="textarea"
                        name="body"
                        id="body"
                        placeholder="Notice body here"
                      />
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              outline
              onClick={this.toggleModal}
              size="sm"
            >
              {this.state.modal.purpose === "Add" ? "Cancel" : "Close"}
            </Button>
            {this.state.modal.purpose === "Add" ? (
              <Button color="success" onClick={this.addNotice} size="sm">
                Post Notice
              </Button>
            ) : (
              ""
            )}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(TeacherNotices);
