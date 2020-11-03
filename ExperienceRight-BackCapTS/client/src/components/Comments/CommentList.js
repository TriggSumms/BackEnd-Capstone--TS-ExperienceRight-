import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import { ListGroup, ListGroupItem } from "reactstrap";
import { useParams, Link } from "react-router-dom";
import { Button, } from "reactstrap";
import { ReviewContext } from "../../providers/ReviewProvider";
//import Comment from "./Comment";
import DetailsViewComment from "../Comments/DetailsViewComment";
import { useHistory } from "react-router-dom";

export default function CommentList() {
    const { comments, getAllCommentsByReviewId } = useContext(CommentContext);
    const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));
    const { reviewId, id } = useParams();
    const { history } = useHistory();


    useEffect(() => {
        getAllCommentsByReviewId(reviewId);

    }, []);

    if (sessionUser.userTypeId === 2) {
        return (
            <>
                <section className="row justify-content-center">
                    <h3>Business Response's </h3>
                    <br></br>
                    <br></br>
                </section>
                <section className="row justify-content-center">

                    <Link to={`/reviews/details/${reviewId}`}>
                        <Button> Back To the Review Details</Button>
                    </Link>
                    <Link to={`comments/add`}><Button color="primary">Add New Comment</Button></Link>
                </section>
                <section className="row justify-content-center">

                    {comments.map(c => {
                        return <DetailsViewComment key={c.id} DetailsViewComment={c} />
                    })}
                </section>

            </>
        );
    }
    else if (sessionUser.userTypeId === 1) {
        return (
            <>

                <section className="row justify-content-center">
                    <h3>Customer Response Manager: </h3>
                    <br></br>
                    <br></br>
                </section>
                <section className="row justify-content-center">

                    <Link to={`/reviews/details/${reviewId}`}>
                        <Button> Back To the Review Details</Button>
                    </Link>
                    <Link to={`comments/add`}><Button color="primary">Add New Comment</Button></Link>
                </section>
                <section className="row justify-content-center">

                    {comments.map(c => {
                        return <DetailsViewComment key={c.id} DetailsViewComment={c} />
                    })}
                </section>

            </>
        );
    }
    else {
        return null
    }
}

