import Message from '../types/Message'

const api = "http://message-list.appspot.com/"
const headers = {
  'Accept': 'application/json',
}

export const get = ({ nextPageToken = '', limit = 10}) => 
	fetch(`${api}/messages?pageToken=${nextPageToken || '' }&limit=${limit}`, { headers })
		.then(res => res.json())

const getMocked = ({ nextPageToken = '', limit = 10}) => {
	const response = require('./response.json')
	return new Promise((resolve, reject) => {
		resolve(response)
	})
}

// Transform message from API to internal data type
export const toInternalMessage = (message) => {
	return new Message({
		id: message.id,
		content: message.content,
		updated: message.updated,
		authorName: message.author.name,
	  	avatarUrl: `${api}/${message.author.photoUrl}`,
	})
}
