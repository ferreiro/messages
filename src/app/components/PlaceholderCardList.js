import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlaceholderCard from './PlaceholderCard'

class PlaceholderCardList extends Component {
	static propTypes = {
		count: PropTypes.number.isRequired,
		placeholderHeight: PropTypes.Number,
	}

	render () {
		const { count = 1, placeholderHeight } = this.props
		
		return (
			<div>
				{Array.from(Array(count).keys()).map((index) => (
					<PlaceholderCard key={index} height={placeholderHeight} />
				))}
			</div>
		)
 	}
}

export default PlaceholderCardList