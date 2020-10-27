import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { ReviewProvider } from "./providers/ReviewProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import "./main.css"

function App() {
  return (
    <Router>
      <UserProfileProvider>
      <ReviewProvider>
                <Header />
                <ApplicationViews />
                </ReviewProvider>
      </UserProfileProvider>
    </Router >
  );

}

export default App;