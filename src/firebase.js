import * as firebase from "firebase/app";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6zJ2pO9N4e7OSuUi7vf-XQJ92hOlur6A",
  authDomain: "hospital-app-49c8b.firebaseapp.com",
  databaseURL: "https://hospital-app-49c8b.firebaseio.com",
  projectId: "hospital-app-49c8b",
  storageBucket: "hospital-app-49c8b.appspot.com",
  messagingSenderId: "793678846485",
  appId: "1:793678846485:web:12ad761d33a2bdb53bcc1c",
  measurementId: "G-HX5C1N5CBB"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const google = new firebase.auth.GoogleAuthProvider();

export { auth, google };
