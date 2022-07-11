<template>
  <div class="content-wrapper">
    <h1>{{ User.username }}</h1>
    <h2>Title - {{ StreamData.title }}</h2>
    <h2>Game - {{ StreamData.game }}</h2>
  </div>
</template>

<script>
import { twitchStore } from "../stores/twitchData";
import { mapState } from "pinia";
export default {
  computed: {
    ...mapState(twitchStore, ["User", "StreamData"]),
  },
};
</script>

<style scoped>
.content-wrapper {
  border-radius: 2rem;
  margin: 0.5rem;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
  background-color: #9146ff;
  min-height: 50rem;
}
h1 {
  margin: 2rem;
}
h2 {
  margin: 3rem;
}
</style>