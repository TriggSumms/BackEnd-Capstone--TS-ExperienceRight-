import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { Button, } from "reactstrap";
import { ReviewContext } from "../../providers/ReviewProvider";
import Comment from "./Comment";
//import Post from "./Post";
import { useHistory } from "react-router-dom";

export default function CommentList() {
    const { comments, getAllCommentsByReviewId  } = useContext(CommentContext);

    const { review, getReview } = useContext(ReviewContext)
    const { reviewId } = useParams();
    const { history } = useHistory();


    useEffect(() => {
        getAllCommentsByReviewId(reviewId);
        //getPost(id);
    }, []);
   // console.log("id", reviewId);



    return (
        <>
            <section>
                <div>
                    <h1>Comments</h1>
                    <Link to={`comments/add`}><Button color="primary">Add New Comment</Button></Link>
                </div>

                <h4>Subject</h4>
                <p>{comments && comments.subject}</p>

                <h6>Comment</h6>
                <p>{comments && comments.content}</p>

                <h6>DisplayName</h6>
                <p>{comments && comments.userProfile}</p>

                <h6>Date</h6>
                <p>{comments && comments.createDateTime}</p>


                <Link to={`/reviews`}><Button>
                    Back To Reviews
            </Button></Link>
                {comments.map(c => {

                    return <Comment key={c.id} comment={c} />
                })}
            </section>




        </>
    );
};

