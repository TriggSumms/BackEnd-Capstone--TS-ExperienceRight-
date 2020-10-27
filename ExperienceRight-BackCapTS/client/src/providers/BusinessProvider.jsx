import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BusinessContext = React.createContext();

export const BusinessProvider = (props) => {
  const apiUrl = "/api/business";
  const { getToken } = useContext(UserProfileContext);
  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState({});
  


  const getAllBusinesses = () => {
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setBusinesses));
  };

  // React js seems to hate multiple slashes in the fetch routes.
  // So just add the id with no slash but inside string interpolation
//   const getAllReviewsForBusiness = (id) => {
//     return getToken().then((token) =>
//       fetch(`/api/reviews/reviews${id}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }).then((resp) => resp.json())
//         .then(setReviews));
//   }

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

  const getBusinessById = (id) => {
    getToken().then((token) =>
      fetch(`/api/business/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).then((resp) => resp.json())
      .then(setBusiness);
  };

  const addBusiness = (business) => {
    return getToken().then((token) =>
      fetch("/api/business", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(business)
      })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      }))
  };

//   const updateReview = (id, review) => {
//     return getToken().then((token) =>
//       fetch(`/api/review/edit/${id}`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(review)
//       }))
//   };

//   const deleteReview = (id) =>
//     getToken().then((token) =>
//       fetch(`/api/review/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },

//       }))

// getTheCount(id) {
//     return fetch(`${remoteURL}/plants/?userId=${id}&_expand=user`).then(result => result.json())
// }

  return (
    <BusinessContext.Provider value={{
    //   business, businesses, getAllBusinesses, getById, addReview setBusiness, getAllReviewsByUser
    business, businesses, getAllBusinesses, setBusiness, getBusinessById, addBusiness
    }}>
      {props.children}
    </BusinessContext.Provider>
  );

}

