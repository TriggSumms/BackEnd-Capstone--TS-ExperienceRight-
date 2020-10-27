import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ReviewContext = React.createContext();

export const ReviewProvider = (props) => {
  const apiUrl = "/api/review";
  const { getToken } = useContext(UserProfileContext);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({});
  const [frequencies, setFrequencies] = useState([]);


  const getAllReviews = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setReviews));
  };

  // React js seems to hate multiple slashes in the fetch routes.
  // So just add the id with no slash but inside string interpolation
//   const getAllReviewsByUser = (id) => {
//     return getToken().then((token) =>
//       fetch(`/api/reviews/myreviews${id}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }).then((resp) => resp.json())
//         .then(setReviews));
//   }

  const  getAllReviewsforBusiness = (id) => {
    return getToken().then((token) =>
      fetch(`/api/review/business${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((resp) => resp.json())
        .then(setReviews));
  }

//   const getAllUnapprovedPosts = () => {
//     getToken().then((token) =>
//       fetch(`${apiUrl}/unapproved`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }).then(resp => resp.json())
//         .then(setUnapprovedPosts));

//   };

  const getById = (id) => {
    getToken().then((token) =>
      fetch(`/api/review/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).then((resp) => resp.json())
      .then(setReview);
  };

  const addReview = (review) => {
    return getToken().then((token) =>
      fetch("/api/review", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review)
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      }))
  };

  const updateReview = (id, review) => {
    return getToken().then((token) =>
      fetch(`/api/review/edit/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
      }))
  };

  const deleteReview = (id) =>
    getToken().then((token) =>
      fetch(`/api/review/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },

      }))

      const getAllFrequencies = () => {
        return fetch("/api/frequency", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(resp => resp.json())
        .then(setFrequencies);
    }

  return (
    <ReviewContext.Provider value={{
     frequencies, review, reviews, getAllReviews, getById, addReview, updateReview, deleteReview, setReview, getAllFrequencies,  getAllReviewsforBusiness
    }}>
      {props.children}
    </ReviewContext.Provider>
  );

}