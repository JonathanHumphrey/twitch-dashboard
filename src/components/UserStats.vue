<template>
  <div class="content-wrapper" v-if="User.valid === true">
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
      <div class="follower-stats">
        <table>
          <thead>
            <th>Name</th>
            <th>Follow Date</th>
          </thead>
          <tbody>
            <tr
              v-for="(follower, i) in Followers.followerArr[currentPage - 1]"
              v-bind:key="i"
            >
              <td>{{ follower.from_login }}</td>
              <td>{{ follower.followed_at }}</td>
            </tr>
          </tbody>
          <div class="pagination">
            <Pagination
              :totalPages="Math.floor(Followers.total / 20) + 1"
              :perPage="20"
              :currentPage="currentPage"
              @pagechanged="onPageChange"
            />
          </div>
        </table>
      </div>
      <div class="sub-stats">
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
  </div>
</template>

<script>
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
  min-height: 50rem;
}
.stats-tables {
  display: flex;
  flex-direction: row;
  margin-top: 0.5rem;
  margin-right: 2rem;
  margin-left: 2rem;
  justify-content: space-around;
}
.follower-stats {
  display: flex;
  justify-content: center;
  width: 33%;
}
.sub-stats {
  display: inherit;
  justify-content: center;
  width: 33%;

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
  margin-left: 2rem;
  display: flex;
  width: 20rem;
  justify-content: space-between;
}
.pagination {
  position: absolute;
  left: 10rem;
  bottom: 3rem;
}
table {
  width: 100%;
  table-layout: auto;
  border-collapse: collapse;
  height: 1rem;
  margin: 0, 2rem, 10rem;
  
}
hr {
  width: 66%;
  border: 1px solid #392e5c;
  border-radius: 5rem;
}
th {
  margin-bottom: 10rem;
}
td{
  margin-right: 15rem;
  width: 50%;
}

</style>