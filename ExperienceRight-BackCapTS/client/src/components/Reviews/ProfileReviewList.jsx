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
              </div>

            </div>

          </div>
          <div className="post-container">
            <table className="postTable">
              <thead className="postTableHeader">
                <tr>
                  <th className="postTitle-header">
                    All Reviews
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
