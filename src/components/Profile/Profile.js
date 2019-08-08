import React from "react";

import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./Profile.css";

class Profile extends React.Component {
  render() {
    return (
      <div className="profile-container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Profile</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col xs={12}>
            This page will be updated soon, thanks for your wait.
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
