import React from "react";
import { connect } from "react-redux";
import {
  Form,
  Label,
  FormGroup,
  Row,
  Col,
  Input,
  Button,
  Alert
} from "reactstrap";
import {
  faHandPointDown,
  faTimes,
  faCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { fetchURL } from "./../../Actions/constants";
class ExtraForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ename: "",
      einstitution: "",
      eachievement: "nothing",
      res: {
        status: "",
        message: ""
      },
      saved: true
    };
  }

  componentWillUnmount() {
    if (!this.state.saved) {
      alert(
        "Values you provided have not been saved and will be lost so, please enter them again!"
      );
    }
  }

  componentDidMount() {
    //Scrolling the form into view
    this.scrollToView();
  }

  onClickSave = e => {
    //Getting the target
    const target = e.target;
    target.disabled = true;
    target.textContent = "Adding...";

    //Making request to server
    const { ename, einstitution, eachievement } = this.state;
    if (ename !== "" && einstitution !== "") {
      const send = {
        ename,
        einstitution,
        eachievement,
        token: this.props.user.userData.id,
        s_id: this.props.user.userData.s_id,
        esemester: this.props.student.extraData.esemester,
        type: "set"
      };

      axios
        .post(`${fetchURL}/extra`, send)
        .then(({ data }) => {
          //Now, seting up the response
          this.setState({
            ename: "",
            einstitution: "",
            eachievement: "",
            res: {
              status: data.status,
              message: data.message
            },
            saved: true
          });
          //Enabling the target
          target.disabled = false;
          target.textContent = "Add";
          this.scrollToView();
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        res: {
          status: 404,
          message: "Please fill all the values"
        }
      });

      //Enabling the target
      target.disabled = false;
      target.textContent = "Add";
      setTimeout(() => {
        this.setState({ res: { status: "", message: "" } });
      }, 3000);
    }
  };

  scrollToView = (ele = "#extra__form") => {
    const breadcrumb = document.querySelector(ele);
    if (breadcrumb) {
      breadcrumb.scrollIntoView({ behavior: "smooth" });
    }
  };

  render() {
    return (
      <Row className="extra-form">
        <Col xs={12} className="clearfix">
          <hr />
          <span className="float-left h5" id="extra__form">
            Fill out{" "}
            <span className="green-text">
              this <FontAwesomeIcon icon={faHandPointDown} />{" "}
            </span>{" "}
            form
          </span>
          <span className="float-right">
            <Button
              id="saveButtonIcon"
              color="success"
              size="sm"
              onClick={e => {
                this.onClickSave(e);
              }}
              outline
              style={{ marginRight: "10px" }}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button
              color="danger"
              id="closeButtonIcon"
              size="sm"
              outline
              onClick={this.props.onPressCancel}
            >
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </span>
        </Col>
        {this.state.res.status !== "" && this.state.res.message !== "" ? (
          <Col xs={12}>
            <Alert color={this.state.res.status === 404 ? "danger" : "success"}>
              {this.state.res.message}
            </Alert>
          </Col>
        ) : (
          ""
        )}

        <Col xs={12}>
          <Form>
            <FormGroup row>
              <Label for="ename" xs={3}>
                Activity name
              </Label>
              <Col xs={9}>
                <Input
                  type="text"
                  name="ename"
                  id="ename"
                  value={this.state.ename}
                  onChange={e => {
                    const val = e.target.value;
                    this.setState({ ename: val, saved: val.length === 0 });
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="einstitution" xs={3}>
                Institution
              </Label>
              <Col xs={9}>
                <Input
                  type="text"
                  name="einstitution"
                  id="einstitution"
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
              <Label for="eachievement" xs={3}>
                Achievement
              </Label>
              <Col xs={9}>
                <Input
                  type="select"
                  name="eachievement"
                  id="eachievement"
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
          </Form>
        </Col>
        <Col xs={6}>
          <Button
            color="success"
            size="sm"
            outline
            block
            onClick={e => {
              //Now, saving the filled values
              this.onClickSave(e);
              // this.scrollToView();
            }}
          >
            Add
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            color="danger"
            size="sm"
            outline
            block
            onClick={this.props.onPressCancel}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = state => {
  return {
    ...state
  };
};
export default connect(mapStateToProps)(ExtraForm);
