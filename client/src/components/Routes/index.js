import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import home from "../../pages/home";
import profil from "../../pages/profil";
import trending from "../../pages/trending";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/profil" exact component={profil} />
        <Route path="/trending" exact component={trending} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
