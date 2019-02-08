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
  FormFeedback
} from "reactstrap";

import { Fade } from "react-reveal";

import "./TandP.css";

class TandP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      yearText: "Year for which you want to enter t and p data"
    };
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.history.push("/login");
    }
  }

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
                    invalid={this.state.year === "invalid" ? true : false}
                    valid={
                      this.state.year !== "" && this.state.year !== "invalid"
                        ? true
                        : false
                    }
                    onChange={e => {
                      const val = e.target.value;
                      if (val === "--Select Year--") {
                        this.setState(() => ({ yearText: "" }));
                        this.setState(() => ({ year: "invalid" }));
                      } else {
                        this.setState(() => ({ yearText: "" }));
                        this.setState(() => ({ year: val }));
                      }
                    }}
                  >
                    <option defaultValue>--Select Year--</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                  </Input>
                  {this.state.yearText !== "" ? (
                    <FormText color="muted">{this.state.yearText}</FormText>
                  ) : (
                    ""
                  )}
                  <FormFeedback>
                    You just need to select a year rest we will do ourself
                  </FormFeedback>

                  <FormFeedback valid>
                    <Fade bottom collapse>
                      Great now, let us fetch some data for you
                    </Fade>
                  </FormFeedback>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        {this.state.year !== "" && this.state.year !== "invalid" ? (
          <Fade bottom collapse>
            <TandPForm year={this.state.year} />
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
