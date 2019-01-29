import React from "react";
import { Link } from "react-router-dom";

import Logo from "./../../img/favicon.png";
import "./NotFound.css";

const NotFound = props => {
  return (
    <div className="notfound-container">
      <img src={Logo} alt="Not Found" className="rounded mx-auto" />
      <p>
        Oh, <span className="green-text">snap !</span>
      </p>
      <p>
        Page you requested is <span className="green-text">not found</span>!!
      </p>
      <p>
        <Link to="/">Go to homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
