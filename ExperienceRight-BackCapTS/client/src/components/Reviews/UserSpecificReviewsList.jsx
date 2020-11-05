import React, { useContext, useEffect, useState } from "react";
import Review from "../Reviews/Review"
import { ReviewContext } from "../../providers/ReviewProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, Link, useHistory } from "react-router-dom";
// import "../Business/BusinessProfile.scss";
import "./UserSpecificReviewsPage.scss";


export default function UserSpecificReviewsList() {
    // const { posts, getAllPosts } = useContext(PostContext);
    // const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
    const { review, reviews, getAllReviewsforUserList } = useContext(ReviewContext);
    const { userProfile } = useContext(UserProfileContext);
    //const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));




    useEffect(() => {
        getAllReviewsforUserList(JSON.parse(userProfile).id);
    }, []);






    //   if (!review || !review.userProfile) {
    //     return null
    // }

    return (

        <>

            <section>
                <div class="postCard">
                    <div className="postHeader">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <div class="usercard">
                                        <div class="usercard-avatar">
                                            <img src="https://res.cloudinary.com/triggsumms/image/upload/v1604548891/gqnlntrlc0axvgtvk2yl.png" alt="" class="usercard-img"></img>
                                        </div>
                                        <div class="usercard-body">
                                            <h2 class="usercard-title">Welcome, {(JSON.parse(userProfile).firstName)}</h2>
                                            <span class="usercard-badge">Reviews Made: <strong>{reviews.length}</strong> </span>
                                            <br></br>
                                            <span class="usercard-badge">{(JSON.parse(userProfile).email)}</span>
                                            <br></br>
                                            <span class="usercard-badge">XR Member Since:{new Intl.DateTimeFormat('en-US').format(new Date(JSON.parse(userProfile).createDateTime))} </span>
                                            <div class="usercard-btn-container">
                                                <a ><Link class="btn" to={`/businesses`}>Check Out Businesses with XR</Link></a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>

                    </div>
                    <div className="post-container">
                        <table className="postTable">
                            <thead className="postTableHeader">
                                <tr>
                                    <th className="postTitle-header">
                                        Your Reviews
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            {reviews.map(r =>
                                <Review key={r.id} review={r} />
                            )}
                        </table>
                    </div>
                </div>

            </section>


        </>
    );
}