<script setup>
import { RouterLink, RouterView } from "vue-router";
import InitializeUser from "./components/InitializeUser.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <InitializeUser />
        <RouterLink to="/">Stats</RouterLink>
        <RouterLink to="/library">Library</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
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
