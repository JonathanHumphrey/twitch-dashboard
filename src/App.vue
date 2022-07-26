<script setup>
import { RouterLink, RouterView } from "vue-router";
import InitializeUser from "./components/InitializeUser.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <InitializeUser />
      <div class="nav-bar">
        <nav v-if="User.valid === true">
          <RouterLink to="/" class="nav-link">Stats</RouterLink>
          <RouterLink to="/library" class="nav-link">Library</RouterLink>
          <RouterLink to="/stream-info" class="nav-link"
            >Stream Info</RouterLink
          >
        </nav>
      </div>
    </div>
  </header>
  <RouterView />
</template>
<script>
import { twitchStore } from "./stores/twitchData";
import { mapState } from "pinia";
export default {
  data() {
    return {
      selected: "",
    };
  },
  methods: {},
  computed: {
    ...mapState(twitchStore, ["User"]),
  },
};
</script>
<style>
html {
  background-color: #392e5c;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
}

.wrapper {
  width: 100%;
  height: 5rem;
}
.nav-bar {
  margin: auto;
  margin-top: 2rem;
}
.router-link-active {
  background-color: #9146ff;
}
.nav-link {
  text-decoration: none;
  background-color: #6441a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0.25rem;
  color: #ffffff;
}
.nav-link:hover {
  padding: 1rem;
}
</style>
