import React from "react";

import { Breadcrumb, BreadcrumbItem } from "reactstrap";
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
        <div>
          This is the profile page for user {this.props.match.params.id}
          <br />
          Is in constructions. Your patience is highly appreciated !
        </div>
      </div>
    );
  }
}

export default Profile;
