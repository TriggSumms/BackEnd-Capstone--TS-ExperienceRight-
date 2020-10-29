import React from "react";
import { Card, CardBody, Button, CardHeader } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";



export default function CommentAlertONComment({ CommentAlertONComment }) {

    return (

        <main className="postTagCard">
          <section className="postTagCardContainer"> 
            <div className="postTagName">
             <h5 className="theHashTagtoSetOtherstoShame"> # </h5>
                 "{CommentAlertONComment.subject}"
            </div>
           {/* <div className="postTagManagementButtons">   
                <Link to={`/tags/${PostTag.id}`}>
                <button className="tag-btn">Edit</button>
              </Link> */}
              &nbsp;&nbsp;&nbsp;
              {/* <Link to={`/tags/delete/${PostTag.id}`}>
                <button className="tag-btn">Delete</button>
              </Link> 
            </div> */}
          </section>
        </main>
      );
    }

