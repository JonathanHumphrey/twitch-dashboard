<template>
  <div class="content-wrapper">
    <div>
      <label for="filterBy"
        >Filter By:
        <select name="filterBy" id="filter" @change="filterList($event)">
          <option value="none" selected disabled hidden>
            Select an Option
          </option>
          <option value="game">Game</option>
          <option value="hi-lo">View Count (Descending)</option>
          <option value="lo-hi">View Count (Ascending)</option>
        </select>
      </label>
      <select
        name="gameFilter"
        id="activeGames"
        v-show="this.filterValue === 'game'"
        @change="getFilteredGames($event)"
      >
        <option v-for="(game, i) in activeGames" :value="game" :key="i">
          {{ game }}
        </option>
      </select>
    </div>
    <div class="content" v-for="(stream, i) in FollowedStreams[0]" :key="i">
      <h4>{{ stream.user_name }}</h4>
      <div class="stream-info">
        <h5>{{ stream.stream_title }}</h5>
        <h5 class="game-name">Game: {{ stream.game_id }}</h5>
        <h5 class="view-count">Viewers: {{ stream.viewer_count }}</h5>
      </div>

      <a href="https://twitch.tv/" target="_blank">
        <img :src="`${stream.thumbnail_url}`" alt="" />
      </a>
    </div>
  </div>
</template>
<script>
import { mapState } from "pinia";
import { twitchStore } from "../stores/twitchData";

export default {
  data() {
    return {
      filterValue: "none",
      gameFilter: "",
      //filteredList: this.followedStreams,
    };
  },
  methods: {},
  computed: {
    ...mapState(twitchStore, ["ActiveGames", "FollowedStreams"]),
  },
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
  justify-content: space-between;
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
h4 {
  margin: 2rem;

  width: 30%;
}
img {
  margin: 1rem;
  border-radius: 2rem;
}
</style>
