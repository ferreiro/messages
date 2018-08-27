import Message from '../types/Message'

const response = require('./response.json')
const api = "http://message-list.appspot.com/"
const headers = {
  'Accept': 'application/json',
}

export const get = (options) =>
	new Promise((resolve, reject) => {
		resolve(response)
	})

  	//fetch(`${api}/messages`, { headers })
	//    .then(res => res.json())

// Transform message from API to internal data type
export const toInternalMessage = (message) =>
	new Message({
		id: message.id,
		content: message.content,
		updated: message.updated,
		authorName: message.author.name,
	  	avatarUrl: `${api}/${message.author.photoUrl}`
	})
