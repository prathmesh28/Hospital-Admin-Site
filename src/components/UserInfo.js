import * as React from "react";
import { Link } from "react-router-dom";
import useUser from "../_hooks/useUser";
import Dashboard from "./Dashboard/Dashboard"
export default function UserInfo() {
  const { isLoggedIn } = useUser();
  return isLoggedIn() ? (
    <Dashboard/>
  ) : (
    <div>
      Insuffiecent permissions, please sign in <Link to="/signin">here</Link>
    </div>
  );
}
