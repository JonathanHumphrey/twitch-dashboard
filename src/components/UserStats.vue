<template>
  <div class="content-wrapper">
    <div class="header">
      <h1>{{ User.username }}</h1>
    </div>
    <div class="general-stats">
      <p>Total Follows: {{ Followers.total }}</p>
      <p>Total Subs: {{ Subscribers.length }}</p>
    </div>
    <div class="stats-header">
      <h3>Follows</h3>
      <h3>Subscribers</h3>
    </div>
    <hr />
    <div class="stats-tables">
      <table>
        <thead>
          <th>Name</th>
          <th>Follow Date</th>
        </thead>
        <tbody>
          <tr v-for="(follower, i) in Followers.followerArr[0]" v-bind:key="i">
            <td>{{ follower.from_login }}</td>
            <td>{{ follower.followed_at }}</td>
          </tr>
        </tbody>
        <Pagination
          :totalPages="7"
          :perPage="20"
          :currentPage="currentPage"
          @pagechanged="onPageChange"
        />
      </table>
      <table>
        <thead>
          <th>Name</th>
          <th>Tier</th>
          <th>Is Gifted</th>
        </thead>
        <tbody>
          <tr v-for="(subs, i) in Subscribers[0]" v-bind:key="i">
            <td>{{ subs.user_name }}</td>
            <td>{{ subs.tier / 1000 }}</td>
            <td>{{ subs.is_gift }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Pagination from "../components/Pagination.vue";

import { mapState } from "pinia";
import { twitchStore } from "../stores/twitchData";

export default {
  props: {
    title: {
      type: String,
      default: "Tab",
    },
  },
  computed: {
    ...mapState(twitchStore, ["User", "Followers", "Subscribers"]),
  },
  components: { Pagination },
  data() {
    return {
      isActive: true,
      currentPage: 1,
    };
  },
  methods: {
    onPageChange(page) {
      console.log(this.currentPage);
      this.currentPage = page;
    },
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
}
.stats-tables {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  margin-right: 2rem;
  margin-left: 2rem;
}
.header {
  margin: 1rem;
  display: flex;
  width: 20rem;
}
.stats-header {
  display: flex;
  justify-content: space-around;
}
.general-stats {
  margin: 1rem;
  display: flex;
  width: 20rem;
  justify-content: space-between;
}
table {
  text-align: left;
  table-layout: auto;
  border-collapse: collapse;
  width: 50%;
  margin: 2rem;
  height: 1rem;
}
hr {
  width: 66%;
  border: 1px solid #392e5c;
  border-radius: 5rem;
}
th {
  margin-bottom: 10rem;
}
</style>