import React, { useContext, useState, useEffect } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
import { BusinessContext } from "../../providers/BusinessProvider";
//import { FrequencyContext } from "../../providers/FrequencyProvider";
import { useHistory, useParams, Link } from "react-router-dom";
import { Card, CardBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Stars from 'react-stars'
import { render } from 'react-dom'


export default function ReviewEditForm() {

    const { getById, updateReview, review, getAllFrequencies, frequencies } = useContext(ReviewContext);
    const { businesses, getAllBusinesses } = useContext(BusinessContext);
    const [businessId, setBusinessId] = useState();
    const [frequencyId, setFrequencyId] = useState();
    //const [ratingios, setRating] = useState();
    const [isLoading, setIsLoading] = useState(false);
    //UseParams pulls in the id information from applications view 
    const { id } = useParams();
    const history = useHistory();

    const [editedReview, setEditedReview] = useState({});






    //Bringin in the dropdowns and targeting & Starting my useEffect process by getting the ID of Review
    useEffect(() => {
        getById(parseInt(id));
    }, [])

    useEffect(() => {
        getAllFrequencies();
    }, [])
    useEffect(() => {
        getAllBusinesses();
    }, [])

    useEffect(() => {
        setEditedReview(review)
    }, [review]);

    const handleBuizChange = (e) => {
        const stateToChange = { ...editedReview };
        stateToChange[e.target.id] = e.target.value;
        setEditedReview(stateToChange);
    }
    const handleFreqChange = (e) => {
        const stateToChange = { ...editedReview };
        stateToChange[e.target.id] = e.target.value;
        setEditedReview(stateToChange);
    }
    const handleFieldChange = e => {
        const stateToChange = { ...editedReview };
        stateToChange[e.target.id] = e.target.value;
        setEditedReview(stateToChange);
    };

    //END DROPDOWN AND SINGLE ID call



        //START RATING REVIEW INPUT
    // const onChange = event => setRating(parseInt(event.target.value));

    const parsedRating = parseInt(review.rating);
    review.rating = parsedRating;
 
    // const parsedRating2 = parseInt(review.rating);
    // review.rating = parsedRating2;
    
    const formStarRating = {
        size: 60,
        count: 10,
        char: '',
        color1: '#ff9900',
        color2: '#6599ff',
       // value: parsedRating,
        edit: true,
        // half: false,
        
        // onChange: parsedRating2 => {
        //     // console.log(`Example 2: new value is ${newValue}`)
        //     setRating(parsedRating2)
        // },
         onChange: parsedRating => {
            // console.log(`Example 2: new value is ${newValue}`)
            setEditedReview(parsedRating);
        }
 

    }
    //END RATING REVIEW






    const editReview = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const thatEditedReview = ({
            id: parseInt(review.id),
            title: editedReview.title,
            content: editedReview.content,
            rating: parseInt(editedReview.rating),
            frequencyId: parseInt(editedReview.frequencyId),
            userProfileId: parseInt(review.userProfileId),
            businessId: parseInt(review.businessId),
            dateOfExperience: editedReview.dateOfExperience,

        })

        updateReview(thatEditedReview)
        

        .then((r) => {
            history.push(`/reviews/details/${id}`)
        })
        setIsLoading(false);
    }






    // if (!editedReview) {
    //     return null
    // }


    

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
                                        type="text"
                                        id="content"
                                        required
                                       // defaultValue= {review.content}
                                        defaultValue={editedReview.content}
                                        name="content"
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="category">Frequency</Label>
                                    <Input
                                        type="select"
                                        className="userEditDropDown"
                                        onChange={handleFreqChange}
                                        value={parseInt(editedReview.frequencyId)}
                                        id="frequencyId"
                                        name="frequencyId"
                                    >
                                        <option value={1}> Choose an option</option>
                                        {frequencies.map(frequency => {
                                            return <option key={frequency.id} value={frequency.id}>{frequency.name}</option>
                                        }
                                        )}
                                    </Input>
                                </FormGroup>
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
                                <Label for="rating">Rate Your Experience</Label>

                                {/* <Stars {...formStarRating} id="rating" required defaultValue={editedReview.rating} /> */}
                                <FormGroup>
                                    <Label for="rating">Rate the Experience</Label>
                                    <Input
                                        type="number"
                                        id="rating"
                                        required
                                        defaultValue={editedReview.rating}
                                        name="rating"
                                        // onChange={e => setRating(parseInt(e.target.value))}
                                        onChange={handleFieldChange}
                                    />
                                </FormGroup>
                            </Form>

                            <div>
                                <Button
                                    className="newPostSubmitButton"
                                    type="submit"
                                    disabled={isLoading}
                                    onClick={editReview}
                                >Submit Review Changes</Button>
                                <Link to={`/reviews`}><Button type="button" color="warning">Cancel</Button></Link>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}