import Message from '../types/Message'

const api = "http://message-list.appspot.com/messages"
const headers = {
  'Accept': 'application/json',
}

export const get = () =>
  	fetch(api, { headers })
	    .then(res => res.json())

// Transform message from API to internal data type
export const toInternalMessage = (message) =>
	new Message({
		id: message.id,
		content: message.content,
		updated: message.updated,
		authorName: "William Shakespeare",
	  	avatarUrl: "/photos/william-shakespeare.jpg"
	})
