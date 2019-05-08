<template>
  <header>
    <h1 class="header-title">JavaScript na webovém serveru s využitím frameworku Node.js</h1>

    <div class="header-links">
      <a href="https://github.com/sverakjan/sverak-notes-app" target="_blank" title="Zdrojový kód projektu (Github)">
        <span>
          Zdrojový kód projektu
        </span>
        <i class="fa fa-github"></i>
      </a>

      <a href="static/BakalarskaPrace_JanSverak.pdf" target="_blank" title="Bakalářská práce (PDF)">
        <span>
          Bakalářská práce
        </span>
        <i class="fa fa-file-pdf-o"></i>
      </a>
    </div>

    <div class="header-user" v-if="user">
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
  height: 100px;
  background: white;
  box-shadow: 0 0 10px 1px rgba(161, 161, 161, 0.37);
  display: flex;
  align-items: center;
  padding: 10px 30px;
}

.header-title {
  font-size: 20px;
  width: 425px;
  flex-shrink: 0;
  margin-right: 50px;
}

.header-links {
  display: flex;
  flex-wrap: wrap;
  margin-right: 30px;
}

.header-links a {
  color: black;
  text-decoration: none;
  margin: 5px 0;
  display: flex;
  align-items: flex-start;
}

.header-links a:first-child {
  margin-right: 20px;
}

.header-links i {
  font-size: 18px;
  margin-left: 5px;
  transform: translateY(2px);
}
.header-links span {
  text-decoration: underline;
}

.header-links a:hover span {
  text-decoration: none;
}

.header-user {
  margin-left: auto;
}

.user-title {
  margin-right: 10px;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-user {
  display: flex;
  align-items: center;
}

.sign-out-button {
  font-size: 24px;
  margin-left: 5px;
  color: black;
}

.sign-out-button.hidden {
  display: none;
}

@media (max-width: 1000px) {
  .header-title {
    font-size: 18px;
    width: 210px;
    margin-right: 45px;
  }

  .header-links {
    margin-right: 0;
  }

  .header-links a {
    margin-right: 20px;
  }
}

@media (max-width: 749px) {
  header {
    padding: 10px 15px;
  }

  .header-title {
    font-size: 16px;
    width: 190px;
    margin-right: 25px;
  }

  .header-links {
    width: 28px;
  }

  .header-links a {
    margin: 8px 0;
  }

  .header-links span {
    display: none;
  }

  .header-links i {
    font-size: 23px;
  }
}

@media (max-width: 530px) {
  .user-title {
    display: none;
  }
}
</style>
