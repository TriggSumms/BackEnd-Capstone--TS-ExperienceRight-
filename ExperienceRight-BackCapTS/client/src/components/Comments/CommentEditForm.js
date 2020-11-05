import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";




const CommentEditForm = () => {
    let userId = sessionStorage.userProfileId
    const history = useHistory();
    const { reviewId, id } = useParams();
    const { editComment, comment, getCommentById } = useContext(CommentContext);
    const [isLoading, setIsLoading] = useState(false);
    const [editedComment, setEditedComment] = useState();
 


    useEffect(() => {
        getCommentById(id);
    }, [id]);


    const handleEditFieldChange = (e) => {
        const stateToChange = { ...editedComment };
        stateToChange[e.target.id] = e.target.value;
        setEditedComment(stateToChange);
    };


    useEffect(() => {
        setEditedComment(comment);
    }, [comment]);


    const editCurrentComment = (e) => {

        e.preventDefault();
        setIsLoading(true);
        editComment({
            subject: editedComment.subject,
            content: editedComment.content,
            userProfileId: editedComment.userProfileId,
            id: editedComment.id,
            reviewId: editedComment.reviewId,
            createDateTime: editedComment.createDateTime

        });

        setIsLoading(false);
        editComment(editedComment).then(() =>
            history.push(`/review/${comment.reviewId}/comments`))
    };



    return (
        <>
            
            {comment &&
                <Form>
                    <h3> Edit Comment </h3>
                    <FormGroup>
                        <Label htmlFor="subject"><strong>Subject</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            defaultValue={comment.subject}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="subject"
                            id="subject" />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="content"><strong>Comment</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            defaultValue={comment.content}
                            onChange={handleEditFieldChange}
                            type="textarea"
                            name="content"
                            id="content" />
                    </FormGroup>

                </Form>}
           
            <Link to={`/review/${comment.reviewId}/comments`}><Button type="button" color="warning">Cancel</Button></Link>

            <Button className="submitComment" type="button" color="success" isLoading={isLoading} onClick={editCurrentComment}>
                {'Save Updates'}
            </Button>


        </>
    );
}

export default CommentEditForm; 