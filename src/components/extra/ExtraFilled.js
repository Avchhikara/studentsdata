import React from "react";

import ExtraFilledForm from "./ExtraFilledForm";

import { Col, CardBody, Card, CardTitle, Button, Spinner } from "reactstrap";
import { fetchURL } from "./../../Actions/constants";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons";

class ExtraFilled extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filledValues: []
    };
  }
  componentDidMount() {
    const { props } = this.props;
    // here, make the fetch request to the server
    // Now, first making the constant to be sent

    const send = {
      s_id: props.user.userData.s_id,
      type: "get",
      token: props.user.userData.id
    };

    axios.post(`${fetchURL}/extra`, send).then(({ data }) => {
      console.log(data);
      //Setting up state values
      this.setState({ filledValues: data });
    });
  }

  render() {
    return (
      <Col xs={12} className="mb-4">
        <Card>
          <CardBody>
            <CardTitle className="h4">
              {this.state.filledValues[0] ? (
                <span>
                  <span className="green-text">Filled</span> values{" "}
                  <FontAwesomeIcon icon={faHandPointDown} />
                </span>
              ) : (
                <span className="green-text">Fetching ...</span>
              )}
              <Button close onClick={this.props.showFilledValues} />
            </CardTitle>

            <div>
              {this.state.filledValues[0] ? (
                <div>
                  {this.state.filledValues.map((value, index) => (
                    <ExtraFilledForm
                      key={index}
                      value={value}
                      showFilledValues={this.props.showFilledValues}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    width: "80vw",
                    lineHeight: "40vh",
                    textAlign: "center"
                  }}
                >
                  <Spinner size="lg" color="success" />
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ExtraFilled;
