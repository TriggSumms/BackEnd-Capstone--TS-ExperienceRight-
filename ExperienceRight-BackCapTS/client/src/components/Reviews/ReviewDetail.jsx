import React, { useContext, useEffect, useState } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
import { CommentContext } from "../../providers/CommentProvider";
//import { UserProfile } from "../../providers/ UserProfile ";
import { Card, CardBody, Button, ListGroup } from "reactstrap";
import DetailsViewComment from "../Comments/DetailsViewComment";
import { useParams, Link } from "react-router-dom";
import ReactStars from 'react-stars'
import { render } from 'react-dom'
import "./ReviewDetailContent.scss";



export default function ReviewDetail() {
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { comments, getAllCommentsByReviewId } = useContext(CommentContext);
    const { review, getById } = useContext(ReviewContext);
    const { id } = useParams();
    const parsedId = parseInt(id)
    let RandomProfileImage = ['https://res.cloudinary.com/triggsumms/image/upload/v1604257859/qgozormcgwwr80iyllqr.png', 'https://res.cloudinary.com/triggsumms/image/upload/v1604259136/abcxlwlas8lakm6bl7kc.png', 'https://res.cloudinary.com/triggsumms/image/upload/v1604297221/hobklkiykqpk98xlitiq.png'];
    let randomProfiles = RandomProfileImage[Math.floor(Math.random() * RandomProfileImage.length)];





    useEffect(() => {
        getById(id)

    }, []);

    useEffect(() => {
        getAllCommentsByReviewId(id);

    }, []);








    const starRepresentation = {
        size: 25,
        count: 10,
        //char: '',
        // color1: '#ff9900',
        // color2: '#6599ff',
        edit: false,
        half: false
    }

    // console.log("Testing", business)

    //console.log("Testing2", sessionUser)

    // we need the if statement to return true on the first render.
    // so we must include !post.userProfile because react will not let us
    // ask for the property of an undefined object

    if (!review || !review.userProfile) {
        return null
    }


    if (sessionUser.id === review.userProfileId && sessionUser.userTypeId === 2) {
        return (
            <>
                <Link style={{ textDecoration: 'none' }} to={`/reviews`}>
                    <button className="std-btn">&#x2190; Back to Reviews</button>
                </Link>
<br></br>
                <Link style={{ textDecoration: 'none' }}  to={`/businesses/details/${review.businessId}`}>
                     <button className="std-btn">&#x2190; Back to Business</button>
                </Link>
                <div className="postContainer">
                    <div className="post">
                        <section className="px-3">
                            <div className="row justify-content-between">
                                <div className="">
                                    <h1 className="text-secondary"><img className="reviewAvatar" src={randomProfiles} alt="image" />...{review.title}</h1>
                                </div>

                                <div className="authorPostHeaderRight">
                                    <br></br> {/* <h5>Rate:{review.rating}/10</h5> */}
                                    <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating)} /></h5>
                                    <br></br>
                                    <br></br>
                                    <em>Posted Date:{new Intl.DateTimeFormat('en-US').format(new Date(review.createDateTime))}</em>
                                    <br></br>
                                    <i>Date of Experience:{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                                    <br></br>
                                    <i>Customer visit's a Month:<b>{review.frequency.name}</b></i>
                                    <br></br>
                                    <i>Business Reviewed: {review.business.establishmentName}</i>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                {/* <h1 className="text-black-50">FREQ:{review.frequency.name}</h1> */}
                                {/* <p className="text-black-50">Experience Date {new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</p> */}
                            </div>
                            {/* <p className="text-secondary">DISPLAY NAME: {review.userProfile.displayName}</p> */}

                            <div className="row postBtns justify-content-between">
                                <div>
                                    {/* BEGIN CONTENT TARGET */}
                                    <div class="row">
                                        <div class="box box--cta">
                                            <div class="content text--centered">
                                                <p>{review.content}</p>
                                                {/* <a href="#" class="button button--info text--uppercase">Learn More</a> */}
                                            </div>
                                        </div>
                                        <div class="image-wrap">
                                        </div>
                                    </div>
                                </div>
                                {/* END CONTENT TARGET */}
                                <div>
                                    <a href={`/reviews/edit/${review.id}`} className="btn btn-outline-primary mx-1" title="Edit">
                                        <i className="fas fa-pencil-alt">Edit</i>
                                    </a>
                                    <a href={`/reviews/delete/${review.id}`} className="btn btn-outline-primary mx-1" title="Delete">
                                        <i className="fas fa-trash">Delete</i>
                                    </a>
                                </div>
                            </div>
                        </section>
                        <hr />
                        <section className="row justify-content-center">
                            <h1>Business Response: </h1>
                            {comments.map(c => {
                                return <DetailsViewComment key={c.id} DetailsViewComment={c} />
                            })}
                        </section>
                        {/* <a href={`/posts/details/${post.id}/posttags`} className="btn btn-outline-primary mx-1">View Tags</a> */}
                        {/* <Link to={`/businesses/details/${review.businessId}`}><Button type="button" color="warning">Back to Business Page</Button></Link> */}
                        {/* <a href={`/review/${review.id}/comments`} className="btn btn-outline-primary mx-1">View Business Response</a> */}

                    </div>
                </div>
            </>
        );
    }
    // else if (review.businessId === sessionUser.businessId && sessionUser.userTypeId === 1) {
    // else if (review.businessId === userProfile.businessId && sessionUser.userTypeId === 1) {
    else if (sessionUser.userTypeId === 1) {
        return (
            <>

                <div className="postContainer">
                    <div className="post">
                        <section className="px-3">
                            <div className="row justify-content-between">
                                <div className="titleANDPostTag">
                                    <h1 className="text-secondary"><img className="reviewAvatar" src={randomProfiles} alt="image" />...{review.title}</h1>
                                    {/* <br></br> */}

                                </div>
                                <div className="authorPostHeaderRight">
                                    {/* <h5>Rate:{review.rating}/10</h5> */}
                                    <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating)} /></h5>
                                    <br></br>
                                    <br></br>
                                    <em>Posted Date:{new Intl.DateTimeFormat('en-US').format(new Date(review.createDateTime))}</em>
                                    <br></br>
                                    <i>Date of Experience:{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                                    <br></br>
                                    <i>Customer visit's a Month:<b>{review.frequency.name}</b></i>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                            </div>
                            <div className="row postBtns justify-content-between">
                                <div>
                                    {/* BEGIN CONTENT TARGET */}
                                    <div class="row">
                                        <div class="box box--cta">
                                            <div class="content text--centered">
                                                <p>{review.content}</p>
                                                {/* <a href="#" class="button button--info text--uppercase">Learn More</a> */}
                                            </div>
                                        </div>
                                        <div class="image-wrap">
                                        </div>
                                    </div>
                                </div>
                                {/* END CONTENT TARGET */}
                            </div>

                            <div>
                           </div>
                            <div>
                            </div>
                        </section>
                        <hr />

                        <section className="row justify-content-center">
                            <h1>Business Response: </h1>
                        </section>
                        <section className="row justify-content-center">
                            {/* {sessionUser.businessId === review.businessId ? "" :<> */}
                            <a href={`/review/${review.id}/comments`} className="btn btn-outline-primary mx-1">View & Write Comments</a>
                            <Link to={`/businesses/details/${review.businessId}`}><Button type="button" color="warning">Back to Your Profile</Button></Link>
                            {comments.map(c => {
                                return <DetailsViewComment key={c.id} DetailsViewComment={c} />
                            })}
                        </section>
                    </div>
                </div>
            </>
        );
    }
    //Made Null Route In Case I make a subuser
    else {
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
                                    <h1 className="text-secondary"><img className="reviewAvatar" src={randomProfiles} alt="image" />...{review.title}</h1>
                                </div>
                                <div className="authorPostHeaderRight">
                                    {/* <h5>Rate:{review.rating}/10</h5> */}
                                    <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating)} /></h5>
                                    <br></br>
                                    <br></br>
                                    <em>Posted Date:{new Intl.DateTimeFormat('en-US').format(new Date(review.createDateTime))}</em>
                                    <br></br>
                                    <i>Date of Experience:{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                                    <br></br>
                                    <i>Customer visit's a Month:<b>{review.frequency.name}</b></i>
                                    <br></br>
                                    <i>Business Reviewed: {review.business.establishmentName}</i>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                            </div>
                            {/* <p className="text-secondary">DISPLAY NAME: {review.userProfile.displayName}</p> */}

                            <div className="row postBtns justify-content-between">
                                <div>
                                    {/* BEGIN CONTENT TARGET */}
                                    <div class="row">
                                        <div class="box box--cta">
                                            <div class="content text--centered">
                                                <p>{review.content}</p>
                                                {/* <a href="#" class="button button--info text--uppercase">Learn More</a> */}
                                            </div>
                                        </div>
                                        <div class="image-wrap">
                                        </div>
                                    </div>
                                </div>
                                {/* END CONTENT TARGET */}
                            </div>
                        </section>
                        <hr />
                        <section className="row justify-content-center">
                            <h1>Business Response: </h1>
                            {comments.map(c => {
                                return <DetailsViewComment key={c.id} DetailsViewComment={c} />
                            })}
                        </section>


                        {/* <a href={`/posts/details/${post.id}/posttags`} className="btn btn-outline-primary mx-1">View Tags</a> */}
                        {/* <Link to={`/businesses/details/${review.businessId}`}><Button type="button" color="warning">Back to Business Page</Button></Link>
                        <a href={`/review/${review.id}/comments`} className="btn btn-outline-primary mx-1">View Business Response</a> */}

                    </div>
                </div>
            </>
        );
    }
}
