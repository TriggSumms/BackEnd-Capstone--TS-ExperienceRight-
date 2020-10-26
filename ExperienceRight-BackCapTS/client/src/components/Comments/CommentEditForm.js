// import React, { useState, useEffect, useContext } from "react";
// import { useParams, useHistory, Link } from "react-router-dom";
// import { CommentContext } from "../../providers/CommentProvider";
// import { Form, FormGroup, Label, Input, Button } from "reactstrap";




// const CommentEditForm = () => {
//     let userId = sessionStorage.userProfileId;
//     console.log(userId);
//     const { id } = useParams();
//     const history = useHistory();

//     const { editComment, comment, getCommentById } = useContext(CommentContext);
//     console.log(comment);
//     //useState is invoked when a user makes an event happen.( the UserInterface changes state).
//     //UseState is watching the Review, or all the Posts based on what developer tells it to watch.
//     const [isLoading, setIsLoading] = useState(false);
//     const [editedComment, setEditedComment] = useState();
//     console.log(editedComment);


//     //useEffect has to happen after a page is rendered.
//     useEffect(() => {
//         getCommentById(id);
//     }, [id]);


//     ///console.log("Hello World", id)
//     ////console.log(JSON.parse(comment.id))
//     const handleEditFieldChange = (e) => {
//         const stateToChange = { ...editedComment };
//         stateToChange[e.target.id] = e.target.value;
//         setEditedComment(stateToChange);
//     };


//     useEffect(() => {
//         setEditedComment(comment);
//     }, [comment]);

//     //Edit comment and push to details on posts.
//     const editCurrentComment = (e) => {

//         e.preventDefault();
//         setIsLoading(true);
//         console.log("edited Comment", editedComment)
//         editComment({
//             subject: editedComment.subject,
//             content: editedComment.content,
//             userProfileId: editedComment.userProfileId,
//             id: editedComment.id,
//             reviewId: editedComment.reviewId,
//             createDateTime: editedComment.createDateTime

//         });
//         console.log("edited Commofoment", editedComment)

//         setIsLoading(false);
//         //editComment(editedComment.Id, editedComment)
//         //history.push(`/post/${id}/comment`);
//         editComment(editedComment).then(() =>
//             history.push(`/review/${comment.reviewId}/comments`))
//     };



//     return (
//         <>
            
//             {comment &&
//                 <Form>
//                     <h3> Edit Comment </h3>
//                     <FormGroup>
//                         <Label htmlFor="subject"><strong>Subject</strong></Label>
//                         <Input className="p-2 bd-highlight justify-content-center"
//                             defaultValue={comment.subject}
//                             onChange={handleEditFieldChange}
//                             type="text"
//                             name="subject"
//                             id="subject" />
//                     </FormGroup>
//                     <FormGroup>
//                         <Label htmlFor="content"><strong>Comment</strong></Label>
//                         <Input className="p-2 bd-highlight justify-content-center"
//                             defaultValue={comment.content}
//                             onChange={handleEditFieldChange}
//                             type="textarea"
//                             name="content"
//                             id="content" />
//                     </FormGroup>

//                 </Form>}
//             <Button type="button" color="success" onClick={e => { editCurrentComment() }}>Save</Button> &nbsp;&nbsp;
//             <Link to={`/review/${id}/comments`}><Button type="button" color="warning">Cancel</Button></Link>

//             <Button className="submitComment" type="button" color="success" isLoading={isLoading} onClick={editCurrentComment}>
//                 {'Save Updated Comment'}
//             </Button>


//         </>
//     );
// }

// export default CommentEditForm; 