import React from 'react'
import PropTypes from 'prop-types';

function CardAvatar (props) {
	const { avatarUrl } = props

	return (
		<div
			className="card__avatar flexbox"
			style={{
                backgroundImage: `url(${avatarUrl})`
            }}
		></div>
	)
}

CardAvatar.propTypes = {
	avatarUrl: PropTypes.string.isRequired
}

export default CardAvatar