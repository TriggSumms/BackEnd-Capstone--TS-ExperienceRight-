import React, { useContext, useEffect, useState } from "react";
import Review from "../Reviews/Review"
import { BusinessContext } from "../../providers/BusinessProvider";
import { ReviewContext } from "../../providers/ReviewProvider";
import { useParams, Link, useHistory } from "react-router-dom";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import "./BusinessProfile.scss";
import ReactStars from 'react-stars'
import { render } from 'react-dom'


export default function BizProfileForReviewer() {
  const { reviews, reviewz, getAllReviewsforBusiness } = useContext(ReviewContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { business, getBusinessById,  } = useContext(BusinessContext);
  const [review, setReview] = useState({});
  const [rating, SetRating] = useState("");
  const { id } = useParams();

  //const [rating, setRating] = useState();







  useEffect(() => {
    getBusinessById(id)
  }, []);


  useEffect(() => {
    getAllReviewsforBusiness(id);
  }, []);



// console.log("TESTSESSIONUSERONPROFILE", sessionUser.id)
// console.log("TESTBUIZNESSONPROFILE", business)




  //START RATING AVERAGE

  const reviewTotalRatingAvg = reviews.map(y => y.rating)
  let sum = 0;
  for (let num of reviewTotalRatingAvg) {
    sum = sum + num
  }
  const averageRating = sum / reviews.length
  
//Physical Representation Below




  // const parsedRating = parseInt(rating);
  // review.rating = parsedRating;

  const starRepresentation = {
      size: 35,
      count: 10,
      //char: '',
      // color1: '#ff9900',
      // color2: '#6599ff',
      edit: false,
      half: false
  }
  //END RATING AVERAGE

  

  if (!business || !business.userProfile) {
    return null
  }

  return (

    <>

      <section>
        <div class="postCard">
          <div></div>
          <div className="postHeader">
            <div className="postHeaderDetails">
              <div>
                {/* <h1>Business</h1> */}
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
                 <ReactStars {...starRepresentation}  value= {averageRating}  /> </div>
                  
                </div>
                <div class="actions">
                  <div class="ratings">
                    <span class="rating-count"></span>
                    {parseInt(sessionUser.userTypeId) == 1 ?  
                    <>
                        <Link to={`/businesses/edit/${id}`}><img src="https://img.icons8.com/ultraviolet/30/000000/edit-property.png" /></Link>
                    </>
                    :
                    <>
                     {/* <img className="imageBackground" src='https://res.cloudinary.com/triggsumms/image/upload/v1604283545/cxrzg3xo5bttl94zb2hz.jpg' alt="image" />  */}
                     </>
                }
                  </div>
                  <div class="comments">
                    <span class="comment-count"><strong>{reviews.length}</strong> Reviews</span>
                  </div>
                  <div class="appo">
                  {parseInt(sessionUser.userTypeId) == 2 ?  
                    <>
                         <a class="btn"><Link class="btn" to={`/reviews/add/${id}`}>Add Review</Link></a>
                    </>
                    :
                   <>
                   <em></em>
                    </> 
                }
                  </div>
                </div>
                <div class="locations">
                  <div>Business Bio: {business.bio}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="toggle">
          </div>
          <div className="post-container">
            <table className="postTable">
              <thead className="postTableHeader">
                <tr>
                  <th className="postTitle-header">
                    REVIEW COLLECTION:
              </th>   
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