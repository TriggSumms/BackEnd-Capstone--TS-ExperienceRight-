import React, { useContext } from "react";
import { ReviewContext } from "../../providers/ReviewProvider";
import { Card, CardBody, Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";



export default function Review({ review }) {
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
  //const defaultImage = 'https://res.cloudinary.com/dhduglm4j/image/upload/v1602603540/tabloid_euehri.png';
  const { updateReview } = useContext(ReviewContext);
  const history = useHistory();



  // const editedPost = {
  //   title: post.title,
  //   content: post.content,
  //   imageLocation: post.imageLocation,
  //   createDateTime: post.createDateTime,
  //   publishDateTime: post.publishDateTime,
  //   categoryId: post.categoryId,
  //   userProfileId: post.userProfileId,
  //   id: post.id,
  //   isApproved: post.isApproved
  // };

  // const EditReview = (e) => {
  //   console.log(editedPost)
  //   editedPost.isApproved = true;    
  //   updatePost(post.id, editedPost)
  //   .then(() => {
  //     history.go(`/posts/unapproved`);}
  //     )
  // }


  if (sessionUser.userTypeId === 2) {
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

                <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/reviews/edit/${review.id}`}>
                  <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121858/icons/edit_oeexa4.png" />
                </Link>

                <Link className="authorBtn" style={{ textDecoration: 'none' }} to={`/reviews/delete/${review.id}`}>
                  <img className="postAuthorBtn" src="https://res.cloudinary.com/dhduglm4j/image/upload/v1603121902/icons/delete_mr2ko5.png" alt="delete" />
                </Link>


              </div>
            </div>
            <div className="authorPostDetails">
              <div className="authorPostItems">
                <div className="authorPostHeaderLeft">
                  <h5 className="apht">{review.title}</h5>
                  <em className="postsAuthor"><img src="https://img.icons8.com/windows/22/000000/user-lock--v1.png" /></em>
                  {/* {review.userProfile.fullName}  */}
                </div>
                <div className="authorPostHeaderRight">
                  <h5>Rate:{review.rating}/10</h5>
                  <i>{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
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
                  <h5 className="apht">{review.title}</h5>
                  <em className="postsAuthor"><img src="https://img.icons8.com/windows/22/000000/user-lock--v1.png" /></em>
                  {/* {review.userProfile.fullName}  */}
                </div>
                <div className="authorPostHeaderRight">
                  <h5>Rate:{review.rating}/10</h5>
                  <i>{new Intl.DateTimeFormat('en-US').format(new Date(review.dateOfExperience))}</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  else {
    return null
  }
}
