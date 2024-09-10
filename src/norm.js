class Norm {
	constructor() {
		this.api = "https://api.norm.gg"
		this.headers = {
			"User-Agent": "Dart/3.3 (dart:io)"
		}
	}

	async signIn(email, password) {
		const response = await fetch(
			`${this.api}/sessions`, {
				method: "POST",
				body: JSON.stringify({
					email: email,
					password: password
				}),
				headers: this.headers
			})
		const data = await response.json()
		this.accessToken = data.data.access_token
		this.headers["access-token"] = this.accessToken
		const accountInfo = await this.getAccountInfo()
		this.userId = accountInfo.data.id
		return data
	}

	async signUp(email, password) {
		const response = await fetch(
			`${this.api}/users`, {
				method: "POST",
				body: JSON.stringify({
					email: email,
					password: password
				}),
				headers: this.headers
			})
		return response.json()
	}

	async getAccountInfo() {
		const response = await fetch(
			`${this.api}/users/self`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async deleteAccount() {
		const response = await fetch(
			`${this.api}/users/self`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async verifyRegistration(nickname, firstName, lastName, avatarUrl = "https://s3.eu-central-1.amazonaws.com/media.norm/92ede11bab51c788e1be2846e5301250799343InIut6.jpg") {
		const response = await fetch(
			`${this.api}/users`, {
				method: "PUT",
				body: JSON.stringify({
					nickname: nickname,
					first_name: firstName,
					last_name: lastName,
					avatar: avatarUrl
				}),
				headers: this.headers
			})
		return response.json()
	}

	async getFeed(limit = 10) {
		const response = await fetch(
			`${this.api}/feed?limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getPostComments(postId, limit = 15) {
		const response = await fetch(
			`${this.api}/posts/${postId}/comments?limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async commentPost(postId, comment) {
		const response = await fetch(
			`${this.api}/posts/${postId}/comments`, {
				method: "POST",
				body: JSON.stringify({
					comment: comment
				}),
				headers: this.headers
			})
		return response.json()
	}

	async editComment(commentId, comment) {
		const response = await fetch(
			`${this.api}/posts/comments/${commentId}`, {
				method: "PUT",
				body: JSON.stringify({
					comment: comment
				}),
				headers: this.headers
			})
		return response.json()
	}

	async deleteComment(commentId) {
		const response = await fetch(
			`${this.api}/posts/comments/${commentId}`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async addPostToFavorites(postId) {
		const response = await fetch(
			`${this.api}/posts/${postId}/favorite`, {
				method: "POST",
				body: {},
				headers: this.headers
			})
		return response.json()
	}

	async deletePostFromFavorites(postId) {
		const response = await fetch(
			`${this.api}/posts/${postId}/favorite`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async followUser(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/follow`, {
				method: "POST",
				body: {},
				headers: this.headers
			})
		return response.json()
	}

	async unfollowUser(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/follow`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async getUser(userId) {
		const response = await fetch(
			`${this.api}/users/id/${userId}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUserPosts(userId, offset = 0, limit = 15) {
		const response = await fetch(
			`${this.api}/posts?offset=${offset}&limit=${limit}&id_user=${userId}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getUserRates(userId, offset = 0, limit = 15) {
		const response = await fetch(
			`${this.api}/user/${userId}/rates?offset=${offset}&limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async trustUser(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/trust`, {
				method: "POST",
				headers: this.headers
			})
		return response.json()
	}

	async untrustUser(userId) {
		const response = await fetch(
			`${this.api}/users/${userId}/trust`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async getDialogs(offset = 0, limit = 15) {
		const response = await fetch(
			`${this.api}/dialogs?offset=${offset}&limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getDialog(dialogId) {
		const response = await fetch(
			`${this.api}/dialogs/${dialogId}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async getDialogDeletedMessages(dialogId) {
		const response = await fetch(
			`${this.api}/dialogs/${dialogId}/messages/deleted`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}


	async getDialogMessages(dialogId, limit = 30) {
		const response = await fetch(
			`${this.api}/dialogs/${dialogId}/messages?limit=${limit}`, {
				method: "GET",
				headers: this.headers
			})
		return response.json()
	}

	async createPost(text) {
		const response = await fetch(
			`${this.api}/posts`, {
				method: "POST",
				body: JSON.stringify({
					text: text,
					accounts: [{
						type: "user",
						id: this.userId
					}]
				}),
				headers: this.headers
			})
		return response.json()
	}

	async editPost(postId, text) {
		const response = await fetch(
			`${this.api}/posts/${postId}`, {
				method: "PUT",
				body: JSON.stringify({
					text: text,
					accounts: [{
						type: "user",
						id: this.userId
					}]
				}),
				headers: this.headers
			})
		return response.json()
	}

	async deletePost(postId) {
		const response = await fetch(
			`${this.api}/posts/${postId}`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}

	async getNotifications(offset = 0, limit = 15) {
		const response = await fetch(
			`${this.api}/notifications?offset=${offset}&limit=${limit}`, {
				method: "DELETE",
				headers: this.headers
			})
		return response.json()
	}
}

module.exports = {Norm}
