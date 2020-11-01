import React, { useContext, useState, useEffect } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
import { BusinessContext } from "../../providers/BusinessProvider";
import { useHistory, Link, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Stars from 'react-stars'
import { render } from 'react-dom'


export default function ReviewAddForm() {
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { addReview, frequencies, getAllFrequencies } = useContext(ReviewContext);
    const { businesses, getAllBusinesses } = useContext(BusinessContext);
    const history = useHistory();
    const [frequencyId, setFrequencyId] = useState();
    //const [businessId, setBusinessId] = useState();
    const [rating, setRating] = useState();
    const { id } = useParams();

    
    const [isLoading, setIsLoading] = useState(false);




    // console.log(id)

    const [review, setReview] = useState({
        title: "",
        content: "",
        rating: "",
        dateOfExperience: "",
        frequencyId: "",
        businessId: parseInt(id),
        userProfileId: sessionUser.id
    });

    console.log("Testing Review", review)







    //START RATING REVIEW INPUT
    // const onChange = event => setRating(parseInt(event.target.value));

    const parsedRating = parseInt(rating);
    review.rating = parsedRating;

    
    const formStarRating = {
        size: 60,
        count: 10,
        char: '',
        color1: '#ff9900',
        color2: '#6599ff',
        // half: false,
        // onChange: e => setRating(parseInt(e.target.value)),
        onChange: parsedRating => {
            // console.log(`Example 2: new value is ${newValue}`)
            setRating(parsedRating);
        }
    }
    //END RATING REVIEW




    
    // //START Business GRAB

//Will need this info in the scenario that I want a user to select the business under review

    // const parsedBuiz = parseInt(businessId);
    // review.businessId = parsedBuiz;

    // useEffect(() => {
    //     getAllBusinesses();
    // }, [])

    // const handleBuizChange = (e) => {
    //     setBusinessId(e.target.value);
    // }
    // //END Business GRAB



    //START FREQUENCY GRAB

    const parsedFreq = parseInt(frequencyId);
    review.frequencyId = parsedFreq;

    useEffect(() => {
        getAllFrequencies();
    }, [])

    const handleFreqChange = (e) => {
        setFrequencyId(e.target.value);
    }
    //END FREQUENCY GRAB






    //REVIEW CREATION METHOD 
    const handleFieldChange = e => {
        const stateToChange = { ...review };
        stateToChange[e.target.id] = e.target.value;
        setReview(stateToChange);
    };
    const createNewReview = e => {
        e.preventDefault();
        if (review.title === "") {
            alert("Give your review a title!")

        } else {
            setIsLoading(true);
        }
        addReview(review)
            .then((r) => {
                history.push(`/reviews/details/${r.id}`)
            })
    };
    //END REVIEW CREATION




    return (
        <>
            <Form className="newPostForm">
                <FormGroup className="newPost">
                    <div >
                {/* Might use this selector process in later list */}
                        {/* <Label for="title">Business Selector</Label> */}
                        {/* {business.id} */}
                        {/* <br />
                        <select className="userEditDropdown" onChange={handleBuizChange}>
                        <option default value={review.businessId}></option>
                            {businesses.map(business =>
                                    <option value={business.id}>
                                        {business.establishmentName}
                                    </option>
                            )}
                        </select> */}
                        <div>
                            <br></br>
                            <h4>Tell the Business about your experience...</h4>
                            ...and remember reviews are anonymous
                            <br></br>
                        </div>
                        <br></br>
                        <Label for="title">Title</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="title"
                            placeholder="Title"
                            value={review.title}
                        />
                        <Label for="category">Frequency Of Visit</Label>
                        <Input
                            type="select"
                            className="userEditDropDown"
                            onChange={handleFreqChange}
                            value={parseInt(frequencyId)}
                            id="frequencyId"
                            name="frequencyId"
                        >
                            <option > Choose an option</option>
                            {frequencies.map(frequency => {
                                return <option selected value={frequency.id}>{frequency.name}</option>
                            }
                            )}
                        </Input>
                        <Label for="content">Content</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="content"
                            placeholder="Content"
                            value={review.content}
                        />
                        <Label for="publishDateTime">Date of the Experience</Label>
                        <Input
                            type="datetime-local"
                            required
                            onChange={handleFieldChange}
                            id="dateOfExperience"
                            placeholder="Publication Date"
                            value={review.dateOfExperience}
                        />
                        <br></br>
                        <Label for="rating">Rate Your Experience</Label>
                        {/* <Input type="number" required onChange={e => setRating(parseInt(e.target.value))} id="rating" placeholder="Rate your experience 1-10" value={review.rating}/> */}
                        <Stars {...formStarRating}/>
                        <br />
                        <div>
                            <Button
                                className="newPostSubmitButton"
                                type="submit"
                                disabled={isLoading}
                                onClick={createNewReview}
                            >Submit Review</Button>
                            <Link to={`/reviews`}><Button type="button" color="warning">Cancel</Button></Link>
                        </div>
                    </div>
                </FormGroup>
            </Form>
        </>
    )
}
