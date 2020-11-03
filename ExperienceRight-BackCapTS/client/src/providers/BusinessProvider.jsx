import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BusinessContext = React.createContext();

export const BusinessProvider = (props) => {
  const apiUrl = "/api/business";
  const { getToken } = useContext(UserProfileContext);
  const [businesses, setBusinesses] = useState([]);
  const [business, setBusiness] = useState({});
  const [userBusiness, setUserBusiness] = useState({});
  const [categories, setCategories] = useState([]);
  //const [businesszByCat, setBusinesszByCat] = useState([]);
  

  


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

  const searchBusinesses = (searchTerm) => {
    getToken().then((token) =>
      fetch(`/api/business/search?q=${searchTerm}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setBusinesses));
  };


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

  const getBusinessByUserId = (id) => {
    getToken().then((token) =>
      fetch(`/api/business/bizbyup/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })).then((resp) => resp.json())
      .then(setUserBusiness);
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

  const updateBusiness = (business) => {
    return getToken().then((token) =>
      fetch(`/api/business/edit/${business.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(business)
      }))
  };


//   const deleteReview = (id) =>
//     getToken().then((token) =>
//       fetch(`/api/review/delete/${id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },

//       }))


const getAllCategories = () => {
  return fetch("/api/category", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  }).then(resp => resp.json())
  .then(setCategories);
}


// const getAllBusinessesByCategory = (id) => {
//   getToken().then((token) =>
//     fetch(`/api/business/categories/${id}`,{
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }).then(resp => resp.json())
//       .then(setBusinesszByCat));
// };

// getTheCount(id) {
//     return fetch(`${remoteURL}/plants/?userId=${id}&_expand=user`).then(result => result.json())
// }


  return (
    <BusinessContext.Provider value={{
    //   business, businesses, getAllBusinesses, getById, addReview setBusiness, getAllReviewsByUser
    categories, business, userBusiness, businesses, getAllBusinesses, setBusiness, getBusinessById, addBusiness, getAllCategories, updateBusiness, searchBusinesses, getBusinessByUserId
    }}>
      {props.children}
    </BusinessContext.Provider>
  );

}

