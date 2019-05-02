<template>
  <form class="auth-form" v-on:submit.prevent="wantsToSignUp ? signUpWithPassword() : signInWithPassword()">
    <h1>{{ wantsToSignUp ? "Registrovat" : "Přihlásit" }}</h1>
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Email" required v-model="email" />
    </div>
    <div>
      <label for="password">Heslo</label>
      <input type="password" name="password" id="password" required v-model="password" placeholder="Heslo" />
    </div>
    <div v-show="wantsToSignUp">
      <label for="confirm-password">Potvrďte heslo</label>
      <input type="password" name="confirm-password" id="confirm-password" v-model="confirmPassword" placeholder="Potvrďte heslo" />
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
  border-radius: 2px;
  box-shadow: 0 1px 5px #ccc;
}
.auth-form h1 {
  font-weight: 300;
}
.auth-form > div {
  margin-top: 15px;
}
.auth-form input {
  height: 32px;
  border: none;
  border-bottom: 2px solid #bbb;
}
.auth-form input:focus {
  border-bottom-color: #555;
}
.auth-form label,
.auth-form input {
  display: block;
  width: 100%;
}
.auth-form button {
  font-size: 18px;
  background: #fff;
  border: 1px solid #41b883;
  padding: 4px 6px;
  margin: 0;
  border-radius: 3px;
  cursor: pointer;
}
.auth-form .btn-group button {
  border-radius: 3px 0 0 3px;
  width: 50%;
  float: left;
}
.auth-form .btn-group button + button {
  border-radius: 0 3px 3px 0;
  border-left: none;
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
