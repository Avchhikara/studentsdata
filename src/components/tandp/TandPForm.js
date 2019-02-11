import React from "react";
import { connect } from "react-redux";
import {
  Button,
  Input,
  Form,
  FormGroup,
  FormText,
  Label,
  Col,
  Alert,
  Spinner,
  Row
} from "reactstrap";
import { faHandPointDown, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import setTandPdata from "./../../Actions/tandp";
import { Fade } from "react-reveal";

import { fetchURL } from "../../Actions/constants";

class TandPForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iname: this.props.tandpData.iname ? this.props.tandpData.iname : "",
      iaddress: this.props.tandpData.iaddress
        ? this.props.tandpData.iaddress
        : "",

      ilinks: this.props.tandpData.ilinks ? this.props.tandpData.ilinks : [],
      timeoutid: [],
      saved: "no",
      showFetchAlert: true
    };
  }
  componentDidMount() {
    //Disabling the year and during feilds
    this.props.disable();

    //Here fetch the value of that particluar year user has entered
    //Fetching the values from server
    axios
      .post(`${fetchURL}/tandp`, {
        iname: this.state.iname,
        iaddress: this.state.iaddress,
        year: this.props.tandpData.year,
        ilinks: this.state.ilinks.join(","),
        s_id: this.props.userData.s_id,
        during: this.props.tandpData.during,
        id: this.props.userData.id,
        type: "get"
      })
      .then(res => {
        console.log(res);
        const { data } = res;
        //Setting the state
        this.setState({
          iname: data.iname,
          iaddress: data.iaddress,
          ilinks: data.ilinks.split(","),
          saved: "yes"
        });

        this.props.dispatch(
          setTandPdata({ ...data, ilinks: data.ilinks.split(",") })
        );
        //Hiding the fetch alert
        // const fetchAlert = document.querySelector("#tandp-form__alert");
        // fetchAlert.style.display = "none";
        this.setState({ showFetchAlert: false });
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    //Here check if the user has unsaved values and prompt the user to save values first before closing the compoenet
    if (this.state.saved === "no") {
      //Showing an alert to user
      alert(
        "You haven't saved the data so, it will be lost. To save, press the 'save' button after entering the data"
      );
    }
  }

  onClickSave = e => {
    axios
      .post(`${fetchURL}/tandp`, {
        iname: this.state.iname,
        iaddress: this.state.iaddress,
        year: this.props.tandpData.year,
        ilinks: this.state.ilinks.join(","),
        s_id: this.props.userData.s_id,
        during: this.props.tandpData.during,
        id: this.props.userData.id,
        type: "set"
      })
      .then(res => {
        //Now, dispatching it to the state
        this.props.dispatch(
          setTandPdata({
            iname: this.state.iname,
            iaddress: this.state.iaddress,
            year: this.props.tandpData.year,
            ilinks: this.state.ilinks,
            during: this.props.tandpData.during
          })
        );
        //Now, updating state
        this.setState({ saved: "yes" });
        //Now, removing the component
        this.props.message("Entries have been saved");
        this.props.clearState();
        this.props.dispatch(setTandPdata({ year: "", during: "" }));
      })
      .catch(err => console.log(err));
    e.target.disabled = false;
    e.target.innerHTML = `
          Save
        `;
  };

  render() {
    return (
      <div>
        <hr />
        <h5>
          Fill out{" "}
          <span className="green-text">
            {" "}
            this <FontAwesomeIcon icon={faHandPointDown} />{" "}
          </span>
          form
        </h5>{" "}
        <Fade opposite collapse when={this.state.showFetchAlert}>
          <Alert color="success" id="tandp-form__alert">
            <Spinner color="dark" size="sm" /> Fetching previous values from
            storage, if any
          </Alert>
        </Fade>
        <br />
        <Form>
          <FormGroup row>
            <Label for="iname" xs={3}>
              Institution Name
            </Label>
            <Col xs={9}>
              <Input
                type="text"
                name="iname"
                id="iname"
                value={this.state.iname}
                onChange={e => {
                  const iname = e.target.value;
                  this.setState({ iname, saved: "no" });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="iadd" xs={3}>
              Institution Add.
            </Label>
            <Col xs={9}>
              <Input
                type="textarea"
                name="iadd"
                id="iadd"
                value={this.state.iaddress}
                onChange={e => {
                  const iaddress = e.target.value;
                  this.setState({ iaddress, saved: "no" });
                }}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="ilinks" xs={3}>
              Addtional links
            </Label>
            <Col xs={9}>
              <Input
                type="textarea"
                name="ilinks"
                id="ilinks"
                value={this.state.ilinks.join(",")}
                onChange={e => {
                  const ilinks = e.target.value.split(",");
                  this.setState(prevState => {
                    return {
                      ilinks,
                      saved: "no"
                    };
                  });
                }}
              />
              <FormText color="muted">
                Add links seperated by comma(",") These could be of your
                certificates stored in google drive or something of that sort.
                It is not required.{" "}
              </FormText>
            </Col>
          </FormGroup>
        </Form>
        <Row>
          <Col xs={6}>
            <Button
              color="success"
              outline
              block
              size="sm"
              onClick={e => {
                e.target.disabled = true;
                e.target.innerHTML = `
              <span>Saving...</span>
              <span class="clearfix">
              <span class="spinner-border spinner-border-sm float-right" role="status">
              <span class="sr-only">Loading...</span>
            </span>
            </span>
            `;
                this.onClickSave(e);
              }}
            >
              Save <FontAwesomeIcon icon={faSave} />
            </Button>
          </Col>

          <Col xs={6}>
            <Button
              color="danger"
              block
              outline
              size="sm"
              onClick={e => {
                this.props.clearState();
                this.props.dispatch(setTandPdata({ year: "", during: "" }));
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
        <br />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(TandPForm);
