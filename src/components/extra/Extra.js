import React from "react";
import ExtraForm from "./ExtraForm";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";
import { Fade } from "react-reveal";

import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";

import "./Extra.css";
import setExtraData from "../../Actions/Extra";
import ExtraFilled from "./ExtraFilled";

class Extra extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilledValues: false,
      esem: ""
    };
  }

  onPressCancel = () => {
    this.setState({
      esem: ""
    });
    //Also, make extraData props to null
    this.props.dispatch(setExtraData({}));
  };

  componentDidMount() {
    //fetch some values here
  }

  componentWillMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  }

  showFilledValues = e => {
    // alert(
    //   "This feature is currently being worked upon. You will be emailed once it's available"
    // );

    // First, Modifying the state
    this.setState(prevState => ({
      showFilledValues: !prevState.showFilledValues
    }));
  };

  render() {
    return (
      <div className="extra-container">
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Extra Curricular Activies</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {this.state.showFilledValues ? (
              <Fade>
                <ExtraFilled
                  props={this.props}
                  showFilledValues={this.showFilledValues}
                />
              </Fade>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12} className="clearfix">
            <span className="h4 float-left">
              Enter{" "}
              <span className="green-text">
                Activites <FontAwesomeIcon icon={faHandPointDown} />
              </span>
            </span>
            <span className="float-right">
              <Button
                color="success"
                outline
                size="sm"
                onClick={e => {
                  //First, Add instances of components with filled values
                  //Then change state to change text
                  //   console.log("Show filled values is clicked");
                  this.showFilledValues(e);
                }}
              >
                {this.state.showFilledValues
                  ? "Hide filled values"
                  : "Show filled values"}
              </Button>
            </span>
          </Col>
          <Col xs={12}>
            <Form>
              <FormGroup row>
                <Label for="esem" xs={3}>
                  Semester
                </Label>
                <Col xs={9}>
                  <Input
                    type="select"
                    id="esem"
                    name="esem"
                    invalid={this.state.esem === "" ? true : false}
                    valid={this.state.esem !== "" ? true : false}
                    disabled={this.state.esem !== "" ? true : false}
                    value={
                      this.state.esem === ""
                        ? "--Select Sem--"
                        : this.state.esem
                    }
                    onChange={e => {
                      const val = e.target.value;
                      if (val !== "--Select Sem--") {
                        this.setState({ esem: val });
                        this.props.dispatch(setExtraData({ esemester: val }));
                      } else {
                        this.setState({ esem: "" });
                      }
                    }}
                  >
                    <option defaultValue>--Select Sem--</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                    <option value="6">6th</option>
                    <option value="7">7th</option>
                    <option value="8">8th</option>
                  </Input>
                  <FormFeedback> Please select a semester</FormFeedback>
                  <FormFeedback valid>
                    Great! let us do the rest, To enable this field press
                    'Cancel' button below
                  </FormFeedback>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {this.state.esem !== "" ? (
          <Fade bottom>
            <ExtraForm onPressCancel={this.onPressCancel} />
          </Fade>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(Extra);
