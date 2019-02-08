import React from "react";

import {
  Button,
  Input,
  Form,
  FormGroup,
  FormText,
  Label,
  Col,
  Alert,
  Spinner
} from "reactstrap";
import { faHandPointDown, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TandPForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      institution: "",
      address: "",
      year: this.props.year,
      links: [],
      timeoutid: []
    };
  }
  componentDidMount() {
    //Here fetch the value of that particluar year user has entered
    const fetchAlert = document.querySelector("#tandp-alert");
    setTimeout(() => (fetchAlert.style.display = "none"), 3000);
  }

  componentWillMount() {
    //Here check if the user has unsaved values and prompt the user to save values first before closing the compoenet
  }

  onClickSave = e => {
    console.log("on click save is clicked");
  };

  render() {
    console.log(this.props.year);
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
        <Alert color="success" id="tandp-alert">
          <Spinner color="dark" size="sm" /> Fetching previous values from
          server if any
        </Alert>
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
                value={this.state.institution}
                onChange={e => {
                  this.setState({ institution: e.target.value });
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
                value={this.state.address}
                onChange={e => this.setState({ address: e.target.address })}
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
                value={this.state.links.join(",")}
                onChange={e => {
                  const links = e.target.value.split(",");
                  this.setState(prevState => {
                    return {
                      links
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
        <Button
          color="success"
          outline
          block
          onClick={e => {
            this.onClickSave(e);
          }}
        >
          Save <FontAwesomeIcon icon={faSave} />
        </Button>
        <br />
      </div>
    );
  }
}

export default TandPForm;
