import React, { useContext, useEffect, useState } from "react";
import Review from "../Reviews/Review"
import { ReviewContext } from "../../providers/ReviewProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { useParams, Link, useHistory } from "react-router-dom";
import "../Business/BusinessProfile.scss";


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
                        <div className="postHeaderDetails">
                            <div>
                          
                            </div>
                            <div class="doctor-card">
                                <div class="info">
                                    <div class="avatar">
                                        <img className="imageBackground" src={userProfile.profileImageLocation} alt="image" />
                                    </div>
                                    <div class="details">
                                    <h1>USER: {(JSON.parse(userProfile).displayName)}'s</h1>
                                <h3>....Remember your incongonito while utilizing<div>ExperienceRight</div> </h3>
                                        <div class="name">{userProfile.displayName}
                                        </div>

                                        <div class="meta-info">
                                            <span class="sp">{userProfile.email}</span>
                                            <div>

                                            </div>


                                            <div>
                                            </div>

                                        </div>
                                        <div>
                                            <span class="prac-area"> XR Member Since: {userProfile.createDateTime}</span>
                                        </div>
                                    </div>

                                </div>
                                <div class="actions">
                                    <div class="ratings">
                                        <span class="rating-control">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star-half-o"></i>
                                            <i class="fa fa-star-o"></i>
                                            <i class="fa fa-star-o"></i>
                                        </span>
                                        {/* <span class="rating-count">000 Ratings</span> */}
                                    </div>
                                    <div class="comments">
                                        <span class="comment-count"><strong>{reviews.length}</strong> Reviews Made</span>
                                    </div>
                                    {/* <div class="consultation">
				<span class="fee"><strong>34K</strong>Followers</span>
			</div> */}
                                    <div class="appo">
                                        {/* <a href="#" class="btn">Add Review</a> */}
                                    </div>
                                </div>
                                <div class="locations">

                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="toggle">
                        <div>
                            {/* <a href="/reviews/unapproved" className="unapprovedPosts">View All Unapproved</a> */}
                        </div>
                    </div>
                    <div className="post-container">
                        <table className="postTable">
                            <thead className="postTableHeader">
                                <tr>
                                    <th className="postTitle-header">
                                        Title
                </th>
                                    <th className="postUserName-header">
                                        DisplayName
                </th>
                                    <th className="postCategory-header">
                                        Frequency Of Visits
                </th>
                                    <th className="postDate-header">
                                        Experience Date
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