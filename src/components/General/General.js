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
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./General.css";
import fetchGeneralData from "./../../Actions/fetchGeneralData";
import { fetchURL } from "./../../Actions/constants";
class General extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      rno: "",
      mname: "",
      fname: "",
      gender: "",
      address: "",
      pno: "",
      university: "",
      department: "",
      timeoutid: [],
      res: { status: "", message: "" },
      saving: false
    };
  }

  componentWillMount() {
    if (!this.props.user.loggedIn) {
      this.props.history.push("/login");
    } else if (this.props.user.teacher) {
      this.props.history.push("/teacher");
    }
  }

  componentDidMount = () => {
    //Now, here request the users data from backend
    const {
      name,
      rno,
      mname,
      fname,
      gender,
      address,
      pno,
      university,
      department
    } = this.state;

    axios
      .post(`${fetchURL}/general`, {
        name,
        fname,
        mname,
        gender,
        address,
        department,
        pno: parseInt(pno),
        university,
        rno: parseInt(rno),
        type: "get",
        s_id: this.props.user.userData ? this.props.user.userData.s_id : "",
        id: this.props.user.userData ? this.props.user.userData.id : ""
      })
      .then(({ data }) => {
        if (data.status === 200) {
          this.setState(() => ({
            name: data.user.name,
            fname: data.user.fname,
            mname: data.user.mname,
            address: data.user.address,
            pno: data.user.pno,
            rno: data.user.rno,
            gender: data.user.gender,
            university: data.user.university,
            department: data.user.department
          }));
          console.log(data.user);
        }
        //Now, calling the autosave callback
        const timeoutID = setTimeout(() => {
          this.autoSave();
        }, 5000);

        //Now, adding it to state
        this.setState(prevState => {
          return {
            timeoutid: prevState.timeoutid.concat([timeoutID])
          };
        });

        const alert = document.querySelector("#general-data-alert");

        if (alert) {
          alert.style.display = "none";
        }
      })
      .catch(err => console.log(err));

    // const xhr = new XMLHttpRequest();
    // xhr.open(
    //   "GET",
    //   `http://localhost:8888/studentsdata.xyz/generaldata.php?s_id=${
    //     this.props.userData ? this.props.userData.s_id : ""
    //   }&token=${this.props.userData ? this.props.userData.id : ""}&type=get `,
    //   true
    // );
    // xhr.onreadystatechange = e => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const res = JSON.parse(xhr.responseText);
    //     console.log(res);
    //     if (res.status === 200) {
    //       //Setting up the state values accordingly
    //       this.setState(() => ({
    //         name: res.name,
    //         rno: res.rno,
    //         pno: res.pno,
    //         fname: res.fname,
    //         mname: res.mname,
    //         address: res.address,
    //         gender: res.gender
    //       }));
    //     }
    //     //Now, calling the autosave callback
    //     setTimeout(() => {
    //       this.autoSave();
    //     }, 5000);
    //   }
    // };
    // xhr.send();

    //Then, dispatch it to the state

    //Then, hide the alert which would be shown to the user
    //Using setTimeOut for fun

    // const alert = document.querySelector("#general-data-alert");
    // if (alert) {
    //   alert.style.display = "none";
    // }
  };

  componentWillUnmount() {
    const tid = this.state.timeoutid;
    tid.forEach(id => {
      clearTimeout(id);
    });
  }

  showLoading(e) {
    this.setState({ saving: true });
  }

  autoSave = () => {
    if (
      this.props.history.location.pathname === "/general" &&
      this.props.user.loggedIn
    ) {
      const Message = () => (
        <div className="green-text">Data is saved automatically!</div>
      );

      //Everything regarding autosaving
      //First, make a request to backend,

      const {
        name,
        rno,
        mname,
        fname,
        gender,
        address,
        pno,
        department
      } = this.state;
      axios
        .post(`${fetchURL}/general`, {
          name,
          fname,
          mname,
          gender,
          address,
          department,
          pno: parseInt(pno),
          rno: parseInt(rno),
          university: this.state.university,
          type: "set",
          s_id: this.props.user.userData ? this.props.user.userData.s_id : "",
          id: this.props.user.userData ? this.props.user.userData.id : ""
        })
        .then(({ data }) => {
          if (data.status === 200) {
            //Now, showing message and all that stuff
            toast(<Message />);
            //dispatching changes to store
            this.props.dispatch(fetchGeneralData(this.state));
          }
          //Calling for autosave
          if (
            this.props.history.location.pathname === "/general" &&
            this.props.user.loggedIn
          ) {
            this.autoSaveCallback();
          } else {
          }
        });

      // const xhr = new XMLHttpRequest();
      // xhr.open(
      //   "GET",
      //   `http://localhost:8888/studentsdata.xyz/generaldata.php?s_id=${
      //     this.props.userData ? this.props.userData.s_id : ""
      //   }&name=${this.state.name}&rno=${this.state.rno}&mname=${
      //     this.state.mname
      //   }&fname=${this.state.fname}&gender=${this.state.gender}&address=${
      //     this.state.address
      //   }&pno=${this.state.pno}&token=${
      //     this.props.userData ? this.props.userData.id : ""
      //   }&type=set `,
      //   true
      // );
      // xhr.onreadystatechange = e => {
      //   if (xhr.readyState === 4 && xhr.status === 200) {
      //     const res = JSON.parse(xhr.responseText);
      //     if (res.status === 200) {
      //       //Now, showing message and all that stuff
      //       toast(<Message />);
      //       //dispatching changes to store
      //       this.props.dispatch(fetchGeneralData(this.state));
      //     }
      //     //Calling for autosave
      //     this.autoSaveCallback();
      //   }
      // };
      // xhr.send();
    }
  };

  autoSaveCallback = () => {
    if (
      this.props.history.location.pathname === "/general" &&
      this.props.user.loggedIn
    ) {
      const tid = setTimeout(() => {
        this.autoSave();
      }, 15000);

      this.setState(prevState => ({
        timeoutid: prevState.timeoutid.concat([tid])
      }));
    }
  };

  onGeneralSave(e) {
    //Now, saving by clicking
    const {
      name,
      rno,
      mname,
      fname,
      gender,
      address,
      pno,
      department
    } = this.state;
    axios
      .post(`${fetchURL}/general`, {
        name,
        fname,
        mname,
        gender,
        address,
        department,
        pno: parseInt(pno),
        university: this.state.university,
        rno: parseInt(rno),
        type: "set",
        s_id: this.props.user.userData ? this.props.user.userData.s_id : "",
        id: this.props.user.userData ? this.props.user.userData.id : ""
      })
      .then(({ data }) => {
        if (data.status === 200) {
          //dispatching changes to store
          this.props.dispatch(fetchGeneralData(this.state));
          this.setState({
            res: { status: 200, message: "Values have been saved !" },
            saving: false
          });
          //Now, scrolling to top
          this.scrollToTop();
        }
      })
      .catch(err => console.log(err));
  }

  scrollToTop = () => {
    const breadcrumb = document.querySelector(".breadcrumb");
    breadcrumb.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    if (!this.props.user.loggedIn) {
      return <div>Please login first</div>;
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
            {this.state.res.message !== "" ? (
              <Alert
                color={this.state.res.status === 200 ? "success" : "danger"}
              >
                {this.state.res.message}
              </Alert>
            ) : (
              ""
            )}
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
                    value={this.state.rno ? this.state.rno : ""}
                    onChange={e => {
                      this.setState({ rno: e.target.value });
                    }}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="roll" xs={3} sm={2}>
                  P No.
                </Label>
                <Col xs={9} sm={10}>
                  <Input
                    type="number"
                    id="pno"
                    name="pno"
                    value={this.state.pno}
                    onChange={e => {
                      this.setState({ pno: e.target.value });
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
                <Label for="university" xs={3}>
                  University
                </Label>
                <Col xs={9}>
                  <Input
                    type="select"
                    name="university"
                    id="university"
                    value={this.state.university}
                    onChange={e => {
                      const val = e.target.value;
                      if (val !== "--Select College--") {
                        this.setState({ university: val });
                      } else {
                        this.setState({ university: "" });
                      }
                    }}
                  >
                    <option defaultValue>--Select College--</option>
                    <option value="DCRUSTM">DCRUST, Murthal</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="department" xs={3}>
                  Department
                </Label>
                <Col xs={9}>
                  <Input
                    type="select"
                    name="department"
                    id="department"
                    value={this.state.department}
                    onChange={e => {
                      const val = e.target.value;
                      if (val !== "--Select College--") {
                        this.setState({ department: val });
                      } else {
                        this.setState({ department: "" });
                      }
                    }}
                  >
                    <option defaultValue>--Select Department--</option>
                    <option value="ECE">ECE</option>
                    <option value="CE">CE(Civil)</option>
                    <option value="CSE">CSE</option>
                    <option value="ME">Mechanical Engg.</option>
                    <option value="BT">Bio Tech.</option>
                    <option value="CHE">Chemical engg.</option>
                    <option value="EE">Electrical engg.</option>
                    <option value="BArch">Architecture</option>
                  </Input>
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
                      size="sm"
                      outline
                      onClick={() => this.setState({ gender: "male" })}
                      active={this.state.gender === "male"}
                    >
                      Male
                    </Button>
                    <Button
                      color="success"
                      outline
                      size="sm"
                      onClick={() => this.setState({ gender: "female" })}
                      active={this.state.gender === "female"}
                    >
                      Female
                    </Button>
                    <Button
                      color="success"
                      outline
                      size="sm"
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
          <Col xs={{ size: 6 }} className="mt-4 mb-4">
            <Button
              color="success"
              block
              size="sm"
              outline
              onClick={e => {
                this.showLoading(e);
                this.onGeneralSave(e);
              }}
            >
              {this.state.saving ? "Saving..." : " Save "}{" "}
              <FontAwesomeIcon icon={faSave} />
            </Button>
          </Col>
          <Col xs={6} className="mt-4 mb-4">
            <Button
              color="danger"
              outline
              block
              size="sm"
              onClick={e => {
                this.props.history.push("/");
              }}
            >
              Cancel
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
