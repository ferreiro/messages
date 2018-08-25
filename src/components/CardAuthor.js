import React from 'react'
import PropTypes from 'prop-types'

function CardAuthor (props) {
	const { authorName } = props

	return (
		<div className="card__author">
			{authorName}
		</div>
	)
}

CardAuthor.propTypes = {
	authorName: PropTypes.string.isRequired
}

export default CardAuthor