import React, { useContext, useEffect, useState } from "react";
import Review from "../Reviews/Review"
import { BusinessContext } from "../../providers/BusinessProvider";
import { ReviewContext } from "../../providers/ReviewProvider";
import { useParams, Link, useHistory } from "react-router-dom";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import "./BusinessProfile.scss";


export default function Business({ business }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  //const defaultImage = 'https://res.cloudinary.com/dhduglm4j/image/upload/v1602603540/tabloid_euehri.png';
  //const { updateReview } = useContext(ReviewContext);
  const { reviews, getAllReviewsforBusiness, getAllReviews } = useContext(ReviewContext);
  const {  getBusinessById } = useContext(BusinessContext);
  const { id } = useParams();
  const history = useHistory();

  //console.log("whats in sessionstorage", sessionStorage)


  useEffect(() => {
    getBusinessById(id)
  }, []);

     useEffect(() => {
    getAllReviews();
  }, []); 
  
  // var total = 0;
  // for(var i = 0; i < reviews.length; i++) {
  //     total += review[i];
  // }


  
  // var avg = total / reviews.length;
//   let reviewCountperBiz = business.reviews.filter(it => it.id.includes(''));

// console.log("count", reviewCountperBiz)
  


console.log(business)

    return (
      <>
       <div class="doctor-card"> 
         <div className="">
            <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/businesses/details/${business.id}`}>
              
               <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121574/icons/eye_rimwzo.png" alt="details"/> 
            </Link>
            {/* <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/posts/edit/${post.id}`}>
              <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png"/>
            </Link>
            <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/posts/delete/${post.id}`}>
              <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete"/>
            </Link>  */}
          </div> 

		<div class="info">
			<div class="avatar">
             <img className="imageBackground" src={business.userProfile.profileImageLocation} alt="image"/> 
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
				<span class="comment-count"><strong>{reviews.length}</strong> Reviews</span>
			</div>
			{/* <div class="consultation">
				<span class="fee"><strong>34K</strong>Followers</span>
			</div> */}
			<div class="appo">
      <a href={`/businesses/details/${business.id}`} className="btn btn-outline-primary mx-1">View Business Profile</a>
			</div>
		</div>
		<div class="locations">
      Business Bio: {business.bio}
  </div>
	</div>
    </>

    );
  } 

