import React, { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
//import { PostTagContext } from "../../providers/PostTagProvider";
//import { TagContext } from "../../providers/TagProvider";
import { Card, CardBody, Button, ListGroup } from "reactstrap";
import { useParams, Link } from "react-router-dom";


export default function ReviewDetail() {
    const { review, getById } = useContext(ReviewContext);
    const { id } = useParams();
 

    useEffect(() => {
        getById(id)

    }, []);


    const parsedId = parseInt(id)


    // we need the if statement to return true on the first render.
    // so we must include !post.userProfile because react will not let us
    // ask for the property of an undefined object
    
    if (!review || !review.userProfile) {
        return null
    }
    return (

        <>
            <Link style={{ textDecoration: 'none' }} to={`/reviews`}>
              <button className="std-btn">&#x2190; Back to Reviews</button>
            </Link>
            <div className="postContainer">
                <div className="post">
                    <section className="px-3">
                        <div className="row justify-content-between">
                            <div className="titleANDPostTag">
                                <h1 className="text-secondary">{review.title}</h1>
                            </div>
                            <h1 className="text-black-50">{review.frequency.name}</h1>
                        </div>
                        <div className="row justify-content-between">
                            <p className="text-black-50">Experience Date {new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</p>
                        </div>
                        <p className="text-secondary">DISPLAY NAME: {review.userProfile.displayName}</p>
                        <div className="row postBtns justify-content-between">
                            <Link to={`/reviews`}><Button type="button" color="warning">Back to Reviews</Button></Link>
                            <div>
                                <a href={`/reviews/edit/${review.id}`} className="btn btn-outline-primary mx-1" title="Edit">
                                    <i className="fas fa-pencil-alt">Edit</i>
                                </a>
                                <a href={`/reviews/delete/${review.id}`} className="btn btn-outline-primary mx-1" title="Delete">
                                    <i className="fas fa-trash">Delete</i>
                                </a>
                            </div>
                        </div>
                        <section className="row justify-content-center">
                            {/* <div>
                                <img src={review.imageLocation} />
                            </div> */}
                        </section>
                    </section>
                    <hr />

                    <section className="row post__content">
                        <p className="col-sm-12 mt-5">{review.content}</p>
                    </section>


                    {/* <a href={`/posts/details/${post.id}/posttags`} className="btn btn-outline-primary mx-1">View Tags</a> */}
                    <a href={`/review/${review.id}/comments`} className="btn btn-outline-primary mx-1">View Comments</a>
                </div>
            </div>
        </>
    )
}