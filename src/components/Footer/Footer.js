import React from "react";
import { Jumbotron, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = props => {
  return (
    <div className="footer-container">
      <Jumbotron>
        <Row>
          <Col sm={4} lg={4} md={4}>
            <h5 className="quick">Quick Links</h5>
            <ul>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>

              <li>
                <Link to="/contribute">Contribute</Link>
              </li>
              <li>
                <Link to="/notices">Notices</Link>
              </li>
              <li>
                <Link to="/report">Report an error</Link>
              </li>
            </ul>
          </Col>
          <Col sm={8} lg={8}>
            <h5>
              About <span className="green-text">us</span>
            </h5>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel
              quidem corrupti neque dignissimos minima veniam eos provident
              ducimus quo ab!
            </p>
          </Col>

          <Col sm={12} style={{ textAlign: "center" }}>
            <hr />
            &copy; <Link to="/">StudentsData.xyz</Link> 2019 | A small
            contribution from{" "}
            <a href="https://www.github.com/avchhikara">Avnish</a>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default Footer;
