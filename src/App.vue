<script setup>
import { RouterLink, RouterView } from "vue-router";
import InitializeUser from "./components/InitializeUser.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <InitializeUser />
        <RouterLink to="/" class="nav-link">Stats</RouterLink>
        <RouterLink to="/library" class="nav-link">Library</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

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
  margin-top: 60px;
}
.wrapper {
  width: 100%;
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
.nav-linke:active {
  background-color: #9146ff;
}
</style>
