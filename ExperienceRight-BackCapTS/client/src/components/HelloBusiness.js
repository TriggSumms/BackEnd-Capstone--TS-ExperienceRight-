import React, { useState, useContext, useEffect } from "react";
import {Button } from "reactstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { BusinessContext } from "../providers/BusinessProvider";


export default function HelloBusiness() {
  const { userProfile, getUserId } = useContext(UserProfileContext);
  const {  getBusinessById } = useContext(BusinessContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { id } = useParams();
  const history = useHistory();
  console.log("hello", userProfile);
  
  useEffect(() => {
    getBusinessById(id)  
}, []);

  useEffect(() => {
    getUserId(id)
}, []);


//console.log("hello2", sessionUser.businessz);


  return (
    <span style={{
      position: "fixed",
      left: 0,
      right: 0,
      top: "50%",
      marginTop: "-0.5rem",
      textAlign: "center",
      fontSize: "15px",
    }}>

    Hello! Welcome to Experience Right. As a user and pridefull Business Owner, you have agreed on creating transparency between your consumers and your business. Kudos, Experience Right is here to assist with fostering that connection! 
    <br></br>Heres the deal,<br></br>
   Feel Free to read your reviews and respond back to your users reviews on your profile page (*via the comments option). 
   <br></br>Lastly, keep your businesses profile as acurate as possible so your customers can keep utilizing your services!
    <br></br>
    
    {/* <Link to={`/businesses/details/${businessId}`}><Button type="button" color="warning">Get Started</Button></Link></span> */}
    {/* <>
     <Button onClick={() => history.push(`/businesses/details/${businessId}`)}>Get Started </Button>
     </> */}
     
     <Button>
       
     <Link className="primary-btn" style={{ textDecoration: 'none' }} to={`/businesses/details/${sessionUser.id}`}>GET STARTED</Link>
     {/* <Link className="primary-btn" style={{ textDecoration: 'none' }} to={`/businesses/details/${sessionUser.userProfile.buisnessId}`}>GET STARTED</Link> */}
     </Button>
     </span>
  );
}
