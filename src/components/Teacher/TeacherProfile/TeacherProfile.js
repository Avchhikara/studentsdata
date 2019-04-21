import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Image from "./teacherImage.png";

import "./TeacherProfile.css";

import {
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem
} from "reactstrap";

class TeacherProfile extends React.Component {
  componentWillMount() {
    this.props.user.loggedIn
      ? console.log(this.props.teacher)
      : this.props.history.push("/teacher/login");
  }

  render() {
    return (
      <div className="teacher-profile__container">
        <Row>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/teacher">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>myProfile</BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col xs={12} md={9} lg={7} style={{ margin: "0 auto" }}>
            <Card>
              <CardHeader>Teacher Profile</CardHeader>
              <CardBody>
                <Row>
                  <Col xs={12} sm={5}>
                    <img
                      src={Image}
                      alt="Teacher's profile icon"
                      className="img-thumbnail rounded"
                      style={{ margin: "0 auto !important" }}
                    />
                  </Col>
                  <Col xs={12} sm={7}>
                    <ListGroup>
                      <ListGroupItem>
                        Name:{" "}
                        <span className="green-text">
                          {this.props.user.userData.name}
                        </span>
                      </ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                      <ListGroupItem>
                        Email:{" "}
                        <span className="green-text">
                          {this.props.user.userData.email}
                        </span>
                      </ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                      <ListGroupItem>
                        Department:{" "}
                        <span className="green-text">
                          {this.props.user.userData.department}
                        </span>
                      </ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                      <ListGroupItem>
                        University:{" "}
                        <span className="green-text">
                          {this.props.user.userData.university}
                        </span>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps)(TeacherProfile);
