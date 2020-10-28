import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";



export default function Comment({ comment }) {
    //let userId = sessionStorage.userProfileId
    const history = useHistory();
    const { reviewId, commentId } = useParams();
    return (
        <Card className="m-4">
            <CardBody>
                <h2>Subject</h2>
                <h2>{comment.subject}</h2>

                <h2>DisplayName(THE BUSINESS)</h2>
                <p>{comment.userProfile.displayName}</p>


                <h2>Comment</h2>
                <p>{comment.content}</p>

                <h2>Comment</h2>
                <p>{comment.creatDateTime}</p>
                <p>{new Intl.DateTimeFormat('en-US').format(new Date(comment.createDateTime))}</p>

                <>
                    <Button onClick={() => history.push(`/comments/edit/${comment.id}`)}>Edit </Button>
                    <Button onClick={() => history.push(`/review/${reviewId}/reviews/delete/${comment.id}`)}>Delete</Button>
                </>

            </CardBody>
        </Card>
    );
}


