import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
//import RegisterConsumer from "./RegisterConsumer";
import Register from "./Register";
//import RegisterBusiness from "./RegisterBusiness";
import MainPageMessage from "./MainPageMessage";
import HelloReviewer from "./HelloReviewer";
import HelloBusiness from "./HelloBusiness";
import BusinessREGISTRATIONaddForm from "./Business/BusinessREGISTRATIONaddForm";
import BusinessProfileEdit from "./Business/BusinessProfileEdit"
import UserSpecificReviewsList from "./Reviews/UserSpecificReviewsList";
import BusinessList from "./Business/BusinessList";
import BizProfileForReviewer from "./Business/BizProfileForReviewer";
import BizProfileForBuisness  from "./Business/BizProfileForBuisness";
 import ProfileReviewList from "./Reviews/ReviewList";
 import ReviewDetail from "./Reviews/ReviewDetail";
import ReviewAddForm from "./Reviews/ReviewAddForm";
import ReviewEditForm from "./Reviews/ReviewEditForm";
import ReviewDeleteForm from "./Reviews/ReviewDeleteForm";
import CommentList from "./Comments/CommentList";
import CommentAddForm from "./Comments/CommentAddForm";
import CommentEditForm from "./Comments/CommentEditForm.js";
import CommentDelete from "./Comments/CommentDelete";




export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  return (

    <main>
      <Switch>

      <Route path="/" exact>
          {isLoggedIn ? <MainPageMessage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/businesshello" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <HelloBusiness /> : <Redirect to="/login" />}
        </Route>

        <Route path="/helloreviewer" exact>
          {isLoggedIn  && sessionUser.userTypeId === 2  ? <HelloReviewer /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>



{/*  */}
        <Route path="/businesses/details/:id" exact>
          {isLoggedIn ? <BizProfileForReviewer /> : <Redirect to="/login" />}
        </Route>
        <Route path="/businessprofile/details/:id" exact>
          {isLoggedIn  && sessionUser.userTypeId === 1 ? <BizProfileForBuisness/> : <Redirect to="/login" />}
        </Route>
        <Route path="/businesses" exact>
          {isLoggedIn  && sessionUser.userTypeId === 2 ? <BusinessList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/businesses/registerthebusiness" exact>
          {/* {isLoggedIn && sessionUser.userTypeId === 1 ? <BusinessREGISTRATIONaddForm /> : <Redirect to="/login" />} */}
          {isLoggedIn  && sessionUser.userTypeId === 1 ? <BusinessREGISTRATIONaddForm /> : <Redirect to="/login" />}
        </Route>
        <Route path="/businesses/edit/:id" exact>
          {isLoggedIn ?  <BusinessProfileEdit /> : <Redirect to="/login" />}
        </Route>
 


        <Route path="/reviews" exact>
          {isLoggedIn ? <ProfileReviewList /> : <Redirect to="/login" />}
        </Route>
 
        <Route path="/reviews/details/:id" exact>
          {isLoggedIn ? <ReviewDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/reviews/add/:id" exact>
          {isLoggedIn  && sessionUser.userTypeId === 2 ? <ReviewAddForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/reviews/edit/:id">
          {isLoggedIn && sessionUser.userTypeId === 2 ? <ReviewEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/reviews/delete/:id">
          {isLoggedIn  && sessionUser.userTypeId === 2 ? <ReviewDeleteForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/reviews/myreviews/:id" exact>
          {/* {isLoggedIn && sessionUser.userTypeId === 1 ? <BusinessREGISTRATIONaddForm /> : <Redirect to="/login" />} */}
          {isLoggedIn  && sessionUser.userTypeId === 2 ? <UserSpecificReviewsList /> : <Redirect to="/login" />}
        </Route>





        <Route path="/review/:reviewId/comments" exact>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/review/:reviewId/comments/add" exact>
          {isLoggedIn  && sessionUser.userTypeId === 1 ? <CommentAddForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/comments/edit/:id" exact>
          {isLoggedIn  && sessionUser.userTypeId === 1 ? <CommentEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/review/:reviewId/comments/delete/:commentId" exact>
          {isLoggedIn  && sessionUser.userTypeId === 1 ? <CommentDelete /> : <Redirect to="/login" />}
        </Route>


      </Switch>
    </main>

  );
}

