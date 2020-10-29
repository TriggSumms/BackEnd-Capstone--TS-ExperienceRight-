import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { Button, } from "reactstrap";
import { ReviewContext } from "../../providers/ReviewProvider";
import CommentAlertONComment from "./CommentAlertONComment";

import { useHistory } from "react-router-dom";

export default function CommentAlertList() {
    const { comments, getAllCommentsByReviewId } = useContext(CommentContext);

    const { review, getReview } = useContext(ReviewContext)
    const { reviewId } = useParams();
    const { history } = useHistory();


    useEffect(() => {
        getAllCommentsByReviewId(reviewId);
        
    }, []);



    return (
        <>
            <section>

                <br></br>

                {CommentAlertONComment.map(c => {
                    return <CommentAlertONComment key={c.id} CommentAlertONComment={c} />
                })}
            </section>




        </>
    );
};