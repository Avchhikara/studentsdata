import React from "react";
import { connect } from "react-redux";
import "./Teacher.css";
import axios from "axios";
import { fetchURL } from "./../../Actions/constants";

import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Row,
  Spinner,
  Button,
  Card,
  CardTitle,
  CardBody
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandPointDown,
  faPlus,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

class Teacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: {
        status: "",
        message: ""
      },
      classes: [],
      showClassLoader: true,
      search: {
        show: false,
        terms: ""
      }
    };
  }

  componentWillMount() {
    if (!(this.props.user.loggedIn && this.props.user.teacher)) {
      this.props.history.push("/teacher/login");
    }
  }

  render() {
    return (
      <div className="teacher-container">
        <Breadcrumb>
          <BreadcrumbItem active>Home</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col xs={12} className="h5 clearfix">
            <span className="float-left">
              Your{" "}
              <span className="green-text">
                classes <FontAwesomeIcon icon={faHandPointDown} />
              </span>
            </span>
            <span className="float-right">
              <Button size="sm" color="success" className="mr-2">
                Add new <FontAwesomeIcon icon={faPlus} />{" "}
              </Button>
              <Button size="sm" color="success">
                <FontAwesomeIcon icon={faSearch} />{" "}
              </Button>
            </span>
          </Col>
          {this.showClassLoader ? (
            <Col xs={12}>
              <div className="teacher__spinner">
                <Spinner color="success" />
                <br />
                Fetching your class(s)
              </div>
            </Col>
          ) : (
            ""
          )}
          <Col xs={12} />
        </Row>
      </div>
    );
  }
}

const getClasses = () => {
  //First, making a post request to get the classes
  const { userData } = this.props.user;
  let out = "unchaged";
  if (userData.t_id) {
    axios.post(`${fetchURL}/teacher/classes`, userData).then(({ data }) => {
      if (data[0]) {
        //Now, if any of the entry exist
        console.log("Data Exist");
      } else {
        out = (
          <Card>
            <CardTitle>
              It seems that you haven't added any class of yours, click here to
              add
            </CardTitle>
          </Card>
        );
      }
      //Removing the class loader
      this.setState({ showClassLoader: false });
    });
    console.log(out);
    return out;
  }
};

const mapStateToProps = state => {
  return {
    ...state
  };
};

export default connect(mapStateToProps)(Teacher);
