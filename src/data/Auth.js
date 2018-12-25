import firebase from './firebase';

export default {
	//calls callback when user signs in or out
  onAuth () {
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				//console.log(user.email);
				return(user.email)
			}
		});
	},
	
	//get's authenticated user
  getAuth () {
		return firebase.auth()
  },
  signInWithPassword(email, password) {
		//return this.ref.authWithPassword(credentials)
		
		return firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
  },
  signUpWithPassword (credentials) {
    return this.ref.createUser(credentials) // this will create a Firebase user for authentication, this is separate from our own user objects
  },
  signInWithProvider (provider, callback) {
    // provider => 'google', 'facebook', 'github', ...
    this.ref.authWithOAuthPopup(provider, (error, authData) => {
      if (error) {
        if (error.code === 'TRANSPORT_UNAVAILABLE') {
          // fall-back to browser redirects, and pick up the session
          // automatically when we come back to the origin page
          this.ref.authWithOAuthRedirect(provider, (error) => {
            if (callback) callback(error, authData)
          })
        }
      } else if (authData) {
        if (callback) callback(null, authData)
      }
    })
  },
  signOut () {
    firebase.auth().signOut()
  }
}
