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
                                        {/* <img className="imageBackground" src={userProfile.profileImageLocation} alt="image" /> */}
                                    </div>
                                    <header class="profile-header group" id="profile-header">
                                        <div class="profile-header-content">
                                            <a href="/netsi1964/settings/profile/" class="button button-outline edit-profile-link" id="edit-profile-link"></a>
                                            <div class="profile-name" id="profile-name">
                                                <h1 id="profile-name-header">
                                                    
                                                    Welcome,
                                                    <br></br>{(JSON.parse(userProfile).firstName)}
                                                    <span class="profile-badges" id="profile-badges">
                                                        <a id="profile-badge-pro" href="/helloreviewer" class="badge badge-pro" title="Member Since October 11, 2012">
                                                           to  ExperienceRight</a>
                                                    </span>
                                                </h1>
                                                <div class="profile-username-area" id="profile-username-area">
                                                    <span class="profile-username" id="profile-username">{(JSON.parse(userProfile).email)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </header>

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
                                        <span class="rating-count">000 Ratings</span>
                                    </div>
                                    <div class="comments">
                                        <span class="comment-count"><strong>{reviews.length}</strong> Reviews Made</span>
                                    </div>
                                    {/* <div class="consultation">
				<span class="fee"><strong>34K</strong>Followers</span>
			</div> */}
                                    <div class="appo">
                                 
                    <a class="btn"><Link class="btn" to={`/businesses`}>Check Out Local Business's</Link></a>
                  
                                    </div>
                                </div>
                                <div class="locations">

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="post-container">
                        <table className="postTable">
                            <thead className="postTableHeader">
                                <tr>
                                    <th className="postTitle-header">
                                        User Specific Reviews
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