import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { ReviewProvider } from "./providers/ReviewProvider";
import { BusinessProvider } from "./providers/BusinessProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import "./main.css"
import Business from './components/Business/Business';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <BusinessProvider>
      <ReviewProvider>
                <Header />
                <ApplicationViews />
                </ReviewProvider>
                </BusinessProvider>
      </UserProfileProvider>
    </Router >
  );

}

export default App;