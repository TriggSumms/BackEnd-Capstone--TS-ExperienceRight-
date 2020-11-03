import React, { useState, useContext, useEffect } from "react";
import {Button } from "reactstrap";
import {  Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { BusinessContext } from "../providers/BusinessProvider";
import "./Hello.scss";

export default function HelloBusiness() {
  const { userProfile, getUserId, getUserProfile } = useContext(UserProfileContext);
  const {  userBusiness, getBusinessById, getBusinessByUserId } = useContext(BusinessContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  console.log("hello", userProfile);
  


let userId = sessionUser.id;

  useEffect(() => {
    getBusinessByUserId(userId)  
}, []);

console.log("test", userBusiness.id)


  return (

    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-3.5rem",
      textAlign: "center",
      fontSize: "12px",
    }}>

<div class="splash">
  <div class="splash_logo">
 <img class="movethePic" src="https://res.cloudinary.com/triggsumms/image/upload/v1604285119/kfm7cqjg5hh5o3fcdwlb.gif" alt="ER Logo" />

  </div>
  <div class="splash_svg">
  </div>
  <div class="splash_minimize">
  </div>
</div>
<div class="text">
  <p> Hello {sessionUser.fullName} ! Welcome to Experience Right. As a user and pridefull Business Owner, you have agreed on creating transparency between your consumers and your business. Kudos, Experience Right is here to assist with fostering that connection! </p>
    <p> Heres the deal,</p>
  <p> Feel Free to read your reviews and respond back to your users reviews on your profile page (*via the comments option). </p>
  <p>Lastly, keep your businesses profile as acurate as possible so your customers can keep utilizing your services! </p>
  <button><Link className="primary-btn" style={{ textDecoration: 'none' }} to={`/businesses/details/${userBusiness.id}`}>Get Started</Link></button>
</div>

</span> 


  );
}
