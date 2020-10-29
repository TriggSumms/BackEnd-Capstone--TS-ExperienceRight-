import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,

} from 'reactstrap';
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Header() {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  //Tabs for the navBar on landing page go here
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand className="navLogo" tag={RRNavLink} to="/">
          <img src="" alt="ER Logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
            }
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/reviews">Review LIST</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home List</NavLink>
                </NavItem> */}
              </>
            }
            {isLoggedIn && sessionUser.userTypeId === 2 && 
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/businesses">Businesses</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/reviews/myreviews/${sessionUser.id}`}>My Reviews</NavLink>
                </NavItem>
              </>
            }
            {isLoggedIn && sessionUser.userTypeId === 1 &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/businesses/details/${sessionUser.id}`}>My Business Profile</NavLink>
                  </NavItem>
                  {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/users">BUIZ USER TEST</NavLink>
                </NavItem> */}

              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}>Logout
                  </a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/customerRegister">Register as Consumer</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/businessRegister">Register as Business</NavLink>
                </NavItem> */}
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
