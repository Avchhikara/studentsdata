import React from "react";

import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import "./Extra.css";

class Extra extends React.Component {
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
      </div>
    );
  }
}

export default Extra;
