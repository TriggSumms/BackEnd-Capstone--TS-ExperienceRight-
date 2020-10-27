import React, { useContext, useEffect, useState } from "react";
import Business from "./Business";
import { BusinessContext } from "../../providers/BusinessProvider";
import { Link, useHistory } from "react-router-dom";


export default function BusinessList() {
  // const { posts, getAllPosts } = useContext(PostContext);
  // const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
  const { businesses, getAllBusinesses } = useContext(BusinessContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  

  
  

  useEffect(() => {
    getAllBusinesses();
  }, []);

  //if (sessionUser.userTypeId === 1) {
    return (
      <section>
        <div class="postCard">
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
                <h1>Listing out all the businesses in DB</h1>
              </div>
              <div>
                <p>
                  {/* <a class="btn-red" href="/businesses/userview">User View</a> */}
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
              {businesses.map(b =>
                <Business key={b.id} business={b} />
              )}
            </table>
          </div>
        </div>
      </section>
   
//   } else {
//     return (
//       <>
        // <div class="postCard">
        //   <div className="postHeader">
        //     <h1>Reviews</h1>
        //     <p>
        //       <Link class="btn-red" to="/reviews/add">New Review</Link>
        //     </p>
        //   </div>
        //   <section className="authorPostCards">
        //     {reviews.map(r =>
        //       <Review key={r.id} review={r} />
        //     )}
        //   </section>
        // </div>
    //   </>
   
              )
  }

