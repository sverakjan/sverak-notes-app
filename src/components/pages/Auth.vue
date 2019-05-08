<template>
  <form class="auth-form" v-on:submit.prevent="wantsToSignUp ? signUpWithPassword() : signInWithPassword()">
    <h1>{{ wantsToSignUp ? "Registrovat" : "Přihlásit" }}</h1>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required v-model="email" />
    </div>
    <div>
      <label for="password">Heslo</label>
      <input type="password" name="password" id="password" required v-model="password" />
    </div>
    <div v-show="wantsToSignUp">
      <label for="confirm-password">Potvrďte heslo</label>
      <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword" />
    </div>
    <div v-show="!wantsToSignUp" class="clearfix btn-group">
      <button type="submit">Přihlásit se</button>
      <button type="button" v-on:click="wantsToSignUp = true">Registrovat</button>
    </div>
    <div v-show="wantsToSignUp">
      <button type="submit" class="signup-submit">Registrovat</button>
    </div>
  </form>
</template>
<script>
import Auth from "src/data/Auth";
import Notes from "../pages/Notes";
import HeaderBar from "../HeaderBar";
export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      wantsToSignUp: false
    };
  },
  methods: {
    signUpWithPassword() {
      if (this.password === this.confirmPassword) {
        Auth.signUpWithPassword({
          email: this.email,
          password: this.password
        })
          .then(userData => this.signInWithPassword()) // signIn
          .then(() => this.$dispatch("alert", { type: "success", message: "Uživatel úspěšně registrován" })) // let user know everything was successful
          .catch(error => this.$dispatch("alert", { type: "error", message: error.message })); // tell the user an error occurred
      }
    },
    signInWithPassword() {
      return Auth.signInWithPassword(this.email, this.password)
        .then(userData => {
          this.$dispatch("alert", { type: "success", message: "Uživatel přihlášen" });
          this.onSignedIn();
          return userData;
        })
        .catch(error => this.$dispatch("alert", { type: "error", message: error.message })); // tell the user an error occurred
    },
    onSignedIn() {
      this.$router.go({ name: "notes" });

      HeaderBar.onSignIn();
    }
  }
};
</script>
<style>
.auth-form {
  width: 480px;
  max-width: 100%;
  background: #fff;
  margin: 0 auto;
  padding: 15px;
  margin-top: 150px;
  border-radius: 7px;
  box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}
.auth-form h1 {
  font-weight: 300;
}
.auth-form > div {
  margin-top: 15px;
}
.auth-form input {
  height: 32px;
  background: #e4e4e4;
  border: none;
  border-radius: 3px;
  margin-bottom: 20px !important;
  font-size: 14px !important;
  padding-left: 10px;
}
.auth-form input:focus {
  border-bottom-color: #555;
}
.auth-form label,
.auth-form input {
  display: block;
  width: 100%;
  margin-bottom: 5px;
  font-size: 18px;
}
.auth-form button {
  font-size: 18px;
  background: #fff;
  border: 1px solid #41b883;
  padding: 4px 6px;
  margin: 0;
  border-radius: 4px;
  cursor: pointer;
  color: black;

  height: 40px;
  font-size: 20px;
}

.auth-form .btn-group {
  display: flex;
  justify-content: space-between;
}

.auth-form .btn-group button {
  width: 48%;
}

.auth-form button.disabled {
  background: #ccc;
  color: #999;
  cursor: default;
}

.auth-form .signup-submit {
  width: 100%;
}
.auth-form hr {
  margin-top: 20px;
}
.auth-form .social-providers {
  text-align: center;
}
.auth-form .social-providers a {
  color: #41b883;
  font-size: 36px;
  padding: 4px;
}
</style>
