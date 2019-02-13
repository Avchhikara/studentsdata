import React from "react";

import { Col, CardBody, Card, CardText, CardTitle, Button } from "reactstrap";
import { fetchURL } from "./../../Actions/constants";
import axios from "axios";

class ExtraFilled extends React.Component {
  componentDidMount() {
    const { props } = this.props;
    // here, make the fetch request to the server
    // Now, first making the constant to be sent

    const send = {
      s_id: props.userData.s_id,
      type: "get",
      token: props.userData.id
    };

    axios.post(`${fetchURL}/extra`, send).then(({ data }) => {
      console.log(data);
    });
  }

  render() {
    return (
      <Col xs={12} className="mb-4">
        <Card>
          <CardBody>
            <CardTitle>
              Filled values
              <Button close onClick={this.props.showFilledValues} />
            </CardTitle>

            <CardText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit vero aperiam nulla quasi sit dicta placeat, omnis
              enim. Blanditiis molestias qui aperiam modi maxime atque magnam
              exercitationem! Quibusdam hic fugiat error dolorum expedita
              accusamus quis, sapiente autem, consequatur quasi molestias
              officia vel quae eius. Nobis, saepe fugiat porro quas libero
              quibusdam perspiciatis nisi voluptate! Distinctio iusto ut quasi
              assumenda eaque nobis laboriosam corporis consequuntur, cumque
              cupiditate accusantium aperiam porro et dolore explicabo animi id
              quas, fugiat mollitia dolor, saepe eius exercitationem expedita.
              Aut dolorum ipsum, neque nihil animi voluptatum sequi.
            </CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default ExtraFilled;
