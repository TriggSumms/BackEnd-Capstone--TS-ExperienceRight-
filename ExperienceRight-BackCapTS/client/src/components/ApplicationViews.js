import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
//import RegisterConsumer from "./RegisterConsumer";
import Register from "./Register";
//import RegisterBusiness from "./RegisterBusiness";
import Hello from "./Hello";
import BusinessREGISTRATIONaddForm from "./Business/BusinessREGISTRATIONaddForm";
import BusinessList from "./Business/BusinessList";
import BusinessProfileDetails from "./Business/BusinessProfileDetails";
 import ProfileReviewList from "./Reviews/ProfileReviewList";
 import ReviewDetail from "./Reviews/ReviewDetail";
import ReviewAddForm from "./Reviews/ReviewAddForm";
// import CommentList from "./Comments/CommentList";
// import CommentAddForm from "./Comments/CommentAddForm";
// import CommentEditForm from "./Comments/CommentEditForm.js";
// import CommentDelete from "./Comments/CommentDelete";

// import UnapprovedPostList from "./Posts/UnapprovedPostList";
// import AuthorViewList from "./Posts/AuthorViewList";

// import PostEditForm from "./Posts/PostEditForm";
// import PostDelete from "./Posts/PostDelete";
// import PostTagList from "./Tags/PostTagList";
// import MyPosts from "./Posts/MyPosts";
// import TagList from "./Tags/TagList";
// import TagForm from "./Tags/TagForm";
// import TagEditForm from "./Tags/TagEditForm";
// import DeleteTagPrompt from "./Tags/DeleteTagPrompt";
// import AddPostTagForm from "./Tags/AddPostTagForm";
// import DeletePostTagForm from "./Tags/DeletePostTagForm";
// import UserList from "./Users/UserList";
// import CategoryList from "./Categories/CategoryList";
// import CategoryAddForm from "./Categories/CategoryAddForm";
// import CategoryEditForm from "./Categories/CategoryEditForm";
// import CategoryProvider from "../providers/CategoryProvider";
// import DeleteCategoryAlert from "./Categories/CategoryDelete";
// import UserDetails from "./Users/UserDetails";
// import UserDeactivate from "./Users/UserDeactivate";
// import UserActivate from "./Users/UserActivate";
// import UserListDeactivated from "./Users/UserListDeactivated";
// import { CommentProvider } from "../providers/CommentProvider";
// import UserEdit from "./Users/UserEdit";


export default function ApplicationViews() {
  const { isLoggedIn } = useContext(UserProfileContext);
  const sessionUser = JSON.parse(sessionStorage.getItem("userProfile"));

  return (

    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

    <Route path="/register">
          <Register />
        </Route> 

{/*  */}
        <Route path="/businesses/details/:id" exact>
          {isLoggedIn ? <BusinessProfileDetails /> : <Redirect to="/login" />}
        </Route>
        <Route path="/businesses" exact>
          {isLoggedIn ? <BusinessList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/businesses/registerthebusiness" exact>
          {isLoggedIn ? <BusinessREGISTRATIONaddForm /> : <Redirect to="/login" />}
        </Route>
       
 


        <Route path="/reviews" exact>
          {isLoggedIn ? <ProfileReviewList /> : <Redirect to="/login" />}
        </Route>
 
        <Route path="/reviews/details/:id" exact>
          {isLoggedIn ? <ReviewDetail /> : <Redirect to="/login" />}
        </Route>

        <Route path="/reviews/add">
          {isLoggedIn ? <ReviewAddForm /> : <Redirect to="/login" />}
        </Route>
{/*
        <Route path="/posts/unapproved" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <UnapprovedPostList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/userview" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <AuthorViewList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/edit/:id">
          {isLoggedIn ? <PostEditForm /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/delete/:id">
          {isLoggedIn ? <PostDelete /> : <Redirect to="/login" />}
        </Route>

        <Route path="/posts/myposts/:id" exact>
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>
        END POST ROUTES */}

        {/* <Route path="/users" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <UserList /> : <Redirect to="/login" />}
        </Route> */}

        {/* <Route path="/users/:id" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <UserDetails /> : <Redirect to="/login" />}
        </Route> */}

        {/* <Route path="/users/deactivate/:id">
          {isLoggedIn && sessionUser.userTypeId === 1 ? <UserDeactivate /> : <Redirect to="/login" />}
        </Route>

        <Route path="/inactive" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <UserListDeactivated /> : <Redirect to="/login" />}
        </Route>

        <Route path="/inactive/:id" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <UserActivate /> : <Redirect to="/login" />}
        </Route> */}
{/* 
        <Route path="/users/edit/:id" exact>
          {isLoggedIn && sessionUser.userTypeId === 1 ? <UserEdit /> : <Redirect to="/login" />}
        </Route> */}

      </Switch>
    </main>

  );
}

