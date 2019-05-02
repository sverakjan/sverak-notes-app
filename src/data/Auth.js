import firebase from "./firebase";

export default {
  //calls callback when user signs in or out
  onAuth() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //console.log(user.email);
        return user.email;
      }

      console.log("hej");
    });
  },

  //get's authenticated user
  getAuth() {
    return firebase.auth();
  },
  signInWithPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  signUpWithPassword(credentials) {
    return firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
  },
  signOut() {
    firebase.auth().signOut();
  }
};
