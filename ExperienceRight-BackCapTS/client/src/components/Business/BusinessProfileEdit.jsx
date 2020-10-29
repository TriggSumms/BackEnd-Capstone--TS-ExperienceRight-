import React, { useState, useEffect, useContext } from "react";
import { BusinessContext } from "../../providers/BusinessProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const BusinessUserEdit = () => {
    //const { updateUser, getUserId, userTypes, getAllUserTypes } = useContext(UserProfileContext);
    const { updateBusiness, getBusinessById, businesses, categories, getAllCategories } = useContext(BusinessContext);
    const [isLoading, setIsLoading] = useState(false);
    const [ business, setBusiness] = useState();
    const [categoryId, setCategoryId] = useState();
    const { id } = useParams();
    const history = useHistory();



    const editBusinessUser = (e) => {
        e.preventDefault();
        const parsedCat = parseInt(categoryId)
        business.categoryId = parsedCat;
        updateBusiness(business)
            .then(() => history.push("/"));
    }


    const handleFieldChange = e => {
        const stateToChange = { ...business };
        stateToChange[e.target.id] = e.target.value;
        setBusiness(stateToChange);
    };

    const handleCatChange = (e) => {
        setCategoryId(e.target.value);
    }

    // useEffect(() => {
    //     getBusinessById(id)
    //         .then((business) => {
    //             getAllCategories()
    //             setBusiness(business)
    //         })
    // }, []);

    useEffect(() => {
        getBusinessById(id)
      }, []); 

      useEffect(() => {
        getAllCategories();
      }, []); 


    if (!business) {
        return null;
    }


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
                        <Label for="category">Sector Category</Label>
                        <select className="userEditDropdown" onChange={handleCatChange}>
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
                                onClick={editBusinessUser}
                            >Submit Profile Changes</Button>
                            <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </>
    );
}

export default BusinessUserEdit;