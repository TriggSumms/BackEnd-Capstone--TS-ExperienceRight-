import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Card, CardBody, Button } from "reactstrap";
import { Link } from "react-router-dom";

const CommentDelete = () => {
    let userId = sessionStorage.userProfileId

    //id of comment to delete
    const history = useHistory();
    const [comment, setComment] = useState();
    const { getCommentById, deleteComment } = useContext(CommentContext);
    const { reviewId, commentId } = useParams();

    useEffect(() => {
        getCommentById(commentId).then(setComment);
    }, []);

    console.log(comment)
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;

    //delete comment function
    const deleteAComment = (id) => {
        deleteComment(commentId)
            .then(() => history.push(`/review/${reviewId}/comments`))
    }

    if (!comment) {
        console.log("testing")
        return null;
    }

    // if (currentUser !== comment.userProfileId) {
    //     return null;
    // }

    const publishDate = new Date(comment.createDateTime)
    console.log(publishDate);
    const CreateDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`

    return (
        <>
            <Card>
                <CardBody>
                    <h3>Are you sure you want to delete your comment ? </h3>
                    <h6>Subject</h6>
                    <p>{comment && comment.subject}</p>
                    <h6>Comment</h6>
                    <p>{comment && comment.content}</p>
                    <h6>Author</h6>
                    <p>Author: {comment.userProfile.firstName} {comment.userProfile.lastName}</p>
                    <h6>Date</h6>
                    <div>Created on: {CreateDate}</div>
                </CardBody>
                {(currentUser === comment.userProfileId) ?
                    <Button onClick={deleteAComment} color="danger" className="commentButton">Delete</Button> : <p>a</p>}

                <Link to={`/review/${reviewId}/comments`}>
                    <Button color="secondary" className="commentButton">Back</Button>
                </Link>

            </Card>
        </>
    )

};

export default CommentDelete;