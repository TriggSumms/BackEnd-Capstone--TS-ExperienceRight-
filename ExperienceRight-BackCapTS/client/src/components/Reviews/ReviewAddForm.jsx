import React, { useContext, useState, useEffect } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
import { BusinessContext } from "../../providers/BusinessProvider";
import { useHistory, Link, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactStars from 'react-stars'
import { render } from 'react-dom'


export default function ReviewAddForm() {

    const { addReview, frequencies, getAllFrequencies } = useContext(ReviewContext);
    const { businesses, getAllBusinesses } = useContext(BusinessContext);
    const history = useHistory();
    const [frequencyId, setFrequencyId] = useState();
    const [businessId, setBusinessId] = useState();
    const [rating, setRating] = useState();
    //const { businessId } = useParams();

    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const [isLoading, setIsLoading] = useState(false);



    const [review, setReview] = useState({
        title: "",
        content: "",
        rating: "",
        dateOfExperience: "",
        frequencyId: "",
        businessId: businessId,
        userProfileId: sessionUser.id
    });

    console.log("Testing Review", review)







    //START RATING REVIEW INPUT
    // const onChange = event => setRating(parseInt(event.target.value));

    const parsedRating = parseInt(rating);
    review.rating = parsedRating;

    const secondExample = {
        size: 50,
        count: 10,
        char: '',
        color1: '#ff9900',
        color2: '#6599ff',

        // onChange={ratingChanged},
        //onChange={e => setRating(parseInt(e.target.value))}
        onChange: newValue => {
            // //     setRating(newValue)
            console.log(`Example 2: new value is ${newValue}`)
        }
    }

    // console.log("wowtest", setRating);
    //console.log("wowtest", newValue);

    //  const ratingChanged = (newRating) => {
    //     console.log(newRating)
    //   }
    //END RATING REVIEW


    //START Business GRAB

    const parsedBuiz = parseInt(businessId);
    review.businessId = parsedBuiz;

    useEffect(() => {
        getAllBusinesses();
    }, [])

    const handleBuizChange = (e) => {
        setBusinessId(e.target.value);
    }
    //END Business GRAB



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
                    <Label for="title">Business Selector</Label>
                    {/* {business.id} */}
                    <br />
                        <select className="userEditDropdown" onChange={handleBuizChange}>
                        <option default value={review.businessId}></option>
                            {businesses.map(business =>
                                    <option value={business.id}>
                                        {business.establishmentName}
                                    </option>
                            )}
                        </select>
                        <br />

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
                        {/* <br />
                        <select id="frequencyId" className="userEditDropdown" onChange={e => setFrequencyId(parseInt(e.target.value))}>
                        {frequencies.map(frequency =>
                            
                                <option value={frequency.id}>
                                    {frequency.name}
                                </option>
                        )}
                        </select>
                        <br /> */}
                        <br />
                        <select className="userEditDropdown" onChange={handleFreqChange}>
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
                        <br />
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
                        <Label for="rating">Rating Of Your Experience</Label>
                        <Input
                            type="number"
                            required
                            onChange={e => setRating(parseInt(e.target.value))}
                            id="rating"
                            placeholder="Rate your experience 1-10"
                            value={review.rating}
                        />
                        <ReactStars {...secondExample}
                        // type="text"
                        // required
                        //  onChange={handleFieldChange}
                        //  id="rating"
                        // id="rating" 
                        //  value= {review.rating}
                        // onChange={onChange} value={review.rating}
                        //onChange ={handleFieldyChange}
                        //onChange={e => setRating(parseInt(e.target.value))}
                        // placeholder="rating"
                        // value={parseInt(review.rating)}
                        />
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
