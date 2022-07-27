import { defineStore } from "pinia";
import moment from "moment";
import { stringifyQuery } from "vue-router";

export const twitchStore = defineStore({
	id: "twitchStore",
	state: () => ({
		User: {
			username: "",
			userId: 0,
			valid: false,
			token: "",
		},
		Followers: {
			total: 1,
			followerArr: [],
			pagination: "",
			URL: "",
		},
		Subscribers: [],
		StreamData: {
			game: "",
			language: "",
			title: "",
			delay: "",
		},
		FollowedStreams: [],
		FilteredStreams: [],
		ActiveGames: [],
		chatURL: "",
		streamURL: "",
	}),
	actions: {
		// Initial validation request made to the API. Assembles the data into a User object and saves it in state
		async validate(token) {
			const res = await fetch("https://id.twitch.tv/oauth2/validate", {
				headers: new Headers({
					Authorization: "OAuth " + token,
				}),
			})
				.then(function (response) {
					return response.json();
				})
				.then((data) => {
					//console.log(data)
					this.User.username = data.login;
					this.User.userId = data.user_id;
					this.User.token = token;
					this.User.valid = true;

					this.chatURL =
						"https://www.twitch.tv/embed/" +
						this.User.username +
						"/chat?parent=localhost";

					this.streamURL =
						"https://player.twitch.tv/?channel=" +
						this.User.username +
						"&parent=localhost&muted=true";
				});
		},
		// Fetches the users that follow the User
		async fetchFollows() {
			for (var i = 0; i < this.Followers.total / 20; i++) {
				const followUrl =
					"https://api.twitch.tv/helix/users/follows?to_id=" +
					this.User.userId +
					"&after=" +
					this.Followers.pagination;
				let dataBlob = {};

				const followRes = await fetch(followUrl, {
					headers: new Headers({
						Authorization: "Bearer " + this.User.token,
						"Client-ID": "pk0roinew9e83z6qn6ctr7xo7yas15",
					}),
				})
					.then(function (response) {
						return response.json();
					})
					.then((data) => {
						const follows = [];

						for (const key in data.data) {
							const date = data.data[key].followed_at;

							follows.push({
								from_login: data.data[key].from_login,
								from_id: data.data[key].from_id,
								from_name: data.data[key].from_name,
								to_id: data.data[key].to_id,
								to_login: data.data[key].to_login,
								to_name: data.data[key].to_name,
								followed_at: moment(date).utc().format("MM-DD-YYYY"),
							});
						}

						this.Followers.total = data.total;
						this.Followers.followerArr.push(follows);
						this.Followers.pagination = data.pagination.cursor;
					});
			}
		},
		// Fetchs the subsribers to the User's channel
		async fetchSubs() {
			const subURL =
				"https://api.twitch.tv/helix/subscriptions?broadcaster_id=" +
				this.User.userId;

			const subRes = fetch(subURL, {
				headers: new Headers({
					Authorization: "Bearer " + this.User.token,
					"Client-ID": "pk0roinew9e83z6qn6ctr7xo7yas15",
				}),
			})
				.then(function (response) {
					return response.json();
				})
				.then((data) => {
					this.Subscribers.unshift(data.data);
				});
		},
		// Fetchs the User's current stream information
		async fetchStreamInfo() {
			const streamURL =
				"https://api.twitch.tv/helix/channels?broadcaster_id=" +
				this.User.userId;

			const streamRes = fetch(streamURL, {
				headers: new Headers({
					Authorization: "Bearer " + this.User.token,
					"Client-ID": "pk0roinew9e83z6qn6ctr7xo7yas15",
				}),
			})
				.then(function (response) {
					return response.json();
				})
				.then((data) => {
					this.StreamData.title = data.data[0].title;
					this.StreamData.game = data.data[0].game_name;
					this.StreamData.language = data.data[0].broadcaster_language;
					this.StreamData.delay = data.data[0].delay;
				});
		},
		// Fetchs the User's followed live streams
		async fetchLiveStreams() {
			const streamUrl =
				"https://api.twitch.tv/helix/streams/followed?user_id=" +
				this.User.userId;

			const streamRes = fetch(streamUrl, {
				headers: new Headers({
					Authorization: "Bearer " + this.User.token,
					"Client-ID": "pk0roinew9e83z6qn6ctr7xo7yas15",
				}),
			})
				.then(function (response) {
					return response.json();
				})
				.then((data) => {
					const streamDataArray = [];
					const activeGames = [];

					for (const key in data.data) {
						streamDataArray.push({
							id: data.data[key].id,
							user_id: data.data[key].user_id,
							user_name: data.data[key].user_name,
							game_id: data.data[key].game_name,
							stream_title: data.data[key].title,
							viewer_count: data.data[key].viewer_count,
							thumbnail_url: data.data[key].thumbnail_url
								.replace("{width}", "320")
								.replace("{height}", "180"),
							twitch_url: "https://twitch.tv/" + data.data[key].user_name,
						});
						if (!activeGames.includes(data.data[key].game_name)) {
							activeGames.push(data.data[key].game_name);
						}
					}
					this.FollowedStreams.unshift(streamDataArray);

					if (this.ActiveGames.length === 0) {
						this.ActiveGames.unshift(activeGames);
					}
				});
		},
	},
});
