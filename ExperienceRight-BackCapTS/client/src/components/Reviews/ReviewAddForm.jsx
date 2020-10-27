import React, { useContext, useState, useEffect } from "react";
//import { FrequencyContext } from "../../providers/FrequencyProvider";
import { ReviewContext } from "../../providers/ReviewProvider";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactStars from 'react-stars'
import { render } from 'react-dom'


export default function ReviewAddForm() {
    const history = useHistory();
//    const { frequencies, AllFrequencies} = useContext(ReviewContext);
    const { addReview, frequencies, getAllFrequencies } = useContext(ReviewContext);
    const [frequencyId, setFrequencyId] = useState();
   const [rating, setRating] = useState(``);

    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

    const [isLoading, setIsLoading] = useState(false);

    const [review, setReview] = useState({
        title: "",
        content: "",
        rating: "",
        dateOfExperience: "",
        frequencyId: "",
        businessId: "",
        userProfileId: sessionUser.id
    });

    console.log("Testing Review", review)
    

    
    // render(<ReactStars
    //     count={5}
    //     onChange={ratingChanged}
    //     size={24}
    //     color2={'#ffd700'} />,
      
    //     document.getElementById('where-to-render')
    //   );
    // const firstExample = {
    //     size: 30,
    //     value: 2.5,
    //     edit: false
    //   }
      //reviewrating = parseInt(review.rating);

     const onChange = event => setRating(parseInt(event.target.value));

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
           console.log(`Example 2: new value is ${newValue}`)}
         // rating = parseInt(newValue);
        //{review.rating} = newValue
      
      } 
     console.log("wowtest", setRating)
     
    //  const ratingChanged = (newRating) => {
    //     console.log(newRating)
    //   }






    //   const onChange = e => {
    //     const stateToChange = { ...review };
    //     stateToChange[e.target.newValue = e.target.review.rating];
    //     setReview(stateToChange);
    // };



    useEffect(() => {
        getAllFrequencies();
    }, [])
    console.log("TEST", frequencyId)


    const handleFieldChange = e => {
        const stateToChange = { ...review };
        stateToChange[e.target.id] = e.target.value;
        setReview(stateToChange);
    };
    // const handleFieldyChange = e => {
    //     const stateToChange = { ...review };
    //     stateToChange[e.target.value] = (parseInt(e.target.value));
    //     setRating(stateToChange);
    // };


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
                        <ReactStars {...secondExample}   
                            // type="text"
                            // required
                            //  onChange={handleFieldChange}
                            //  id="rating"
                            // id="rating" 
                            //  value= {review.rating}
                            onChange={onChange} value={review.rating}
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
