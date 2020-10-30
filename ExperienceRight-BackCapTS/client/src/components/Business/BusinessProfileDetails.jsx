import React, { useContext, useEffect, useState } from "react";
import Review from "../Reviews/Review"
import { BusinessContext } from "../../providers/BusinessProvider";
import { ReviewContext } from "../../providers/ReviewProvider";
import { useParams, Link, useHistory } from "react-router-dom";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import "./BusinessProfile.scss";


export default function BusinessProfileDetails() {
  // const { posts, getAllPosts } = useContext(PostContext);
  // const userProfile = JSON.parse(sessionStorage.getItem("userProfile"))
  const { reviews, getAllReviewsforBusiness } = useContext(ReviewContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { business, getBusinessById } = useContext(BusinessContext);
  const { id } = useParams();


  console.log("whats in sessionstorage", sessionStorage)

  useEffect(() => {
    getBusinessById(id)
  }, []);


  useEffect(() => {
    getAllReviewsforBusiness(id);
  }, []);


  if (!business || !business.userProfile) {
    return null
  }



  console.log(business.rating)

  return (

    <>

      <section>
        
        <div class="postCard">
          <div></div>
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
                <h1>Business</h1>
              </div>
              <div class="doctor-card">
                <div class="info">
                  <div class="avatar">
                    <img className="imageBackground" src={business.userProfile.profileImageLocation} alt="image" />
                  </div>
                  <div class="details">
                    <div class="name">{business.establishmentName}</div>

                    <div class="meta-info">
                      <span class="sp">{business.category.name}</span>
                      <div>
                        <span class="exp-yr">Hours of Business: {business.hoursOfOperation}</span>
                      </div>

                      <span class="exp-yr">* {business.address}</span>
                      <div>
                      </div>
                      <span class="exp-yr">Phone: {business.phone}</span>
                    </div>
                    <div>
                      <span class="prac-area"> XR Member Since: {new Intl.DateTimeFormat('en-US').format(new Date(business.userProfile.createDateTime))}</span>
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
                    <span class="rating-count">000 Ratings</span>
                  </div>
                  <div class="comments">
                    <span class="comment-count"><strong>{reviews.length}</strong> Review</span>
                  </div>
                  {/* <div class="consultation">
				<span class="fee"><strong>34K</strong>Followers</span>
			</div> */}
                  <div class="appo">
                    <a href="#" class="btn"><Link class="btn" to={`/reviews/add/${business.id}`}>Add a Review</Link></a>
                  </div>
                </div>
                <div class="locations">
                <Link to={`/businesses/edit/${id}`}><img src="https://img.icons8.com/ultraviolet/30/000000/edit-property.png"/></Link>
               
                 <div>Business Bio: {business.bio}</div> 
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
                    REVIEW COLLECTION:
              </th>   {/*
                  <th className="postUserName-header">
                    DisplayName
                </th>
                  <th className="postCategory-header">
                    Frequency Of Visits
                </th>
                  <th className="postDate-header">
                    Experience Date
                </th>
                  <th></th> */}
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