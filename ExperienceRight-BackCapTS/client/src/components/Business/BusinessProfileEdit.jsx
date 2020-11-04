import React, { useState, useEffect, useContext } from "react";
import { BusinessContext } from "../../providers/BusinessProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import BusinessREGISTRATIONaddForm from "./BusinessREGISTRATIONaddForm";
import Business from "./Business";

export default function BusinessProfileEdit() {

    const { updateBusiness, getBusinessById, business, categories, getAllCategories } = useContext(BusinessContext);
    const [isLoading, setIsLoading] = useState(false);
   // const [categoryId, setCategoryId] = useState();
    const [categorySelected, setCategorySelected] = useState(business.categoryId);
    const { id } = useParams();
    const history = useHistory();
    const [editedBusiness, setEditedBusiness] = useState({});



const categorySelector = (e) => {
    setCategorySelected(parseInt(e.target.value));
}

    useEffect(() => {
        getAllCategories();
    }, [])


    useEffect(() => {
        getBusinessById(parseInt(id));
    }, [])

    useEffect(() => {
        setEditedBusiness(business)
    }, [business]);



    // const handleCatChange = (e) => { 
    //     setCategoryId(parseInt(e.target.value));
    // }

    const handleFieldChange = e => {
        const stateToChange = { ...editedBusiness };
        stateToChange[e.target.id] = e.target.value;
        setEditedBusiness(stateToChange);
    };




    const editBusiness = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const thatEditedBusiness = ({

            id: parseInt(business.id),
            userProfileId: parseInt(business.userProfileId),
            establishmentName: editedBusiness.establishmentName,
            bio: editedBusiness.bio,
            address: editedBusiness.address,
            hoursOfOperation: editedBusiness.hoursOfOperation,
            categoryId: parseInt(categorySelected),
            phone: editedBusiness.phone

        })

        updateBusiness(thatEditedBusiness)
    

        .then((e) => {
            history.push(`/businesses/details/${id}`)
        })
        setIsLoading(false);

    }

 console.log("yoooo", categorySelected)

    // console.log("TEST3", editedBusiness)


    return (
        <>
            <Form className="newPostForm">
                <FormGroup className="newPost">
                    <div >
                        {/* CREATE A HELLO DIALOGUE FOR THE ACCOUNT HOLDER */}
                        {/* <div>Hello, {business.userProfile.profileImageLocation} please fill out </div> */}

                        <FormGroup>

                            <Input
                                id={editedBusiness.id}
                                onChange={handleFieldChange}
                                type="hidden"
                                value={business.id}
                            />

                        </FormGroup>
                        <FormGroup>
                            <Label for="EstablishmentName">Establishment Name...</Label>
                            <Input
                                type="text"
                                required
                                onChange={handleFieldChange}
                                id="establishmentName"
                                placeholder="Name of Business"
                                value={editedBusiness.establishmentName}
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
                                value={editedBusiness.bio}
                            //onChange={e => setBio(e.target.value)}
                            />
                        </FormGroup>
                        <Input
                            type="select"
                            className="userEditDropDown"
                            onChange={categorySelector}
                            //value={parseInt(editedBusiness.categorySelected)}
                            id="categoryId"
                            name="categoryId"
                        >
                           
                            {categories.map(category => {
                                return <option key={category.id} value={category.id}>{category.name}</option>
                            }
                            )}
                        </Input>

                        <FormGroup>
                            <Label for="Address">Address...</Label>
                            <Input
                                type="text"
                                required
                                onChange={handleFieldChange}
                                id="address"
                                placeholder="Address of the Location"
                                value={editedBusiness.address}
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
                                value={editedBusiness.hoursOfOperation}
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
                                value={editedBusiness.phone}
                            // onChange={e => setPhone(e.target.value)}
                            />
                        </FormGroup>
                        <div>
                            <Button
                                className="newPostSubmitButton"
                                type="submit"
                                disabled={isLoading}
                                onClick={editBusiness}
                            >Submit Profile Changes</Button>
                            <Link to={`/`}><Button type="button" color="warning">Cancel</Button></Link>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </>
    );
}

