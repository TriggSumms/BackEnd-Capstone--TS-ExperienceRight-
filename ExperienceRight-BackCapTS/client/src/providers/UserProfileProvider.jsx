import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
  const apiUrl = "/api/userprofile";

  const userProfile = sessionStorage.getItem("userProfile");
  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [users, setUsers] = useState([]);

  const [userTypes, setUserTypes] = useState([]);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const getAllUsers = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setUsers));

  // const getAllInactiveUsers = () =>
  //   getToken().then((token) =>
  //     fetch(`${apiUrl}/inactive`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }).then(resp => resp.json())
  //       .then(setUsers));


//Had to adjust some spare code here and remove the parameter for Isactive 
  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        { console.log(userProfile) }
        if (userProfile) {
          sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
          setIsLoggedIn(true);
        }
        else {
          alert("This account has been deactivated by an administrator.")
        }
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  // const registerBusiness = (userProfile, password) => {
  //   return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
  //     .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
  //     //.then((createResponse) => saveUser({ ...userProfile, ...Business, firebaseUserId: createResponse.user.uid }))
  //     .then((savedUserProfile) => {
  //       sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
  //       setIsLoggedIn(true);
  //     });
  // };
  // // const getToken = () => firebase.auth().currentUser.getIdToken();

  // const registerConsumer =
  //  (userProfile, password) => {
  //   return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
  //     .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
  //     .then((savedUserProfile) => {
  //       sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
  //       setIsLoggedIn(true);
  //     });
  // };

  const register = (userProfile, password) => {
    return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
      .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
      .then((savedUserProfile) => {
        sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
        setIsLoggedIn(true);
      });
  };


 const getToken = () => firebase.auth().currentUser.getIdToken(); 


  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const getUserId = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };


  //Will need to (maybe 3 of em?) ....duplicate this fetch call and structure the fetch to the backend

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
      }).then(resp => resp.json()));
  };

  const updateUser = (user) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }));
  };

  // const getAllUserTypes = () =>{
    
  // getToken().then((token) =>
  //     fetch("/api/usertype", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     }).then(resp => resp.json())
  //       .then(setUserTypes));
  //   }
        const getAllUserTypes = () => {
          return fetch("/api/usertype", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          }).then(resp => resp.json())
          .then(setUserTypes);
      }

  return (
    <UserProfileContext.Provider value={{ users, isLoggedIn, userProfile, login, logout, register, getToken, setUsers, getAllUsers, getUserProfile, updateUser, getUserId,  userTypes, getAllUserTypes }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserProfileContext.Provider>
  );
}