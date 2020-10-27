import React, { useContext, useState, useEffect } from "react";
//import { FrequencyContext } from "../../providers/FrequencyProvider";
import { ReviewContext } from "../../providers/ReviewProvider";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default function ReviewAddForm() {
    const history = useHistory();
//    const { frequencies, AllFrequencies} = useContext(ReviewContext);
    const { addReview, frequencies, getAllFrequencies } = useContext(ReviewContext);
    const [frequencyId, setFrequencyId] = useState();

    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));


    const [review, setReview] = useState({
        title: "",
        content: "",
        rating: 1 ,
        dateOfExperience: "",
        frequencyId: "",
        businessId: "",
        userProfileId: sessionUser.id
    });

    const [isLoading, setIsLoading] = useState(false);




    useEffect(() => {
        getAllFrequencies();
    }, [])
    console.log("TEST", frequencyId)


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

        // const parsedFreq = parseInt(frequencyId);
        // review.frequencyId = parsedFreq;

        addReview(review)
            .then((r) => {
                history.push(`/reviews/details/${r.id}`)
            })

    };



    return (
        <>
            <Form className="newPostForm">
                <FormGroup className="newPost">
                    <div >
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
                        <br />
                        <select id="frequencyId" className="userEditDropdown" onChange={e => setFrequencyId(parseInt(e.target.value))}>
                        {frequencies.map(frequency =>
                            
                                <option value={frequency.id}>
                                    {frequency.name}
                                </option>
                        )}
                        </select>
                        <br />
                        {/* <Label for="imageLocation">Image URL</Label>
                        <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="imageLocation"
                            placeholder="Url"
                            value={post.imageLocation}
                        /> */}
                        {/* <Label for="category">Category</Label>
                        <Input
                            isOpen={dropdownOpen}
                            toggle={toggle}

                            required
                            type="select"
                            onChange={handleFieldChange}
                            id="categoryId"
                            value={post.category}
                        >
                            <DropdownToggle caret>
                                {/* Select Category */}
                        {/* </DropdownToggle>
                            <option selected value="default" >Select a Category</option>
                            {categories.map(category => {

                                return <option key={category.id} value={category.id}>{category.name}</option>
                            })} */}
                        {/* </Input> */}
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
                        {/* <Input
                            type="text"
                            required
                            onChange={handleFieldChange}
                            id="rating"

                            placeholder="rating"
                            value={parseInt(review.rating)}
                        /> */}
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
