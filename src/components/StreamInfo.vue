<template>
  <div class="content-wrapper">
    <h1 id="user" @change="test()">{{ User.username }}</h1>
    <h2>Title - {{ StreamData.title }}</h2>
    <h2>Game - {{ StreamData.game }}</h2>
  </div>

  <div>
    <iframe id="twitch-chat-embed" src="" height="500" width="350"> </iframe>
  </div>
</template>

<script>
//            return `https://www.twitch.tv/embed/${this.channel}/chat?parent=${window.location.hostname}&darkpopout`;

import { twitchStore } from "../stores/twitchData";
import { mapState } from "pinia";
import { onMounted } from "vue";

export default {
  methods: {
    test() {
      console.log("shid");
    },
  },
  computed: {
    ...mapState(twitchStore, ["User", "StreamData", "chatURL"]),
  },
  data() {
    return {
      username: document.getElementById("user"),
    };
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