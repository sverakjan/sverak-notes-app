<template>
  <div>
    <header-bar></header-bar>
    <alerts :alerts="alerts"></alerts>
    <router-view></router-view>
    <footer>
      <span>
        Jan Svěrák - České Budějovice 2019
      </span>
    </footer>
  </div>
</template>
<script>
import Alerts from "./components/Alerts";
import HeaderBar from "./components/HeaderBar";
export default {
  components: {
    Alerts,
    HeaderBar
  },
  data() {
    return {
      alerts: []
    };
  },
  events: {
    alert: function(alert) {
      this.alerts.push(alert);
      setTimeout(() => {
        this.alerts.$remove(alert);
      }, alert.duration || 1500);
    },
    search: function(searchText) {
      this.$broadcast("search", searchText); // send the event downwards to children
    }
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html {
  position: relative;
  min-height: 100%;
}
body {
  font-family: "Open Sans", sans-serif;
  min-height: 100%;
}
body > div {
  /* padding: 50px 16px; */
  /* padding-top: 50px; */
  padding-top: 100px;
  padding-bottom: 30px;
  min-height: 100vh;
  background-color: #f5f5f5;
  position: relative;
  /* margin-bottom: 50px; */
  z-index: 1;
  /* box-shadow: 0 2px 5px #111; */
}

footer {
  box-shadow: 0 0 10px 1px rgba(161, 161, 161, 0.37);
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  padding: 0 15px;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

footer span {
  font-size: 15px;
}

.clearfix:after {
  content: "";
  display: table;
  clear: both;
}
</style>
