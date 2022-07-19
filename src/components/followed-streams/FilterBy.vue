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
      id="activeGames"
      v-show="this.filterValue === 'game'"
      @change="getFilteredGames($event)"
    >
      <option v-for="(game, i) in ActiveGames[0]" :value="game" :key="i">
        {{ game }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { twitchStore } from "../../stores/twitchData";
export default {
  data() {
    return {
      filterValue: "none",
      gameFilter: "",
      //filteredList: this.followedStreams,
    };
  },
  methods: {
    getFilteredGames(e) {
      let game = e.target.value;
      const store = twitchStore();
      //let filteredActive = this.ActiveGames[0].filter((item) => item === game);
      let filteredStreams = this.FollowedStreams[0].filter(
        (item) => item.game_id === game
      );
      store.updateFilteredStreams(filteredStreams);
      console.log(filteredStreams);
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