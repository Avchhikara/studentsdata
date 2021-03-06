import React from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardFooter,
  Spinner
} from "reactstrap";

import "./Notices.css";
const Notices = props => {
  if (props.purpose === "Home") {
    return (
      <Card className="notices-container-card">
        <CardHeader>
          {" "}
          <span className="green-text">Notice</span>(s){" "}
        </CardHeader>
        <CardBody>
          {props.notices[0] ? (
            <CardText>Will be updated soon</CardText>
          ) : (
            <div className="text-center">
              <Spinner color="success" size="sm" /> loading
            </div>
          )}
        </CardBody>
        <CardFooter>
          from <span className="green-text">{props.teacherName}</span>{" "}
        </CardFooter>
      </Card>
    );
  } else {
    return (
      <div className="notice-container">
        <div>
          Here, all the notices will be shown{" "}
          <p>From all over the site i.e. all the teachers</p>
        </div>
      </div>
    );
  }
};
export default Notices;
