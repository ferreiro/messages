import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

function CardList (props) {
	const { messages, onRemoveMessage } = props

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

CardList.propTypes = {
	messages: PropTypes.array.isRequired,
	onRemoveMessage: PropTypes.func.isCompactMode,
}

export default CardList