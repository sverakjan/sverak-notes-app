import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import NotesPage from "./components/pages/Notes";
import AuthPage from "./components/pages/Auth";
import Auth from "./data/Auth";

import firebase from "./data/firebase";

Vue.use(VueRouter);

let app = Vue.extend({
  components: { App }
});

let router = new VueRouter();

router.map({
  "/auth": {
    name: "auth",
    component: AuthPage
  },
  "/notes": {
    name: "notes",
    component: NotesPage,
    auth: true // this route requires the user to be signed in
  }
});

router.alias({
  "/": "/auth"
});

router.beforeEach(transition => {
  if (transition.to.auth && !Auth.getAuth()) {
    transition.redirect("/auth");
  } else {
    transition.next();
  }
});

router.start(app, "body");
