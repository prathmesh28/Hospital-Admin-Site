import * as React from "react";
import Firebase from "../firebase";
export default function Logout() {
  React.useEffect(() => {
    Firebase.auth().signOut();
  }, []);

  return <div>Logging out...</div>;
}
