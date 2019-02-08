import React from "react";
import TandPForm from "./TandPForm";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert,
  FormFeedback
} from "reactstrap";

import { Fade } from "react-reveal";

import setTandPdata from "./../../Actions/tandp";
import "./TandP.css";

class TandP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: this.props.tandpData.year,
      yearText: "Year for which you want to enter t and p data",
      during: this.props.tandpData.during,
      disabled: false,
      message: ""
    };
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  }

  setStateToNull = () => {
    this.setState({ year: "", during: "", disabled: false });
  };

  disableYearAndDuring = () => {
    this.setState({ disabled: true });
  };

  setMessage = message => {
    this.setState({ message });

    setTimeout(() => {
      const alert = document.querySelector("#tandp-form__save");
      alert.style.display = "none";
    }, 3000);
  };

  render() {
    return (
      <div className="tandp-container">
        <Row>
          <Col xs={12}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                Training and Placement data
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col className="h3" xs={12}>
            Enter <span className="green-text">T and P </span>'s data,{" "}
            <span className="green-text hide-on-small h4">
              {this.props.userData ? this.props.userData.email : ""}
            </span>
          </Col>
          <Col xs={12}>
            {this.state.message !== "" ? (
              <Alert id="tandp-form__save" color="success">
                {this.state.message}
              </Alert>
            ) : (
              ""
            )}
          </Col>

          <Col xs={12}>
            <Form>
              <FormGroup row>
                <Label for="year" xs={4}>
                  Select Year
                </Label>
                <Col xs={8}>
                  <Input
                    type="select"
                    name="year"
                    id="year"
                    invalid={this.props.tandpData.year === "" ? true : false}
                    valid={this.props.tandpData.year !== "" ? true : false}
                    value={
                      this.props.tandpData.year === ""
                        ? "--Select Year--"
                        : this.props.tandpData.year
                    }
                    disabled={this.state.disabled}
                    onChange={e => {
                      const val = e.target.value;
                      if (val === "--Select Year--") {
                        // this.setState(() => ({ yearText: "" }));
                      } else {
                        this.setState(() => ({ yearText: "" }));
                        this.setState(() => ({ year: val }));
                        this.props.dispatch(
                          setTandPdata({
                            year: val,
                            during: this.state.during
                          })
                        );
                      }
                    }}
                  >
                    <option defaultValue>--Select Year--</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                  </Input>

                  <FormFeedback>
                    You just need to select a year rest we will do ourself
                  </FormFeedback>

                  <FormFeedback valid>
                    <Fade bottom collapse>
                      Great now, select the time during you worked
                    </Fade>
                  </FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="during" xs={4}>
                  During
                </Label>
                <Col xs={8}>
                  <Input
                    type="select"
                    name="during"
                    id="during"
                    invalid={this.props.tandpData.during !== "" ? false : true}
                    valid={this.props.tandpData.during !== "" ? true : false}
                    value={
                      this.props.tandpData.during === ""
                        ? "--Select Season--"
                        : this.props.tandpData.during
                    }
                    disabled={this.state.disabled}
                    onChange={e => {
                      const during = e.target.value;
                      if (during !== "--Select Season--") {
                        this.setState({ during });

                        this.props.dispatch(
                          setTandPdata({ during, year: this.state.year })
                        );
                      }
                    }}
                  >
                    <option defaultValue>--Select Season--</option>
                    <option value="summer">Summer</option>
                    <option value="winter">Winter</option>
                  </Input>

                  <FormFeedback valid>
                    <Fade bottom collapse>
                      Great, lets us do the rest
                    </Fade>
                  </FormFeedback>
                  <FormFeedback>Please select a season</FormFeedback>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {this.props.tandpData.year !== "" &&
        this.props.tandpData.during !== "" ? (
          <Fade bottom collapse>
            <TandPForm
              clearState={this.setStateToNull}
              disable={this.disableYearAndDuring}
              message={this.setMessage}
            />
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

export default connect(mapStateToProps)(TandP);
