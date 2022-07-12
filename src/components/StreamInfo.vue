<template>
  <div class="content-wrapper">
    <h1>{{ User.username }}</h1>
    <h2>Title - {{ StreamData.title }}</h2>
    <h2>Game - {{ StreamData.game }}</h2>
    <div class="update-form">
      <form action="" method="post">
        <input type="text" class="text" id="title" placeholder="Title" />
        <input type="text" class="text" id="game" placeholder="Game" />
        <input type="submit" class="submit" @click="submit($event)" />
      </form>
    </div>
  </div>
</template>

<script>
import { twitchStore } from "../stores/twitchData";
import { mapState } from "pinia";
export default {
  methods: {
    submit(event) {
      const store = twitchStore();
      event.preventDefault();
      let title = document.getElementById("title");
      let game = document.getElementById("game");

      const dataBlob = {
        title: title.value,
        game: game.value,
      };
      store.updateStreamInfo(dataBlob);
    },
  },
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