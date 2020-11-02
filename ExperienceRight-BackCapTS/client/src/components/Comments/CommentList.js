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
                <section>
                    <div className="centerCrResponse">
                        <br></br>
                        <br></br>
                        <h3>Business Response's</h3>
                    </div>
                    <br></br>
                    <Link to={`/reviews/details/${reviewId}`}>
                        <Button> Back To the Review Details</Button>
                    </Link>
                    {comments.map(c => {
                        return <Comment key={c.id} comment={c} />
                    })}
                </section>
            </>
        );
    }
    else if (sessionUser.userTypeId === 1) {
        return (
            <>
                <section>
                    <div className="centerCRReponse">
                        <br></br>
                        <br></br>
                        <h3>Customer Response Manager: </h3>
                        <Link to={`/reviews/details/${reviewId}`}>
                            <Button> Back To the Review Details</Button>
                        </Link>
                        <Link to={`comments/add`}><Button color="primary">Add New Comment</Button></Link>
                    </div>


                    {comments.map(c => {
                        return <Comment key={c.id} comment={c} />
                    })}
                </section>
            </>
        );
    }
    else {
        return null
    }
}

