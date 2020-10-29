import React from "react";
import {Button } from "reactstrap";
import { Link } from "react-router-dom";


export default function HelloReviewer() {
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
      
      Hello, and welcome to Experience Right! During your session you will act with anoynmous posting rights and will be able to review your experience(s) with the businesses of your choice!
    <br></br> Its important for your voice to be heard, and the businesses with XR accounts want to hear and respond to your thoughts, so if you check back into your account after a day or so you should see a response from the business in your comments section!
    <br></br> Instructions, press the button below and select the business you would like to review. If youd like to edit/delete your review you will be prompted in the details view!
    <br></br> As well, Feel free to check out other users reviews and get an idea of what your communitty thinks about your local business! 
    <br></br><Link to={`/businesses`}><Button type="button" color="warning">Get Started</Button></Link></span>
  );
}