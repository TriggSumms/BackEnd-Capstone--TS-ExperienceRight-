import React from "react";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import "./DetailsViewCommentz.css";




export default function DetailsViewComment ({ DetailsViewComment }) {

    const history = useHistory();
    const { reviewId, commentId } = useParams();
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));


if (sessionUser.userTypeId === 2) {
    return (
      <>
<div class="comments-container">
		<ul id="comments-list" class="comments-list">
			<li>
				<div class="comment-main-level">
					<div class="comment-avatar"><img src={DetailsViewComment.userProfile.profileImageLocation} alt=""></img>
                    </div>
					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name by-author">{DetailsViewComment.userProfile.firstName}</h6>
							<span>{new Intl.DateTimeFormat('en-US').format(new Date(DetailsViewComment.createDateTime))}</span>
							<i class="fa fa-reply"></i>
							<i class="fa fa-heart"></i>
						</div>
						<div class="comment-content">
                        {DetailsViewComment.content}
						</div>
					</div>
				</div>

			</li>

		</ul>
	</div>
      </>
    );
  }
  else if (sessionUser.userTypeId === 1) {
    return (
      <>
<div class="comments-container">
		<ul id="comments-list" class="comments-list">
			<li>
				<div class="comment-main-level">
					<div class="comment-avatar"><img src={DetailsViewComment.userProfile.profileImageLocation} alt=""></img>
                    </div>
					<div class="comment-box">
						<div class="comment-head">
							<h6 class="comment-name by-author">{DetailsViewComment.userProfile.firstName}</h6>
							<span>{new Intl.DateTimeFormat('en-US').format(new Date(DetailsViewComment.createDateTime))}</span>
							<i class="fa fa-reply"></i>

							<i class="fa fa-heart"></i>
						</div>
						<div class="comment-content">
                        {DetailsViewComment.content}
						</div>
					</div>
                    
				</div>
                {sessionUser.userProfileId == DetailsViewComment.userProfileId ? "" :
                    <>
                        <Button size="sm" variant="outline-primary" onClick={() => history.push(`/comments/edit/${DetailsViewComment.id}`)}>Edit </Button>{' '}
                        <Button size="sm" variant="outline-primary" onClick={() => history.push(`/review/${reviewId}/comments/delete/${DetailsViewComment.id}`)}>Delete</Button>{' '}
                    </>
                }
			</li>

		</ul>
	</div>
      </>
    );
  }
  else {
    return null
  }
}