import React, { useContext, useState, useEffect } from "react";
//import { FrequencyContext } from "../../providers/FrequencyProvider";
import { BusinessContext } from "../../providers/BusinessProvider";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import ReactStars from 'react-stars'
//import { render } from 'react-dom'


export default function BusinessREGISTRATIONaddForm() {
    const history = useHistory();
    //    const { frequencies, AllFrequencies} = useContext(ReviewContext);
    const { addBusiness } = useContext(BusinessContext);
    //const [frequencyId, setFrequencyId] = useState();


    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

     const [isLoading, setIsLoading] = useState(false);



    const [business, setBusiness] = useState({
        establishmentName: "",
        bio: "",
        address: "",
        hoursOfOperation: "",
        categoryId: 1,
        phone: "",
        userProfileId: sessionUser.id
    });

console.log("testingbusinessvalue", business)



    const handleFieldChange = e => {
        const stateToChange = { ...business };
        stateToChange[e.target.id] = e.target.value;
        setBusiness(stateToChange);
    };

    // const handleFieldChangey = e => {
    //     const stateToChange = { ...frequency };
    //     stateToChange[e.target.id] = e.target.value;
    //     setFrequency(stateToChange);
    // };
    // const handleFieldyChange = e => {
    //     const stateToChange = { ...review };
    //     stateToChange[e.target.value] = (parseInt(e.target.value));
    //     setRating(stateToChange);
    // };



    //REVIEW CREATION METHOD
    const createNewBusiness = e => {
        e.preventDefault();
        if (business.establishment === "") {
            alert("Does your Business have a name!")

        } else {
            setIsLoading(true);
        }
        addBusiness(business)
            .then((b) => {
                history.push(`/businesses/details/${b.id}`)
            })
    };
    //END REVIEW CREATION


    return (
        <>
            <Form className="newPostForm">
                <FormGroup className="newPost">
                    <div >
                        {/* CREATE A HELLO DIALOGUE FOR THE ACCOUNT HOLDER */}

                        {/* <Label for="category">Frequency Of Visit</Label>
                        {/* <br />
                        <select id="frequencyId" className="userEditDropdown" onChange={e => setFrequencyId(parseInt(e.target.value))}>
                        {frequencies.map(frequency =>
                            
                                <option value={frequency.id}>
                                    {frequency.name}
                                </option>
                        )}
                        </select>
                        <br /> */}
                        {/* <br />
                        <select className="userEditDropdown" onChange={handleChange}>
                            {frequencies.map(frequency =>
                                review.id === review.frequencyId ?
                                    <option selected value={frequency.id}>
                                        {frequency.name}
                                    </option> :
                                    <option value={frequency.id}>
                                        {frequency.name}
                                    </option>
                            )}
                        </select>
                        <br /> */}

                        <FormGroup>
                            <Label for="EstablishmentName">Establishment Name...</Label>
                            <Input
                                type="text"
                                required
                                onChange={handleFieldChange}
                                id="establishmentName"
                                placeholder="Name of Business"
                                value={business.establishmentName}
                            //onChange={e => setEstablishmentName(e.target.value)} 
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Bio">Tell us about the Business...</Label>
                            <Input
                                type="text"
                                required
                                onChange={handleFieldChange}
                                id="bio"
                                placeholder="Tell your customer about the business"
                                value={business.bio}
                            //onChange={e => setBio(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Address">Address...</Label>
                            <Input
                                type="text"
                                required
                                onChange={handleFieldChange}
                                id="address"
                                placeholder="Address of the Location"
                                value={business.address}
                            // onChange={e => setAddress(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="HoursOfOperation">Hours of Operation...</Label>
                            <Input
                                id="hoursOfOperation"
                                type="text"
                               required
                                onChange={handleFieldChange}
                                placeholder="What are the Business Hours..."
                                value={business.hoursOfOperation}
                            // onChange={e => setHoursOfOperation(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Phone">Phone...</Label>
                            <Input
                                id="phone"
                                type="text"
                                required
                                onChange={handleFieldChange}
                                placeholder="Phone #..."
                                value={business.phone}
                            // onChange={e => setPhone(e.target.value)}
                            />
                        </FormGroup>
                        {/*  <FormGroup>
        <Label for="Category">Category</Label>
          <Input id="Category" type="text" onChange={e => setCategory(e.target.value)} />
        </FormGroup>  */}
                        {/* <FormGroup>
           <Button>Submit Business Form</Button>
       </FormGroup> */}
                        <div>
                            <Button
                                className="newPostSubmitButton"
                                type="submit"
                                disabled={isLoading}
                                onClick={createNewBusiness}
                            >Submit Sign Up </Button>
                            <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </>
    )
}
