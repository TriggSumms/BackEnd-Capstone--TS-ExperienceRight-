import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

const CommentDelete = () => {
    const history = useHistory();
    const [comment, setComment] = useState();
    const { getCommentByIdFORDELETE, deleteComment } = useContext(CommentContext);
    const { reviewId, commentId } = useParams();
    const currentUser = JSON.parse(sessionStorage.getItem('userProfile')).id;


    useEffect(() => {
        getCommentByIdFORDELETE(commentId).then(setComment);
    }, []);

    const deleteAComment = (id) => {
        deleteComment(commentId)
            .then(() => history.push(`/review/${reviewId}/comments`))
    }

    if (!comment) {
        return null;
    }

    const publishDate = new Date(comment.createDateTime)
    const CreateDate = `${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}`

    return (
        <>
            <br></br>
            <h3>Are you sure you want to delete your comment ? </h3>
            <br></br>
            <Link to={`/review/${reviewId}/comments`}>
                <Button color="secondary" className="commentButton">Back</Button>
            </Link>
            {(currentUser === comment.userProfileId) ?
                <Button onClick={deleteAComment} color="danger" className="commentButton">Delete</Button> : <p>a</p>}
            <Card border="dark" className="border border-primary m-3">
                <CardHeader className="">
                    <div className="d-flex justify-content-between">
                        SUBJECT:  {comment.subject}

                    </div>
                    <div className="justify-content-between mt-10 mb-0">
                        <p className="float-left">Business Owner's Name: {comment.userProfile.displayName}</p>
                        <p className="float-right">Posted on: {new Intl.DateTimeFormat('en-US').format(new Date(comment.createDateTime))}</p>
                    </div>
                </CardHeader>
                <CardBody className="text-center">
                    {comment.content}
                </CardBody>
                <div>
                </div>
            </Card>
        </>
    )

};

export default CommentDelete;