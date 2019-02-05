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
      pno: ""
    };
  }

  componentWillMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  }

  componentDidMount = () => {
    //Now, here request the users data from backend
    const { name, rno, mname, fname, gender, address, pno } = this.state;
    const fetchURL = "https://studentsdata-api-server.herokuapp.com/general";
    axios
      .post(fetchURL, {
        name,
        fname,
        mname,
        gender,
        address,
        pno: parseInt(pno),
        rno: parseInt(rno),
        type: "get",
        s_id: this.props.userData ? this.props.userData.s_id : "",
        id: this.props.userData ? this.props.userData.id : ""
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
            gender: data.user.gender
          }));
        }
        //Now, calling the autosave callback
        const timeoutID = setTimeout(() => {
          this.autoSave();
        }, 5000);
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
    if (
      this.props.history.location.pathname === "/general" &&
      this.props.loggedIn
    ) {
      const Message = () => (
        <div className="green-text">Data is saved automatically!</div>
      );

      //Everything regarding autosaving
      //First, make a request to backend,
      const fetchURL = "https://studentsdata-api-server.herokuapp.com/general";
      const { name, rno, mname, fname, gender, address, pno } = this.state;
      axios
        .post(fetchURL, {
          name,
          fname,
          mname,
          gender,
          address,
          pno: parseInt(pno),
          rno: parseInt(rno),
          type: "set",
          s_id: this.props.userData ? this.props.userData.s_id : "",
          id: this.props.userData ? this.props.userData.id : ""
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
            this.props.loggedIn
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
      this.props.loggedIn
    ) {
      setTimeout(() => {
        this.autoSave();
      }, 15000);
    }
  };

  onGeneralSave(e) {
    //Now, saving by clicking
    const fetchURL = "https://studentsdata-api-server.herokuapp.com/general";
    const { name, rno, mname, fname, gender, address, pno } = this.state;
    axios
      .post(fetchURL, {
        name,
        fname,
        mname,
        gender,
        address,
        pno: parseInt(pno),
        rno: parseInt(rno),
        type: "set",
        s_id: this.props.userData ? this.props.userData.s_id : "",
        id: this.props.userData ? this.props.userData.id : ""
      })
      .then(({ data }) => {
        if (data.status === 200) {
          //dispatching changes to store
          this.props.dispatch(fetchGeneralData(this.state));
        }
      })
      .catch(err => console.log(err));

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
    //       //dispatching changes to store
    //       this.props.dispatch(fetchGeneralData(this.state));
    //     }
    //   }
    // };
    // xhr.send();

    //Now, showing message and all that stuff
    const btn = e.target;
    btn.innerHTML = `
Save <i class="fas fa-save></i>
`;
    btn.disabled = false;
  }

  render() {
    if (!this.props.loggedIn) {
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
