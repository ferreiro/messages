import React, { Component } from 'react'
import PropTypes from 'prop-types'

import PlaceholderCardList from './PlaceholderCardList'

class LoaderWithButton extends Component {
	static propTypes = {
		// ref
		isLoading: PropTypes.bool.isRequired,
		placeholderHeight: PropTypes.Number,
		onLoadMoreManually: PropTypes.func.isRequired,
	}

	render () {
		const {
			isLoading,
			placeholderHeight,
			onLoadMoreManually
		} = this.props
		return (
			<div className='loadMore loadMore__shadow'>
				{isLoading && (
					<div style={{marginBottom: '30px'}}>
						<PlaceholderCardList
							count={1}
							placeholderHeight={placeholderHeight}
						/>
					</div>
				)}

      			<button
      				className='loadMore__button'
      				onClick={onLoadMoreManually}
  				>
      				Load more
      			</button>
  			</div>
		)
 	}
}

export default LoaderWithButton




