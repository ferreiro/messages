const uniqid = require('uniqid')

class Message {
	constructor (data) {
		Object.defineProperties(this, {
			id: {
				value: uniqid(),
				writable: false,
			},

			isFavorite: {
				value: data.isFavorite || false,
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

	toJSON() {
	    return Object.getOwnPropertyNames(this).reduce((a, b) => {
	      a[b] = this[b];
	      return a;
	    }, {})
  }
} 

export default Message