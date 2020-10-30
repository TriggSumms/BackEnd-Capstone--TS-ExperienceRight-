import React, { useContext, useEffect } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
import { CommentContext } from "../../providers/CommentProvider";
import { Card, CardBody, Button } from "reactstrap";
import { Link, useHistory, useParams } from "react-router-dom";



export default function Review({ review }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  //const defaultImage = 'https://res.cloudinary.com/dhduglm4j/image/upload/v1602603540/tabloid_euehri.png';
  const { updateReview, getAllReviews } = useContext(ReviewContext);
  // const { comment, getAllCommentsByReviewId } = useContext(CommentContext);
  const history = useHistory();
  const { ReviewId } = useParams();


//   useEffect(() => {
//     getAllCommentsByReviewId(ReviewId)
// }, [])



//console.log("Test", comment.reviewId)



  if (sessionUser.id === review.userProfile.id) {
    return (
      <>
      <div className="theUserSpecificREviewsGlowtoSetOtherstoShame">
        <div className="authorPostItem">
          <div className="authorButtonsOverlay">
            <div className="imageButtonHeader">
              <a className="postImagePreview" href={`/reviews/details/${review.id}`}>
                {/* <img className="imageBackground" src={post.imageLocation} alt="image"/> */}
              </a>
              {/* } */}
    
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
                  <h5 className="apht">Title: {review.title}</h5>
                  <em className="ALittleSpaceBetweenIcons"><img src="https://img.icons8.com/windows/22/000000/user-lock--v1.png"/></em>
                  {/* {review.userProfile.fullName}  */}

                  {review.businessId >= 1
                ? <em className="admin"></em> :
                <em className="ALittleSpaceBetweenIconsTWO"><img src="https://img.icons8.com/fluent/30/000000/important-mail.png"/></em>}
                </div>
                <div className="authorPostHeaderRight">
                  <h5>Rate:{review.rating}/10</h5>
                  <i>Date of Experience:{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                </div>
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
                  <h5 className="apht">Title: {review.title}</h5>
                  <em className="ALittleSpaceBetweenIcons"><img src="https://img.icons8.com/windows/22/000000/user-lock--v1.png" /></em>
                  {/* {review.userProfile.fullName}  */}
                  {/* {review.businessId.comment.length > 1 */}
                  {review.businessId <= 1
                ? <em className="admin"></em> :
                <em className="ALittleSpaceBetweenIconsTWO"><img src="https://img.icons8.com/cotton/24/000000/check-inbox--v2.png"/></em>}
                </div>
                <div className="authorPostHeaderRight">
                  <h5>Rate:{review.rating}/10</h5>
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
    return(
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
                  <h5 className="apht">Title: {review.title}</h5>
                  <em className="ALittleSpaceBetweenIcons"><img src="https://img.icons8.com/windows/22/000000/user-lock--v1.png" /></em>
                  {/* {review.userProfile.fullName}  */}
                  {review.businessId <= 1
                ? <em className="admin"></em> :
                <em className="ALittleSpaceBetweenIconsTWO"><img src="https://img.icons8.com/carbon-copy/35/000000/favorite-chat.png"/></em>}
                </div>
                <div className="authorPostHeaderRight">
                  <h5>Rate:{review.rating}/10</h5>
                  <i>Date of Experience:{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

    );
  }
}
