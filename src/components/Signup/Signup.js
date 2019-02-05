import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardText,
  CardTitle,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  Alert
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./Signup.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      year: "",
      res: ""
    };
  }

  onFormSubmit = e => {
    const card = e.target.parentElement.parentElement;
    const form = card.children[1];
    const year = form.children[2].children[1].children[0].value;
    const { email, pass } = this.state;

    const fetchURL = "https://studentsdata-api-server.herokuapp.com/signup";

    axios
      .post(fetchURL, {
        email,
        pass,
        year
      })
      .then(res => {
        this.setState(() => ({ res: res.data }));
      })
      .catch(err => console.log(err));

    // const xhr = new XMLHttpRequest();
    // xhr.open(
    //   "GET",
    //   `http://localhost:8888/studentsdata.xyz/signup.php?email=${
    //     this.state.email
    //   }&pass=${this.state.pass}&year=${year}`,
    //   true
    // );

    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const res = JSON.parse(xhr.responseText);
    //     this.setState(() => ({ res }));
    //     setTimeout(() => {
    //       this.setState(() => ({ res: "" }));
    //     }, 3000);
    //   }
    // };
    // xhr.send();
  };

  render() {
    return (
      <div className="signup-container">
        <Row>
          <Col sm="12" md={9} lg={6} xl={6} style={{ margin: "0 auto" }}>
            {this.state.res !== "" ? (
              <Alert
                color={this.state.res.status === 200 ? "success" : "danger"}
              >
                {this.state.res.message}
              </Alert>
            ) : (
              ""
            )}
            <Card body>
              <CardTitle className="h2">
                <span className="green-text">Signup</span> Form
              </CardTitle>

              <Form>
                <FormGroup row>
                  <Label sm={5} md={4} lg={4} for="email">
                    Email
                  </Label>
                  <Col sm={7} md={8} lg={8}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={e => {
                        const email = e.target.value;
                        this.setState(() => ({ email }));
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={5} md={4} lg={4} for="password">
                    Password
                  </Label>
                  <Col sm={7} md={8} lg={8}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.pass}
                      onChange={e => {
                        const pass = e.target.value;
                        this.setState(() => ({ pass }));
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={5} md={4} lg={4} for="admissionYear">
                    Admission Year
                  </Label>
                  <Col sm={7} md={8} lg={8}>
                    <Input
                      type="select"
                      name="admissionYear"
                      id="admissionYear"
                    >
                      <option defaultValue>--Select--</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                    </Input>
                    <FormText color="muted">
                      Please fill year carefully. It cannot be modified later.
                    </FormText>
                  </Col>
                </FormGroup>
              </Form>

              <CardText>
                <Button color="success" onClick={this.onFormSubmit}>
                  <FontAwesomeIcon icon={faUserPlus} /> Sign up
                </Button>
              </CardText>
              <p style={{ textAlign: "right" }}>
                Alreaday an user ? ,{" "}
                <Link to="/login">
                  Login <FontAwesomeIcon icon={faLock} />
                </Link>
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Signup;