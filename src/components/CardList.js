import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

function CardList (props) {
	const { messages } = props

	return (
		<div className="cardList">
			{messages.map(message => (
				<Card
					key={message.id}
					message={message}
				/>
			))}
		</div>
	)
}

CardList.propTypes = {
	messages: PropTypes.array.isRequired
}

export default CardList