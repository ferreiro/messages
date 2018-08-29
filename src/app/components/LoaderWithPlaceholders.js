import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlaceholderCardList from './PlaceholderCardList'

class LoaderWithPlaceholders extends Component {
	static propTypes = {
		// ref
		count: PropTypes.number.isRequired,
		placeholderHeight: PropTypes.Number,
	}

	render () {
		const { count , placeholderHeight } = this.props
		return (
	      	<div
				id='loadMore'
				className='loadMoreTrigger loadMore__shadow'
			>
				<PlaceholderCardList
					count={count}
					placeholderHeight={placeholderHeight}
				/>
			</div>
		)
 	}
}

export default LoaderWithPlaceholders


