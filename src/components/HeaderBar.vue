<template>
  <header>
    <div v-if="user">
      <span :key="user" class="user-title">{{ user.userTitle }}</span>
      <a class="sign-out-button hidden" href="#" v-on:click.prevent="signOut"><i class="fa fa-sign-out"></i></a>
    </div>
  </header>
</template>
<script>
import Auth from "src/data/Auth";

export default {
  data() {
    return {
      user: null
    };
  },
  watch: {},
  methods: {
    processUser() {
      var userEmailTimer = setInterval(function() {
        var user = Auth.getAuth();
        if (user.currentUser != null) {
          clearInterval(userEmailTimer);
          document.querySelector(".user-title").textContent = user.currentUser.email;
          document.querySelector(".sign-out-button").classList.remove("hidden");
        }
      }, 100);

      this.user = {
        userTitle: ""
      };
    },
    signOut() {
      Auth.signOut();
      this.$router.go("auth");
      document.querySelector(".user-title").textContent = "";
      document.querySelector(".sign-out-button").classList.add("hidden");
    }
  },
  ready() {
    this.processUser();
  },
  onSignIn() {
    document.querySelector(".user-title").textContent = Auth.getAuth().currentUser.email;
    document.querySelector(".sign-out-button").classList.remove("hidden");
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

.user-title {
  margin-right: 10px;
}

.sign-out-button.hidden {
  display: none;
}
</style>
