<template>
  <div class="content-wrapper">
    <FilterBy />
    <div class="content" v-for="(stream, i) in FilteredStreams" :key="i">
      <h4 class="streamer-name">{{ stream.user_name }}</h4>
      <div class="stream-info">
        <h4>{{ stream.stream_title }}</h4>
        <hr />
        <h5 class="game-name">Game: {{ stream.game_id }}</h5>
        <h5 class="view-count">Viewers: {{ stream.viewer_count }}</h5>
      </div>
      <span @click="openWindow(stream.twitch_url)">
        <img :src="`${stream.thumbnail_url}`" alt="" />
      </span>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { twitchStore } from "../stores/twitchData";
import FilterBy from "./followed-streams/FilterBy.vue";

export default {
  methods: {
    openWindow(url) {
      window.open(url);
    },
  },
  computed: {
    ...mapState(twitchStore, ["ActiveGames", "FilteredStreams"]),
  },
  components: { FilterBy },
};
</script>
<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  margin: 2rem;
}
.content {
  display: inherit;
  border-radius: 2rem;
  margin: 0.5rem;
  flex-direction: row;
  justify-content: space-around;
  text-align: left;
  background-color: #9146ff;
}
.stream-info {
  width: 66%;
}
.game-name {
  text-align: left;
}
.view-count {
  text-align: left;
}
.streamer-name {
  margin: 2rem;

  width: 30%;
}
img {
  margin: 1rem;
  border-radius: 2rem;
}
span {
  cursor: pointer;
}
</style>
