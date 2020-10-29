import React, { useContext, useState, useEffect } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
import { BusinessContext } from "../../providers/BusinessProvider";
//import { FrequencyContext } from "../../providers/FrequencyProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function ReviewEditForm() {

    const { getById, updateReview, review, getAllFrequencies, frequencies } = useContext(ReviewContext);
    const { businesses, getAllBusinesses } = useContext(BusinessContext);
    const [businessId, setBusinessId] = useState();
    const [frequencyId, setFrequencyId] = useState();
    const [rating, setRating] = useState();
    //UseParams pulls in the id information from applications view 
    const { id } = useParams();
    const history = useHistory();


    //SET OUR NEWLY EDITED OBJECT
    const [editedReview, setEditedReview] = useState({
        title: "",
        content: "",
        rating: rating,
        dateOfExperience: "",
        frequencyId: "",
        businessId: "",
        userProfileId: review.userProfileId,
        id: review.id

    });



    //Bringin in the dropdowns and targeting & Starting my useEffect process by getting the ID of Review
    const handleBuizChange = (e) => {
        setBusinessId(e.target.value);
    }
    const handleFreqChange = (f) => {
        setFrequencyId(f.target.value);
    }

    useEffect(() => {
        getById(parseInt(id));
    }, [])

    useEffect(() => {
        getAllFrequencies();
    }, [])
    useEffect(() => {
        getAllBusinesses();
    }, [])

    //END DROPDOWN AND SINGLE ID call




    useEffect(() => {
        setEditedReview(review)
    }, [review]);




    const editReview = (e) => {
        updateReview({
            title: editedReview.title,
            content: editedReview.content,
            rating: editedReview.rating,
            frequencyId: editedReview.frequencyChange,
            dateOfExperience: editedReview.dateOfExperience,
            id: review.id
        })

        const parsedFreq = parseInt(frequencyId);
        editedReview.frequencyId = parsedFreq;

        if (!editedReview.reviewId) {
            editedReview.frequencyId = review.frequencyId;
        }

        const parsedBuiz = parseInt(businessId);
        editedReview.businessId = parsedBuiz;

        if (!editedReview.reviewId) {
            editedReview.businessId = review.businessId;
        }

        updateReview(editedReview.id, editedReview)
            .then(() => {
                history.push(`/reviews/details/${id}`);
            }
            )
        console.log("editedFinalReview", editedReview)
    }

    const handleFieldChange = e => {
        const stateToChange = { ...editedReview };
        stateToChange[e.target.id] = e.target.value;
        setEditedReview(stateToChange);
    };




    if (!editedReview) {
        return null
    }
    return (
        <>
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Card className="col-sm-12 col-lg-6">
                        <CardBody>

                            <Form>
                                <FormGroup>

                                    <Input
                                        id={editedReview.id}
                                        onChange={handleFieldChange}
                                        type="hidden"
                                        value={review.id}
                                    />

                                </FormGroup>
                                <Label for="title">Edit your Review: </Label>
                                {/* This form has been hidden and set to default */}
                                <select hidden="true" className="userEditDropdown" onChange={handleBuizChange}>
                                    <option default value={businessId}></option>
                                    {businesses.map(business =>
                                        review.id === review.businessId ?
                                            <option selected value={business.id}>
                                                {business.establishmentName}
                                            </option> :
                                            <option value={business.id}>
                                                {business.establishmentName}
                                            </option>
                                    )}
                                </select>


                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        type="text"
                                        id="title"
                                        required
                                        defaultValue={editedReview.title}
                                        name="content"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input
                                        type="textarea"
                                        id="content"
                                        required
                                        defaultValue={editedReview.content}
                                        name="content"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category">Frequency</Label>
                                    <br />
                                    {/* <select className="userEditDropdown" onChange={handleFreqChange}>
                                        <option default value={frequencyId}></option>

                                        {frequencies.map(frequency => {


                                            return <option key={frequency.id} value={frequency.id}>{frequency.name}</option>
                                            // <option selected value={frequency.id}>
                                            //     {frequency.name}
                                            // </option> 
                                        }
                                        )}
                                    </select> */}
                                    {/* <br />*/}
              
                                    <Input
                                        type="select"
                                        className="userEditDropDown"
                                        onChange={handleFreqChange}
                                        value={parseInt(editedReview.frequencyChange)}
                                        id="frequencyId"
                                        name="frequencyId"
                                    >
                                        <option > Choose an option</option>
                                        {frequencies.map(frequency => {
                                            return <option selected value={frequency.id}>{frequency.name}</option>
                                        }
                                        )}
                                    </Input>
                                </FormGroup>
                                {/* <FormGroup>
                                    <Label for="imageLocation">Image Location</Label>
                                    <Input
                                        type="text"
                                        id="imageLocation"
                                        required
                                        defaultValue={editedPost.imageLocation}
                                        name="imageLocation"
                                        onChange={handleFieldChange}
                                    /> 
                                </FormGroup>*/}

                                    <FormGroup>
                                        <Label for="dateOfExperience">Date of Experience</Label>
                                        <Input
                                            type="datetime-local"
                                            id="dateOfExperience"
                                            required
                                            defaultValue={editedReview.dateOfExperience}
                                            name="dateOfExperience"
                                            onChange={handleFieldChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="rating">Rate the Experience</Label>
                                        <Input
                                            type="number"
                                            id="rating"
                                            required
                                            defaultValue={editedReview.rating}
                                            name="rating"
                                            onChange={e => setRating(parseInt(e.target.value))}
                                        />
                                    </FormGroup>
                            </Form>
                                <Button type="button" color="success" onClick={e => { editReview() }}>Save</Button> &nbsp;&nbsp;
                            <Link to={`/reviews`}><Button type="button" color="warning">Cancel</Button></Link>
                        </CardBody>
                    </Card>
                </div>
                </div>
        </>
    );
}