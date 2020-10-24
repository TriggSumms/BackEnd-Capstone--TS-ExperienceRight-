import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function RegisterBusiness() {
  const history = useHistory();
  const { registerBusiness } = useContext(UserProfileContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
//   const [EstablishmentName, setEstablishmentName] = useState();
//   const [Bio, setBio] = useState();
//   const [Address, setAddress] = useState();
//   const [HoursOfOperation, setHoursOfOperation] = useState();
//   const [Phone, setPhone] = useState();
//   const [Category, setCategory] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, displayName, imageLocation, email /* establishmentName, bio, address, HoursOfOperation, phone, category  */};
      register(userProfile, password)
        .then(() => history.push("/"));
    }
 };

  return (
    <Form className="registration-form" onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Account Holder Display Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageLocation">Profile Image URL</Label>
          <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <h1>Business Specific Information Below:</h1>
        {/* <FormGroup>
          <Label for="EstablishmentName">Establishment Name</Label>
          <Input id="EstablishmentName" type="text" onChange={e => setEstablishmentName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="Bio">Tell us about the Business...</Label>
          <Input id="Bio" type="text" onChange={e => setBio(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="Address">Address</Label>
          <Input id="Address" type="text" onChange={e => setAddress(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="HoursOfOperation">Hours of Operation</Label>
          <Input id="HoursOfOperation" type="text" onChange={e => setHoursOfOperation(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="Phone">Phone</Label>
          <Input id="Phone" type="text" onChange={e => setPhone(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="Category">Category</Label>
          <Input id="Category" type="text" onChange={e => setCategory(e.target.value)} />
        </FormGroup> */}
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}