//Providers are like the front-end Repositories. This is where you will find your ingredients to pull from.

import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CommentContext = createContext();

export function CommentProvider(props) {
    const apiUrl = "/api/comment";
    const { getToken } = useContext(UserProfileContext);

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState({});

    //List all the Action Methods in Code Blocks Below
    //Get all Comments by id,must match API. Makes fetch calls to the API.
    const getAllCommentsByReviewId = (id) =>
        getToken().then((token) =>
            fetch(apiUrl + "/review/" + id, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then(resp => resp.json())
                .then(setComments));

    // const getCommentById = (id) =>
    //     getToken().then((token) =>
    //         fetch(apiUrl + "/post/" + id, {
    //             method: "GET",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }).then(resp => resp.json())
    //             .then(setComment));

    // Get Comment By Single Id

    const getCommentById = (id) =>
        getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`

                }
            }).then(res => res.json())
               // .then(setComment));
        );

    //Add a new comment  
    const addComment = (newComment) => {
        return getToken().then((token) => {
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newComment)
            })
        })
    };

    const editComment = (comment) => {
        console.log("comment", comment)
        return getToken().then((token) => {
            fetch(`${apiUrl}/edit/${comment.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(comment)
            })
        })
    }

    const deleteComment = (id) => {
        return getToken().then((token) => {
            fetch(`${apiUrl}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    ///Must return your catalog of actions
    return (

        <CommentContext.Provider value={{ getCommentById, comment, setComment, comments, getAllCommentsByReviewId , addComment, editComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}