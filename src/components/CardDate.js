import React from 'react'
import PropTypes from 'prop-types'
import timeago from 'timeago.js'

function CardDate (props) {
	const { updated } = props

	return (
		<div className="card__date">
			{timeago().format(updated)}
		</div>
	)
}

CardDate.propTypes = {
	updated: PropTypes.string.isRequired
}

export default CardDate