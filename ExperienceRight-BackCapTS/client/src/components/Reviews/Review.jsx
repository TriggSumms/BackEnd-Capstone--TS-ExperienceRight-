import React, { useContext, useEffect } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
import { BusinessContext } from "../../providers/BusinessProvider";
import { CommentContext } from "../../providers/CommentProvider";
import { Card, CardBody, Button } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import ReactStars from 'react-stars'
import { render } from 'react-dom'
import CommentAlertONComment from "../Comments/CommentAlertONReview";


export default function Review({ review }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  const { updateReview, getAllReviews } = useContext(ReviewContext);
  const { business } = useContext(BusinessContext);
  const { comments, getAllComments, getAllCommentsByReviewId } = useContext(CommentContext);
  const history = useHistory();
  let RandomProfileImage = ['https://res.cloudinary.com/triggsumms/image/upload/v1604257859/qgozormcgwwr80iyllqr.png', 'https://res.cloudinary.com/triggsumms/image/upload/v1604259136/abcxlwlas8lakm6bl7kc.png', 'https://res.cloudinary.com/triggsumms/image/upload/v1604297221/hobklkiykqpk98xlitiq.png'];
  let randomProfiles = RandomProfileImage[Math.floor(Math.random() * RandomProfileImage.length)];


  //   useEffect(() => {

  //      getAllCommentsByReviewId(review.id)
  // }, [])







  const starRepresentation = {
    size: 25,
    count: 10,
    //char: '',
    // color1: '#ff9900',
    // color2: '#6599ff',
    edit: false,
    half: false
  }



  if (sessionUser.id === review.userProfile.id && sessionUser.userTypeId === 2) {
    return (
      <>
        <div className="theUserSpecificREviewsGlowtoSetOtherstoShame">
          
            {/* <img className="reviewAvatar" src={defaultImage} alt="image" /> */}
          
          <div className="authorPostItem">
            <div className="authorButtonsOverlay">
              <div className="imageButtonHeader">
                <a className="postImagePreview" href={`/reviews/details/${review.id}`}>   
                </a>
                <div className="authorButtons">
                  <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/reviews/edit/${review.id}`}>
                    <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png" />
                  </Link>
                  <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/reviews/delete/${review.id}`}>
                    <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete" />
                  </Link>
                  <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/reviews/details/${review.id}`}>
                    <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121574/icons/eye_rimwzo.png" alt="details" />
                  </Link>
                </div>
              </div>
              <div className="authorPostDetails">
                <div className="authorPostItems">
                  <div className="authorPostHeaderLeft">
                  
                    <h5 className="apht"> <img className="reviewAvatar" src={randomProfiles} alt="image" />...{review.title}</h5>
                    <i>Business Reviewed: {review.business.establishmentName}</i>
                    <br></br>
                    <em className="ALittleSpaceBetweenIcons"><img src="https://img.icons8.com/windows/22/000000/user-lock--v1.png" /></em>
                    {/* {review.userProfile.fullName}  */}

                    {/* {review.businessId >= 1
                      ? <em className="admin"></em> :
                      <em className="ALittleSpaceBetweenIconsTWO"><img src="https://img.icons8.com/fluent/30/000000/important-mail.png" /></em>} */}
                  </div>
                  <div className="authorPostHeaderRight">
                    {/* <h5>Rate:{review.rating}/10</h5> */}
                    <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating)} /></h5>
                    {/* <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating / 2)} /></h5> */}
                    <br></br>
                    <br></br>
                    <em>Posted Date:{new Intl.DateTimeFormat('en-US').format(new Date(review.createDateTime))}</em>
                    <br></br>
                    <i>Date of Experience:{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                  </div>
                  {/* {parseInt(review.commentlength)} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  else if (sessionUser.userTypeId === 1) {
    return (
      <>
        <div className="authorPostItem">
          <div className="authorButtonsOverlay">
            <div className="imageButtonHeader">
              <a className="postImagePreview" href={`/reviews/details/${review.id}`}>
                {/* <img className="imageBackground" src={post.imageLocation} alt="image"/> */}
              </a>
              {/* } */}

              <div className="authorButtons">
                <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/reviews/details/${review.id}`}>
                  <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121574/icons/eye_rimwzo.png" alt="details" />
                </Link>
              </div>
            </div>
            <div className="authorPostDetails">
              <div className="authorPostItems">
                <div className="authorPostHeaderLeft">
                <h5 className="apht"> <img className="reviewAvatar" src={randomProfiles} alt="image" />...{review.title}</h5>
                  <i>Business Reviewed: {review.business.establishmentName}</i>
                  <br></br>
                  <em className="ALittleSpaceBetweenIcons"><img src="https://img.icons8.com/windows/22/000000/user-lock--v1.png" /></em>
                  {/* {review.userProfile.fullName}  */}
                  {/* {review.businessId.comment.length > 1 */}
                  {/* {review.businessId <= 1
                    ? <em className="admin"></em> :
                    <em className="ALittleSpaceBetweenIconsTWO"><img src="https://img.icons8.com/cotton/24/000000/check-inbox--v2.png" /></em>} */}
                </div>
                <div className="authorPostHeaderRight">
                  {/* <h5>Rate:{review.rating}/10</h5> */}
                  <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating)} /></h5>
                   {/* <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating / 2)} /></h5> */}
                  <br></br>
                  <br></br>
                  <em>Posted Date:{new Intl.DateTimeFormat('en-US').format(new Date(review.createDateTime))}</em>
                  <br></br>
                  <i>Date of Experience:{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  //MADE THIS ROUTE IN CASE I WANT TO INTRODUCE A SUBSET USER
  else {
    return (
      <>
        <div className="authorPostItem">
          <div className="authorButtonsOverlay">
            <div className="imageButtonHeader">
              <a className="postImagePreview" href={`/reviews/details/${review.id}`}>
                {/* <img className="imageBackground" src={post.imageLocation} alt="image"/> */}
              </a>
              {/* } */}

              <div className="authorButtons">
                <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/reviews/details/${review.id}`}>
                  <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121574/icons/eye_rimwzo.png" alt="details" />
                </Link>
              </div>
            </div>
            <div className="authorPostDetails">
              <div className="authorPostItems">
                <div className="authorPostHeaderLeft">
                <h5 className="apht"> <img className="reviewAvatar" src={randomProfiles} alt="image" />...{review.title}</h5>
                  <i>Business Reviewed: {review.business.establishmentName}</i>
                  <br></br>
                  <em className="ALittleSpaceBetweenIcons"><img src="https://img.icons8.com/windows/22/000000/user-lock--v1.png" /></em>
                  {/* {review.userProfile.fullName}  */}
                  {/* {reviewId > 1? <em className="admin"></em> :<em className="ALittleSpaceBetweenIconsTWO"><img src="https://img.icons8.com/carbon-copy/35/000000/favorite-chat.png" /></em>} */}
                </div>
                {/* {comments.map(c => {
                                return <CommentAlertONComment key={c.id} CommentAlertONComment={c} review={review} />
                            })} */}
                <div className="authorPostHeaderRight">
                  {/* <h5>Rate:{review.rating}/10</h5> */}
                  <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating)} /></h5>
                   {/* <h5 className="float-right"><ReactStars {...starRepresentation} value={parseInt(review.rating / 2)} /></h5> */}
                  <br></br>
                  <br></br>
                  <em>Posted Date:{new Intl.DateTimeFormat('en-US').format(new Date(review.createDateTime))}</em>
                  <br></br>
                  <i>Date of Experience:{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                </div>
                {/* {parseInt(review.comment.length)} */}
              </div>
            </div>
          </div>
        </div>
      </>

    );
  }
}
