<template >
  <div class="filter-wrapper">
    <label for="filterBy"
      >Filter By:
      <select
        class="filter-select"
        name="filterBy"
        id="filter"
        @change="filterList($event)"
      >
        <option value="none" selected disabled hidden>Select an Option</option>
        <option value="game">Game</option>
        <option value="hi-lo">View Count (Descending)</option>
        <option value="lo-hi">View Count (Ascending)</option>
      </select>
    </label>
    <select
      class="game-select"
      name="gameFilter"
      id="active-games"
      v-show="this.filterValue === 'game'"
    >
      <option v-for="(game, i) in ActiveGames[0]" :value="game" :key="i">
        {{ game }}
      </option>
    </select>
    <button @click="getFilteredGames($event)">Filter</button>
  </div>
</template>

<script>
import { isObject } from "@vue/shared";
import { mapState } from "pinia";
import { twitchStore } from "../../stores/twitchData";
export default {
  data() {
    return {
      filterValue: "none",
      gameFilter: "",
    };
  },
  methods: {
    getFilteredGames(e) {
      const store = twitchStore();
      let filteredList = store.FollowedStreams[0];

      // Sorts OR Filters the original Followed Streams array stored in state
      if (this.filterValue === "lo-hi") {
        filteredList = store.FollowedStreams[0].sort(
          (a, b) => parseFloat(a.viewer_count) - parseFloat(b.viewer_count)
        );

        store.FilteredStreams = filteredList;
      } else if (this.filterValue === "hi-lo") {
        filteredList = store.FollowedStreams[0].sort(
          (a, b) => parseFloat(b.viewer_count) - parseFloat(a.viewer_count)
        );
        store.FilteredStreams = filteredList;
      } else if (this.filterValue === "game") {
        filteredList = store.FollowedStreams[0].filter(
          (item) =>
            item.game_id === document.getElementById("active-games").value
        );

        store.FilteredStreams = filteredList;
      }
    },
    filterList(e) {
      this.filterValue = e.target.value;
    },
  },
  computed: {
    ...mapState(twitchStore, ["ActiveGames", "FollowedStreams"]),
  },
};
</script>
<style scoped>
.filter-wrapper {
  margin: auto;
}
.filter-select {
  border-radius: 5rem;
  background-color: #ffffff;
  padding: 0.5rem;
  border: none;
}
.filter-select:active {
  border: none;
}
.game-select {
  border-radius: 5rem;
  background-color: #ffffff;
  padding: 0.5rem;
  border: none;
}
option {
  border-radius: 5rem;
}
</style>