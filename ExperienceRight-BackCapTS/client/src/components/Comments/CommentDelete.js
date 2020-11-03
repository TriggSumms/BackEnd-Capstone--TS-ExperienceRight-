import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";
import "./DetailsViewCommentz.css";


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
            .then(() => history.push(`/reviews/details/${reviewId}`))
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
            <div class="comments-container">
		<ul id="comments-list" class="comments-list">
			<li>
				<div class="comment-main-level">
					<div class="comment-avatar"><img src={comment.userProfile.profileImageLocation} alt=""></img>
                    </div>
					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name by-author">{comment.userProfile.firstName}</h6>
							<span>{new Intl.DateTimeFormat('en-US').format(new Date(comment.createDateTime))}</span>
							<i class="fa fa-reply"></i>

							<i class="fa fa-heart"></i>
						</div>
						<div class="comment-content">
                        {comment.content}
						</div>
					</div>
                    
				</div>

			</li>

		</ul>
	</div>
        </>
    )

};

export default CommentDelete;