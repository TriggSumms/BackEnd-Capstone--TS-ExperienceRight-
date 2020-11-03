import React, { useContext, useState, useEffect } from "react";
//import { FrequencyContext } from "../../providers/FrequencyProvider";
import { BusinessContext } from "../../providers/BusinessProvider";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
//import ReactStars from 'react-stars'
//import { render } from 'react-dom'


export default function BusinessREGISTRATIONaddForm() {
    const history = useHistory();
    const { addBusiness, categories, getAllCategories } = useContext(BusinessContext);
    const [categoryId, setCategoryId] = useState();
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const [isLoading, setIsLoading] = useState(false);



    const [business, setBusiness] = useState({
        establishmentName: "",
        bio: "",
        address: "",
        hoursOfOperation: "",
        categoryId: "",
        phone: "",
        userProfileId: sessionUser.id
    });



    
   // console.log("testingbusinessvalue", business)

    const handleFieldChange = e => {
        const stateToChange = { ...business };
        stateToChange[e.target.id] = e.target.value;
        setBusiness(stateToChange);
    };


    //START REVIEW CREATION METHOD
    const createNewBusiness = e => {
        e.preventDefault();
        if (business.establishment === "" || business.bio === "" || business.hoursOfOperation === "" || business.address === "" || business.phone === "") {
            alert("Fill out all the fields for your business, otherwise a customer wont be able recognize you!");       
        } else {
            setIsLoading(true);
        }
        addBusiness(business)
           .then(() => {
            history.push(`/businesshello`)
           })
    };
    //END REVIEW CREATION



    //START Category GRAB
    const parsedCat = parseInt(categoryId);
    business.categoryId = parsedCat;

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleChange = (e) => {
        setCategoryId(e.target.value);
    }
    //END =Category GRAB




    return (
        <>
            <Form className="newPostForm">
                <FormGroup className="newPost">
                    <div >
                        {/* CREATE A HELLO DIALOGUE FOR THE ACCOUNT HOLDER */}
                        {/* <div>Hello, {business.userProfile.profileImageLocation} please fill out </div> */}


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
                        <Label for="category">Sector Selection:</Label>
                        <select className="userEditDropdown" onChange={handleChange}>
                            {categories.map(category =>
                                business.id === business.categoryId ?
                                    <option selected value={category.id}>
                                        {category.name}
                                    </option> :
                                    <option value={category.id}>
                                        {category.name}
                                    </option>
                            )}
                        </select>
                        <br />
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
