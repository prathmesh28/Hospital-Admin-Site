import * as React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserInfo from "./UserInfo";
import Home from "./Home";
import SignIn from "./SignIn";
import Logout from "./Logout";
import useUser from "../_hooks/useUser";
import UserData from "./UserData/UserData"
import Doctors from "./Doctors/Doctors"
import Data from "./Data/Data"
export default function CustomRouter() {
  // useUser is a custom hook (src/_hooks/useUser.tsx)
  const { isLoggedIn, loaded } = useUser();

  return (
    <Router >
       {!loaded ? null : isLoggedIn() ? (
        <Switch>
          <Route path="/logout">
            <Logout />
          </Route>
        
          <Route path="/signin">
            <Redirect to="/Dashboard"></Redirect>
          </Route>
          <Route path="/Dashboard">
            <UserInfo />
          </Route>
          <Route path="/User/:id">
            <UserData/>
          </Route>
          <Route path="/Doctors">
            <Doctors/>
          </Route>
          <Route path="/Data">
            <Data/>
          </Route>
          <Route path="/">
            <Redirect to="/Dashboard"></Redirect>
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>

          <Route path="/logout">
            <Redirect to="/signin" />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      )}
    </Router>
  );
}
