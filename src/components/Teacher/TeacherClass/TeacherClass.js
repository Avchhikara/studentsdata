import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchURL } from "./../../../Actions/constants";
import { CSVDownload, CSVLink } from "react-csv";

import "./TeacherClass.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Label,
  Input,
  Alert
} from "reactstrap";

class TeacherClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadClassList: {
        data: [],
        modalOpen: false,
        params: {
          generalAsked: true,
          extraAsked: true,
          resultAsked: true
        }
      },
      res: {
        status: "",
        message: ""
      }
    };
  }

  componentWillMount() {
    if (!(this.props.user.loggedIn && this.props.user.teacher)) {
      this.props.history.push("/teacher/login");
    } else {
      try {
        const year = this.props.match.params.year;
        const classes = this.props.teacher.classes.map(
          classs => classs.student_admission_year
        );
        if (!classes.includes(parseInt(year))) {
          this.props.history.push("/teacher/login");
        }
      } catch (e) {
        console.log("Err: ", e);
      }
    }
  }

  getTs_id = (classes, year) => {
    let ts_id = 0;
    classes.forEach(classs => {
      if (classs.student_admission_year === year) {
        ts_id = classs.ts_id;
      }
    });

    return ts_id;
  };

  onClassDownload = e => {
    const send = {
      t_id: this.props.user.userData.t_id,
      token: this.props.user.userData.token,
      ts_id: this.getTs_id(
        this.props.teacher.classes,
        parseInt(this.props.match.params.year)
      ),
      year: this.props.match.params.year,
      ...this.state.downloadClassList.params
    };

    const btn = e.target;
    btn.disabled = true;
    btn.textContent = "Getting data...";

    axios
      .post(`${fetchURL}/teacher/students/download`, send)
      .then(({ data }) => {
        if (data.res) {
          this.setState({ res: data.res });
          this.toggleDownloadClassListModal();
        } else {
          this.setState(prevState => ({
            downloadClassList: {
              ...prevState.downloadClassList,
              data,
              modalOpen: false,
              params: {
                generalAsked: false,
                extraAsked: false,
                resultAsked: false
              }
            },
            res: {
              status: 200,
              message: "Click  on the link below to download the class list"
            }
          }));
        }

        // console.log(data);
      });
  };

  toggleDownloadClassListModal = () => {
    this.setState(prevState => {
      return {
        downloadClassList: {
          ...prevState.downloadClassList,
          modalOpen: !prevState.downloadClassList.modalOpen
        }
      };
    });
  };

  render() {
    return (
      <div className="teacher-class__container">
        <Row>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <Breadcrumb>
              <BreadcrumbItem>
                {" "}
                <Link to="/teacher">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                Class of Year: {this.props.match.params.year || ""}
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>

          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <h5>
              <span className="green-text">
                Here <FontAwesomeIcon icon={faHandPointDown} />
              </span>{" "}
              are your options:{" "}
            </h5>
            {this.state.res.message.length ? (
              <Alert
                color={this.state.res.status === 200 ? "success" : "danger"}
              >
                {this.state.res.message}
              </Alert>
            ) : (
              ""
            )}
            {this.state.downloadClassList.data.length ? (
              <div>
                <CSVLink
                  data={this.state.downloadClassList.data}
                  onClick={() => {
                    //NOw, after clicking the download
                    //state should be set to null
                    //alert should be removed
                    this.setState({
                      downloadClassList: {
                        data: [],
                        modalOpen: false,
                        params: {
                          generalAsked: true,
                          extraAsked: true,
                          resultAsked: true
                        }
                      },
                      res: {
                        status: "",
                        message: ""
                      }
                    });
                  }}
                  filename={`Class List - ${this.props.match.params.year ||
                    ""}`}
                >
                  Click here to download the class list
                </CSVLink>
              </div>
            ) : (
              ""
            )}
          </Col>

          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <Row className="option-buttons">
              <Col xs={6}>
                <Button
                  block
                  color="success"
                  onClick={() =>
                    this.props.history.push(
                      `/teacher/class/${this.props.match.params.year}/notices`
                    )
                  }
                >
                  Notices
                </Button>
              </Col>
              <Col xs={6}>
                <Button block color="success">
                  View Students
                </Button>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={6}>
                <Button block color="success">
                  Search a Student
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  block
                  color="success"
                  onClick={this.toggleDownloadClassListModal}
                >
                  Download Class List
                </Button>

                <Modal
                  isOpen={this.state.downloadClassList.modalOpen}
                  toggle={this.toggleDownloadClassListModal}
                >
                  <ModalHeader toggle={this.toggleDownloadClassListModal}>
                    Download Class list
                  </ModalHeader>
                  <ModalBody>
                    <h6>Select things you want in the class list</h6>
                    <Row>
                      <Col xs={12}>
                        <Form>
                          <FormGroup>
                            <FormGroup check row>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  id="genData"
                                  checked={
                                    this.state.downloadClassList.params
                                      .generalAsked
                                  }
                                  onChange={() => {
                                    this.setState(prev => ({
                                      downloadClassList: {
                                        ...prev.downloadClassList,
                                        params: {
                                          ...prev.downloadClassList.params,
                                          generalAsked: !prev.downloadClassList
                                            .params.generalAsked
                                        }
                                      }
                                    }));
                                  }}
                                />{" "}
                                General Data
                              </Label>
                            </FormGroup>
                            <FormGroup check row>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  id="resAsked"
                                  checked={
                                    this.state.downloadClassList.params
                                      .resultAsked
                                  }
                                  onChange={() => {
                                    this.setState(prev => ({
                                      downloadClassList: {
                                        ...prev.downloadClassList,
                                        params: {
                                          ...prev.downloadClassList.params,
                                          resultAsked: !prev.downloadClassList
                                            .params.resultAsked
                                        }
                                      }
                                    }));
                                  }}
                                />{" "}
                                Result Data
                              </Label>
                            </FormGroup>
                            <FormGroup check row>
                              <Label check>
                                <Input
                                  type="checkbox"
                                  id="extraAsked"
                                  checked={
                                    this.state.downloadClassList.params
                                      .extraAsked
                                  }
                                  onChange={() => {
                                    this.setState(prev => ({
                                      downloadClassList: {
                                        ...prev.downloadClassList,
                                        params: {
                                          ...prev.downloadClassList.params,
                                          extraAsked: !prev.downloadClassList
                                            .params.extraAsked
                                        }
                                      }
                                    }));
                                  }}
                                />{" "}
                                Extra Curricular Activites Data
                              </Label>
                            </FormGroup>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="success"
                      size="sm"
                      onClick={this.onClassDownload}
                    >
                      Download
                    </Button>
                    <Button
                      color="secondary"
                      outline
                      size="sm"
                      onClick={this.toggleDownloadClassListModal}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(TeacherClass);
