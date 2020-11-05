import React from "react";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";



export default function CommentAlertONComment({ CommentAlertONComment }) {
  const history = useHistory();
  const { reviewId, commentId } = useParams();
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));


    return (

        <main className="postTagCard">
          <section className="postTagCardContainer"> 
            <div className="postTagName">
             <h5 className="theHashTagtoSetOtherstoShame"> # </h5>
                 "{CommentAlertONComment.subject}"
            </div>
          </section>
        </main>
      );
    }

