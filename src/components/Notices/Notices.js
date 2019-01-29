import React from "react";

import "./Notices.css";
const Notices = props => {
  if (props.purpose === "Home") {
    return (
      <div>
        <div>
          <p>This is for the Notices</p> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quo vel quisquam tempora mollitia doloribus
          consequatur, id suscipit praesentium cum quam sequi laborum alias
          laboriosam, nam ipsum repellendus quaerat nostrum cupiditate.
        </div>
      </div>
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
