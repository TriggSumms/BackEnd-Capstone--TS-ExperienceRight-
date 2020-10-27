import React, { useContext, useEffect, useState } from "react";
import Review from "./Review";
import { ReviewContext } from "../../providers/ReviewProvider";
import { Link, useHistory } from "react-router-dom";


export default function ProfileReviewList() {
  // const { posts, getAllPosts } = useContext(PostContext);
  // const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
  const { reviews, getAllReviews } = useContext(ReviewContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  

  
  

  useEffect(() => {
    getAllReviews();
  }, []);

//   if (sessionUser.userTypeId === 1) {
    return (

        <>
        
     <section>
        <div class="postCard">
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
                <h1>Business</h1>
              </div>
              <div>
                <p>
                  <a class="btn-red" href="/reviews/userview">User View</a>
                </p>
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
