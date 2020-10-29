import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Login() {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();




  const loginSubmit = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push("/"))
      .catch(() => alert("Invalid email or password"));
  };


//Working on a Route after login
  // useEffect(() => {      
  //   getAllUserTypes()
  // }, []);
  // const loginSubmit = (e) => {
  //   e.preventDefault();
  //   login(email, password)
  //     // .then(() => history.push("/"))

  //     .then(() => {
  //       if (userProfile.userTypeId === 2) {
  //         history.push("/helloreviewer");
  //       } else if (userProfile.userTypeId === 1) {
  //         history.push("/businesses/registerthebusiness");
  //       }
  //     })
  //     .catch(() => alert("Invalid email or password"));
  // };
//End Practice Route


  return (
    <Form className="login-form" onSubmit={loginSubmit}>
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
    </Form>
  );
}