// import React, { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import { CommentContext } from "../../providers/CommentProvider";
// import { Card, CardBody, Button } from "reactstrap";

// const DeleteComment = () => {
//     let userId = sessionStorage.userProfileId
//     console.log(userId);
//     //id of comment to delete
//     const { id } = useParams();
//     console.log(id);
//     const history = useHistory();
//     const [comment, setComment] = useState();
//     const { getCommentById, deleteComment } = useContext(CommentContext);
//     const { reviewId, reviewId } = useParams();

//     useEffect(() => {
//         getCommentById(reviewId).then(setComment);
//     }, []);

//     const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

//     //delete comment function
//     const deleteAComment = (id) => {
//         deleteComment(commentId)
//             .then(() => history.push(`/reviews/${reviewId}/comments`))
//     }

//     if (!comment) {
//         return null;
//     }

//     if (currentUser !== comment.userProfileId) {
//         return null;
//     }

//     const publishDate = new Date(comment.createDateTime)
//     console.log(publishDate);
//     const CreateDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`


//     return (
//         <>
//             <Card>
//                 <CardBody>
//                     <h3>Are you sure you want to delete your comment ? </h3>
//                     <h6>Subject</h6>
//                     <p>{comment && comment.subject}</p>
//                     <h6>Comment</h6>
//                     <p>{comment && comment.content}</p>
//                     <h6>DisplayName</h6>
//                     <p>DisplayName: {comment.userProfile.firstName} {comment.userProfile.lastName}</p>
//                     <h6>Date</h6>
//                     <div>Created on: {CreateDate}</div>
//                 </CardBody>
//                 <Button block className="deleteCommentButton" type="button" color="danger" onClick={deleteAComment}>
//                     {'Delete Comment'}
//                 </Button>

//                 <Button block className="returnToListButton" type="button" color="success" onClick={() => history.goBack()}>
//                     {'Cancel'}
//                 </Button>

//             </Card>
//         </>
//     )

// };

// export default DeleteComment;