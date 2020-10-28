import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { ReviewProvider } from "./providers/ReviewProvider";
import { BusinessProvider } from "./providers/BusinessProvider";
import { CommentProvider } from "./providers/CommentProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import "./main.css"


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <BusinessProvider>
          <ReviewProvider>
            <CommentProvider>
            <Header />
            <ApplicationViews />
            </CommentProvider>
          </ReviewProvider>
        </BusinessProvider>
      </UserProfileProvider>
    </Router >
  );

}

export default App;