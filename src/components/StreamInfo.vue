<template>
  <div class="component-wrapper">
    <h1 id="user">{{ User.username }}</h1>
    <h2>Title - {{ StreamData.title }}</h2>
    <h2>Game - {{ StreamData.game }}</h2>
    <div class="content-wrapper">
      <div class="twitch-stream">
        <iframe
          id="twitch-stream-embed"
          src="{{streamURL}}"
          height="480"
          width="854"
          allowfullscreen
        >
        </iframe>
      </div>
      <div class="twitch-chat">
        <iframe
          id="twitch-chat-embed"
          src="{{chatURL}}"
          height="500"
          width="350"
        >
        </iframe>
      </div>
    </div>
    <button class="refresh" @click="updateContent()">&#8635;</button>
  </div>
</template>

<script>
import { twitchStore } from "../stores/twitchData";
import { mapState } from "pinia";

export default {
  methods: {
    // This method serves to change the source programattically since iframe elements cannot take a variable as the source
    updateContent() {
      document.getElementById("twitch-chat-embed").src = this.chatURL;
      document.getElementById("twitch-stream-embed").src = this.streamURL;
    },
  },
  computed: {
    ...mapState(twitchStore, ["User", "StreamData", "chatURL", "streamURL"]),
  },
  data() {
    return {
      username: document.getElementById("user"),
    };
  },
};
</script>

<style scoped>
.component-wrapper {
  border-radius: 2rem;
  margin: 0.5rem;
  flex-direction: row;
  justify-content: space-between;
  text-align: left;
  background-color: #9146ff;
  min-height: 50rem;
  position: relative;
}
.content-wrapper {
  display: flex;
  margin: auto;
  justify-content: center;
  background-color: #6441a5;
  width: 75%;
  border-radius: 2rem;
  padding-top: 2rem;
}
.refresh {
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  border: none;
  margin: 0.1rem;
  font-size: 1rem;
  border-radius: 0.2rem;
  background-color: #6441a5;
  color: azure;
}
.refresh:hover {
  background-color: #0e9dd9;
}
h1 {
  margin: 2rem;
}
h2 {
  margin: 3rem;
}
</style>