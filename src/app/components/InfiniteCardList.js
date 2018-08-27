import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

class InfiniteCardList extends Component {
	static propTypes = {
		messages: PropTypes.array.isRequired,
		onRemoveMessage: PropTypes.func.isCompactMode,
	}

	render () {
		const { messages, onRemoveMessage } = this.props

		return (
			<div className="cardList">
				{messages.map(message => (
					<Card
						key={message.id}
						id={message.id}
						message={message}
						onRemoveMessage={onRemoveMessage}
					/>
				))}
			</div>
		)
	}
}

export default InfiniteCardList