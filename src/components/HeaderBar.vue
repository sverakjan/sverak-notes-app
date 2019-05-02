<template>
  <header v-if="user">
    <span class="user-title">{{ user.userTitle }}</span>
    <a href="#" v-on:click.prevent="signOut"><i class="fa fa-sign-out"></i></a>
  </header>
</template>
<script>
import Auth from "src/data/Auth";
export default {
  data() {
    return {
      user: ""
    };
  },
  watch: {},
  methods: {
    processUser(authed) {
      if (authed === null) {
        this.user = null;
        return;
      }

      console.log(Auth.getAuth());

      this.user = {
        userTitle: ""
      };
    },
    signOut() {
      Auth.signOut();
      this.$router.go("auth");
    }
  },
  ready() {
    var testik = Auth.onAuth(); // processUser everytime auth state changes (signs in or out)

    this.processUser(testik); // processUser in case user is already signed in
  }
};
</script>
<style>
header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1;
  height: 50px;
  background: white;
  box-shadow: 0 0 10px 1px rgba(161, 161, 161, 0.37);
  padding: 10px;
}
</style>
