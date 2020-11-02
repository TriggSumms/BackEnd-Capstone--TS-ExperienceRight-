import React, { useState, useContext, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export default function Register() {
  const history = useHistory();
  const { register, userTypes, getAllUserTypes } = useContext(UserProfileContext);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [userTypeId, setUserTypeId] = useState();
  const [profileImageLocation, setProfileImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
   //const [user, setUser] = useState();
 
  


  useEffect(() => {      
  getAllUserTypes()
}, []);

console.log("TEST", userTypeId)





  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Please correct.");
    } else {
      
      const userProfile = {  userTypeId, firstName, lastName, displayName, profileImageLocation, email };
      console.log("test5", userProfile);
      register(userProfile, password)
     

       .then(() => { if(userProfile.userTypeId === 2) {
          history.push("/helloreviewer");
        } else if(userProfile.userTypeId === 1) {
          history.push("/businesses/registerthebusiness");
        }
    }
    )}
  };


  //.then(() => history.push("/"));
  //console.log("test7", userProfile.userType);


  return (
    <Form className="registration-form" onSubmit={registerClick}>
       <fieldset>
      <Label for="userTypeId">What Type of user are you?</Label>
      <br />
      <select id="userTypeId" className="userEditDropdown"   type="select" onChange={e => setUserTypeId(parseInt(e.target.value))}>
                        <option>USER CHOICE</option>
                        {userTypes.map(userType =>
                            
                                <option value={userType.id}>
                                    {userType.name}
                                </option>
                        )}
    </select> 
    <br />

        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="profileImageLocation">Profile Image URL</Label>
          <Input id="profileImageLocation" type="text" onChange={e => setProfileImageLocation(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        {/* <Form>
          <Label for="businesses">Business Select</Label>
          <Input isOpen={dropdownOpen} toggle={toggle}
            required
            type="select"
            onChange={handleFieldChange}
          >
            <DropdownToggle caret>
            Select a Business to Review
                            </DropdownToggle>
            <option>Select a Business to Review</option>
            {businesses.map(business => {
              return <option value={business.id} >{business.EstablishmentName}</option>
            })}
          </Input>
        </Form> */}
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}