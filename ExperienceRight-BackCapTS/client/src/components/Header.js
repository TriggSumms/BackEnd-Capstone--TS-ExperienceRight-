import React, { useState, useContext, useEffect } from 'react';
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
import { BusinessContext } from "../providers/BusinessProvider";

export default function Header() {
  const { userProfile, isLoggedIn, logout } = useContext(UserProfileContext);
  const {  userBusiness, getBusinessByUserId } = useContext(BusinessContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));




  

//If a user Logs out....we have to adjust this useEffect so that the Login page isnt expecting a sessionUser value
useEffect(() => {
  if (sessionUser != null){
(getBusinessByUserId(sessionUser.id))
  }  

}, []);





  //Tabs for the navBar on landing page go here
  return (
    <div>
      <Navbar color="" light expand="md">
        <NavbarBrand className="navLogo" tag={RRNavLink} to="/">
          <img src="https://res.cloudinary.com/triggsumms/image/upload/c_crop,h_150,w_420/v1604283529/mlrxn3jgv2ckqposszwv.gif" alt="ER Logo" />
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
                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/reviews">ER Reviews</NavLink>
                </NavItem> */}
                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home List</NavLink>
                </NavItem> */}
              </>
            }
            {isLoggedIn && sessionUser.userTypeId === 2 && 
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/reviews">User's Reviews</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/businesses">Businesses Available</NavLink>
                </NavItem>
                <NavItem>
                  {/* <NavLink tag={RRNavLink} to={`/reviews/myreviews/${userzId}`}>My Profile/Reviews</NavLink> */}
                  <NavLink tag={RRNavLink} to={`/reviews/myreviews/${sessionUser.id}`}>My Profile & Reviews</NavLink>
                </NavItem>
              </>
            }
            {isLoggedIn && sessionUser.userTypeId === 1 &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/businesses/details/${userBusiness.id}`}>My Business Profile & Reviews</NavLink>
                  </NavItem>
                {/* <NavItem>
                  <NavLink tag={RRNavLink} to="/reviews">ER Reviews</NavLink>
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
