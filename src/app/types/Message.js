class Message {
	constructor (data) {
		Object.defineProperties(this, {
			id: {
				value: data.id,
				writable: false,
			},

			isFavorite: {
				value: data.isFavorite,
				writable: true,
			},

			content: {
				value: data.content,
				writable: false,
			},

			updated: {
				value: data.updated,
				writable: false,
			},

			authorName: {
				value: data.authorName,
				writable: false,
			},

			avatarUrl: {
				value: data.avatarUrl,
				writable: false,
			}
		})
	}
} 

export default Message