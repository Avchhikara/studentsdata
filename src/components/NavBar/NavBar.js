import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import { fetchURL } from "./../../Actions/constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faNewspaper,
  faUser,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faChalkboardTeacher
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

import Logo from "../../img/Screen Shot 2019-01-23 at 6.53.41 PM.png";

import onLogOut from "./../../Actions/Logout";

import "./NavBar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.navbar = React.createRef();

    this.toggleNavbar = this.toggleNavbar.bind(this);

    //Scrolling effect to user
    window.onscroll = this.showNavAnimation;
  }

  showNavAnimation(e) {
    const scrollPos = window.scrollY;
    if (scrollPos < 200) {
      const header = document.querySelector("#header");
      const headImg1 = document.querySelector("#head-img-1");
      const navToggler = document.querySelector("#nav-toggler");
      const navBtn = document.querySelector("#nav-btn");
      const navTogglerIcon = navToggler.children[0];
      const navCollapseContent = document.querySelector(".navbar .show");
      const navLink = document.querySelectorAll(".nav-link");

      //Do not scroll when navbar is open
      if (!navCollapseContent) {
        let height = 76;
        let Img1Height = 40;
        let navBtnHeight = 40;
        let navTogglerHeight = 36;
        let navTogglerIconHeight = 30;

        //changing height of header
        header.style.height =
          (
            height -
            (parseInt(scrollPos / 10) !== 0 ? parseInt(scrollPos / 10) : 1)
          ).toString() + "px";
        //Changing height of image 1
        headImg1.style.height =
          (
            Img1Height -
            (parseInt(scrollPos / 40) !== 0 ? parseInt(scrollPos / 40) : 1)
          ).toString() + "px";

        //Changing height of button
        navBtn.style.height =
          (
            navBtnHeight -
            (parseInt(scrollPos / 36) !== 0 ? parseInt(scrollPos / 36) : 1)
          ).toString() + "px";
        navBtn.style.fontSize =
          (
            16 -
            (parseInt(scrollPos / (36 * 4)) !== 0
              ? parseInt(scrollPos / (36 * 4))
              : 1)
          ).toString() + "px";
        navBtn.style.lineHeight =
          16 -
          (parseInt(scrollPos / (36 * 4)) !== 0
            ? parseInt(scrollPos / (36 * 4))
            : 1
          ).toString() +
          "px";

        //Changing the navbar toggler
        navToggler.style.height =
          navTogglerHeight -
          (parseInt(scrollPos / (36 * 4)) !== 0
            ? parseInt(scrollPos / (36 * 4))
            : 1
          ).toString() +
          "px";

        navTogglerIcon.style.height =
          navTogglerIconHeight -
          (parseInt(scrollPos / (36 * 4)) !== 0
            ? parseInt(scrollPos / (36 * 4))
            : 1
          ).toString() +
          "px";
      }

      //Changing the navLink
      navLink.forEach(link => {
        link.style.height =
          40 -
          (parseInt(scrollPos / 36) !== 0
            ? parseInt(scrollPos / 36)
            : 1
          ).toString() +
          "px";

        link.style.lineHeight =
          20 -
          (parseInt(scrollPos / 36) !== 0
            ? parseInt(scrollPos / 36)
            : 1
          ).toString() +
          "px";
      });

      //Changing each of the navItem

      // console.log(
      //   parseInt(scrollPos / 10),
      //   height / (scrollPos / 10 !== 0 ? parseInt(scrollPos / 10) : 1)
      // );
    }
  }

  toggleNavbar() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  openNav = () => {
    const header = document.querySelector("#nav-bottom");
    console.log();
    if (this.state.isOpen && document.body.clientWidth <= 776) {
      header.style.marginBottom = "0px";
    } else if (document.body.clientWidth <= 776) {
      header.style.marginBottom = "235px";
    }

    this.toggleNavbar();
  };

  openProfile = e => {
    if (!this.props.user.teacher) {
      //Now, opening the window
      window.open(
        `${fetchURL}/profile?s_id=${this.props.student.userData.s_id}&token=${
          this.props.student.userData.id
        }`
      );
    } else {
      this.props.history.push("/teacher/profile");
      this.openNav();
    }
  };

  render() {
    const { loggedIn, teacher } = this.props.user;
    // console.log(this.props.match);
    return (
      <div
        onClick={() => {
          let height = "76px";
          let Img1Height = "40px";
          let navBtnHeight = "40px";
          let navTogglerHeight = "36px";
          let navTogglerIconHeight = "30px";

          const headImg1 = document.querySelector("#head-img-1");
          const navToggler = document.querySelector("#nav-toggler");
          const navBtn = document.querySelector("#nav-btn");
          const navTogglerIcon = navToggler.children[0];
          const navLink = document.querySelectorAll(".nav-link");

          document.querySelector("#header").style.height = height;
          headImg1.style.height = Img1Height;
          navToggler.style.height = navTogglerHeight;
          navBtn.style.height = navBtnHeight;
          navTogglerIcon.style.height = navTogglerIconHeight;
          navLink.forEach(link => {
            link.style.lineHeight = "20px";
            link.style.height = "40px";
          });
        }}
      >
        <Navbar color="light" light expand="md" id="header">
          <NavbarBrand href="/" className="nav-brand">
            <img
              src={Logo}
              alt="Main Logo"
              className="nav-img"
              id="head-img-1"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.openNav} id="nav-toggler" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                {teacher ? (
                  <Link to="/teacher/requests" className="nav-link">
                    Requests{" "}
                    {this.props.teacher.requests.length > 0 ? (
                      <span className="handmade-badge">
                        {" "}
                        {this.props.teacher.requests.length}
                      </span>
                    ) : (
                      ""
                    )}
                  </Link>
                ) : loggedIn ? (
                  <Link
                    to="/notices"
                    className="nav-link"
                    onClick={this.openNav}
                  >
                    <FontAwesomeIcon icon={faNewspaper} />
                    {" Notices"}
                  </Link>
                ) : (
                  <Link
                    to="/teacher/login"
                    className="nav-link"
                    onClick={this.openNav}
                  >
                    <FontAwesomeIcon icon={faChalkboardTeacher} /> {"  "} For
                    Teachers
                  </Link>
                )}
              </NavItem>
              <NavItem>
                {this.props.user.loggedIn ? (
                  <a href="#!" className="nav-link" onClick={this.openProfile}>
                    <span>
                      <FontAwesomeIcon icon={faUser} />
                      {" my Profile"}
                    </span>
                  </a>
                ) : (
                  <NavLink href="/login">
                    <span>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      {" Login"}
                    </span>
                  </NavLink>
                )}
              </NavItem>

              <NavItem className="nav-elements">
                {this.props.user.loggedIn ? (
                  <Button
                    color="success"
                    id="nav-btn"
                    className="add-article__btn"
                    onClick={e => {
                      //First, deleting the cookies
                      document.cookie = "studentdata=''";

                      this.props.dispatch(
                        onLogOut({ loggedIn: false, teacher: false })
                      );
                      if (this.props.user.teacher) {
                        this.props.history.push("/teacher/login");
                      } else {
                        this.props.history.push("/login");
                      }
                      this.openNav(e);
                    }}
                  >
                    <span>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      {" Logout"}
                    </span>
                  </Button>
                ) : (
                  <Button
                    color="success"
                    id="nav-btn"
                    className="add-article__btn"
                    onClick={e => {
                      //Moving user to sign in page
                      this.props.history.push("/signup");
                      this.openNav(e);
                    }}
                  >
                    <span>
                      <FontAwesomeIcon icon={faUserPlus} />
                      {" Sign up"}
                    </span>
                  </Button>
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div id="nav-bottom" />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const loggedIn = state.loggedIn;
  return {
    loggedIn,
    ...state
  };
};

export default connect(mapStateToProps)(NavBar);
