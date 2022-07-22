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
      <option v-for="(game, i) in ActiveGames[0]" :value="game" :key="i" >
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
      filteredList: [],
    };
  },
  methods: {
    getFilteredGames(e) {
      console.log(this.FollowedStreams[0])

      this.filteredList = []
      
      if(document.getElementById("filter").value === "lo-high"){
        this.filteredList = this.FollowedStreams[0].reverse()
      }
      else if (document.getElementById("filter").value === "high-lo"){
        this.filteredList = this.FollowedStreams[0]
      }
      else if(document.getElementById("filter").value === "game"){
        

        this.filteredList = this.FollowedStreams[0].filter(
          (item) => item.game_id === document.getElementById("active-games").value
        );
      }
      console.log(this.filteredList)
      /* let game = e.target.value;
      const store = twitchStore();
      //let filteredActive = this.ActiveGames[0].filter((item) => item === game);
      let filteredStreams = this.FollowedStreams[0].filter(
        (item) => item.game_id === game
      );
      store.updateFilteredStreams(filteredStreams);
      console.log(filteredStreams); */
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