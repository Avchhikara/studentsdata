import React from "react";
import { Jumbotron, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = props => {
  return (
    <div className="footer-container">
      <Jumbotron>
        <Row>
          <Col sm={3} xs={6}>
            <h5 className="quick">Quick Links</h5>
            <ul>
              <li>
                <Link to="/contact">Contact us</Link>
              </li>

              <li>
                <a href="https://github.com/Avchhikara/studentsdata">
                  Contribute
                </a>
              </li>
              <li>
                <Link to="/notices">Notices</Link>
              </li>
              <li>
                <Link to="/report">Report an error</Link>
              </li>
            </ul>
          </Col>
          <Col sm={3} xs={6} style={{ textAlign: "center" }}>
            <h5 className="contributors">Contributors</h5>
            <ul>
              <li>
                <a href="https://github.com/avchhikara">Avnish</a>
              </li>
              <li>
                <a href="https://github.com/Avchhikara/studentsdata">
                  Want your name here?
                </a>
              </li>
            </ul>
          </Col>
          <Col sm={6}>
            <h5>
              About <span className="green-text">us</span>
            </h5>
            <p>
              <a href="https://studentsdata.xyz">StudentsData.xyz</a> is
              developed to solve the problem of deficiency of student's data,
              faced by university department. It store data of each student and
              share it with the respective class-coordinator whenever they need
              it whether it's for GP, any placement related work or they want to
              contact them for the any alumni interaction.
            </p>
          </Col>

          <Col sm={12} style={{ textAlign: "center" }}>
            <hr />
            &copy; <Link to="/">StudentsData.xyz</Link> 2019 | All rights
            reserved
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default Footer;
