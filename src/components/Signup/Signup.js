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
import { fetchURL } from "../../Actions/constants";
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

  componentDidMount() {
    //Scrolling to top
    this.scrollToTop();
  }

  onFormSubmit = e => {
    const btn = e.target;
    //Now, disabling the button
    btn.disabled = true;
    btn.textContent = "Please wait...";
    const card = e.target.parentElement.parentElement;
    const form = card.children[1];
    const year = form.children[2].children[1].children[0].value;
    const { email, pass } = this.state;

    if (year !== "--Select--" && email !== "" && pass !== "") {
      axios
        .post(`${fetchURL}/signup`, {
          email,
          pass,
          year
        })
        .then(res => {
          this.setState(() => ({ res: res.data }));
          //enabling the button
          btn.disabled = false;
          btn.textContent = "Sign up";
          this.scrollToTop();
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        res: { status: 400, message: "Please fill all the fields!" }
      });
      btn.disabled = false;
      btn.textContent = "Sign up";
      this.scrollToTop();
    }
  };

  scrollToTop = () => {
    const breadcrumb = document.querySelector(".card-title");
    console.log(breadcrumb);
    if (breadcrumb) {
      breadcrumb.scrollIntoView({ behavior: "smooth" });
    }
  };

  hideAlert() {
    setTimeout(() => {
      this.setState({ res: "" });
    }, 3000);
  }

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
              <CardTitle className="h2 mb-4">
                <span className="green-text">Signup</span> Form
              </CardTitle>

              <Form>
                <FormGroup row>
                  <Label sm={5} md={4} lg={4} xs={4} for="email">
                    Email <span className="red-text">*</span>
                  </Label>
                  <Col sm={7} md={8} lg={8} xs={8}>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={e => {
                        const email = e.target.value.toLowerCase();
                        this.setState(() => ({ email }));
                      }}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label sm={5} md={4} lg={4} xs={4} for="password">
                    Password <span className="red-text">*</span>
                  </Label>
                  <Col sm={7} md={8} lg={8} xs={8}>
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
                  <Label sm={5} md={4} lg={4} xs={4} for="admissionYear">
                    Admission Year <span className="red-text">*</span>
                  </Label>
                  <Col sm={7} md={8} lg={8} xs={8}>
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

              <p className="clearfix" style={{ marginTop: "35px" }}>
                <span className="float-left">
                  Teacher{" "}
                  <Link to="/login">
                    {" "}
                    <FontAwesomeIcon icon={faLock} /> Login
                  </Link>{" "}
                  /{" "}
                  <Link to="/signup">
                    {" "}
                    <FontAwesomeIcon icon={faUserPlus} /> Signup
                  </Link>
                </span>
                <span className="float-right">
                  Alreaday an user ? ,{" "}
                  <Link to="/login">
                    Login <FontAwesomeIcon icon={faLock} />
                  </Link>
                </span>
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Signup;
