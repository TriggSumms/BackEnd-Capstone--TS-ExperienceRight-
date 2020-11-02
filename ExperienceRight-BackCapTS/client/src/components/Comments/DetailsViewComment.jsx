import React from "react";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import "./DetailsViewCommentz.scss";



export default function DetailsViewComment ({ DetailsViewComment }) {

    const history = useHistory();
    const { reviewId, commentId } = useParams();
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));


if (sessionUser.userTypeId === 2) {
    return (
      <>
        {/* <Card border="dark" className="border border-primary m-3">
            <CardHeader className="">

                <div className="justify-content-between mt-10 mb-0">
                    <p className="float-left">Business Owner's Name: {DetailsViewComment.userProfile.displayName}</p>
                    <p className="float-right">Posted on: {new Intl.DateTimeFormat('en-US').format(new Date(DetailsViewComment.createDateTime))}</p>
                </div>
            </CardHeader>
            <CardBody className="text-center">
                {DetailsViewComment.content}
            </CardBody>
            <div>
            </div>
        </Card> */}
      </>
    );
  }
  else if (sessionUser.userTypeId === 1) {
    return (
      <>
        {/* <Card border="dark" className="border border-primary m-3">
            <CardHeader className="">

                <div className="justify-content-between mt-10 mb-0">
                    <p className="float-left">Business Owner's Name: {DetailsViewComment.userProfile.displayName}</p>
                    <p className="float-right">Posted on: {new Intl.DateTimeFormat('en-US').format(new Date(DetailsViewComment.createDateTime))}</p>
                </div>
            </CardHeader>
            <CardBody className="text-center">
                {DetailsViewComment.content}
            </CardBody>
            <div>
            </div>
        </Card> */}

<div class="comments">
		<div class="comment-wrap">
				<div class="photo">
						{/* <div class="avatar" style="background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/felipenogs/128.jpg')"></div> */}
				</div>
				<div class="comment-block">
						<p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto temporibus iste nostrum dolorem natus recusandae incidunt voluptatum. Eligendi voluptatum ducimus architecto tempore, quaerat explicabo veniam fuga corporis totam.</p>
						<div class="bottom-comment">
								<div class="comment-date">Aug 23, 2014 @ 10:32 AM</div>
								<ul class="comment-actions">
										<li class="complain">Complain</li>
										<li class="reply">Reply</li>
								</ul>
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