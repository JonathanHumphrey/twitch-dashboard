<template>
  <div class="init-wrapper" v-if="User.userId === 0">
    <a 
      href="https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=pk0roinew9e83z6qn6ctr7xo7yas15&redirect_uri=https://astounding-blancmange-fb88d6.netlify.app/&scope=user:read:follows%20channel:read:subscriptions%20user:read:follows%20channel:manage:broadcast"
      class="link-acc"
      >Link
    </a>
    <button
      class="link-button"
      @click="validateToken()"
    >
      Display Content
    </button>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { twitchStore } from "../stores/twitchData";

export default {
  methods: {
    // Initial validation request parsed through a token from the URL, then a request is made on the store to the API
    validateToken() {
      const store = twitchStore();
      let url = window.location.hash;
      let split = url.split(/[:&]/);
      let token = split[0].split("=");
      let actualToken = token[1];

      store.validate(actualToken);

      // Timeout of half a second put in place to account for API request time, with a little space on either side in case load times increase
      setTimeout(() => {
        store.fetchFollows();
        store.fetchSubs();
        store.fetchLiveStreams();
        store.fetchStreamInfo();
      }, 500);
    },
  },
  computed: {
    ...mapState(twitchStore, ["User"]),
  },
};
</script>
<style scoped>
.init-wrapper {
  margin-bottom: 5rem;
  width: 10rem;
  margin: auto;
  margin-top: 5rem;
}
.link-button {
  text-decoration: none;
  background-color: #6441a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem;
  color: #ffffff;
  border: none;
  cursor: pointer;
}
.link-acc {
  text-decoration: none;
  background-color: #6441a5;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 1rem;
  color: #ffffff;
}
</style>