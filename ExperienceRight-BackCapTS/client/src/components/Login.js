import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
// import { BusinessContext } from "../providers/BusinessProvider";
// import { ReviewContext } from "../providers/ReviewProvider";

export default function Login() {
  const history = useHistory();
  const {  login } = useContext(UserProfileContext);
 // const { userBusiness, getBusinessByUserId } = useContext(BusinessContext);
  //const { getAllReviewsforBusiness } = useContext(ReviewContext);
  //const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();




  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
    // .then(getAllReviewsforBusiness(parseInt(userBusiness.id)))
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));

  };

  // useEffect(() => {
  //   if (sessionUser != null) {
  //     (getBusinessByUserId(parseInt(sessionUser.id)))
      
  //   }

  // }, []);

  //console.log("Loginuserb", userBusiness)


  return (
    <>

    
    <Form className="login-form" onSubmit={loginSubmit}>
      <Label><img className="LoginLogoImage" src="https://res.cloudinary.com/triggsumms/image/upload/v1604514032/wpxa7kd7urfvefe0z5as.png" alt="ER Logo" /></Label>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          {/* Not Registered? <br></br>...<Link to="/customerRegister">Register as Customer</Link> OR <Link to="/businessRegister">Register as Business</Link> */}
          Not Registered? <br></br>...<Link to="/register">Register </Link> 
        </em>
      </fieldset>
      {/* <Label><img className="LoginLogoImage" src="https://res.cloudinary.com/triggsumms/image/upload/v1604514032/wpxa7kd7urfvefe0z5as.png" alt="ER Logo" /></Label> */}
    </Form>
  
    </>
  );
}