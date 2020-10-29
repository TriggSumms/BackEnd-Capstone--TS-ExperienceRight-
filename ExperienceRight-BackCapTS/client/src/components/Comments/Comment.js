import React from "react";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";



export default function Comment({ comment }) {

    const history = useHistory();
    const { reviewId, commentId } = useParams();
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));


if (sessionUser.userTypeId === 2) {
    return (
      <>
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
    );
  }
  else if (sessionUser.userTypeId === 1) {
    return (
      <>
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
                {sessionUser.userProfileId == comment.userProfileId ? "" :
                    <>
                        <Button size="sm" variant="outline-primary" onClick={() => history.push(`/comments/edit/${comment.id}`)}>Edit </Button>{' '}
                        <Button size="sm" variant="outline-primary" onClick={() => history.push(`/review/${reviewId}/comments/delete/${comment.id}`)}>Delete</Button>{' '}
                    </>
                }
            </div>
        </Card>
      </>
    );
  }
  else {
    return null
  }
}


