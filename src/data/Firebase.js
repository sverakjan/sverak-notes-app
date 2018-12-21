import * as firebase from "firebase";

const config = {
	apiKey: "AIzaSyDhvdDaXVBc25RVdZA4DKdMurqZUd1ejUE",
	authDomain: "sverak-notes-app.firebaseapp.com",
	databaseURL: "https://sverak-notes-app.firebaseio.com",
	projectId: "sverak-notes-app",
	storageBucket: "sverak-notes-app.appspot.com",
	messagingSenderId: "715631935704"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

