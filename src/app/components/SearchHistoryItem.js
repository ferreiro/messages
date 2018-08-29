import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchHistoryItem extends Component {
	propTypes = {
		icon: PropTypes.string.isRequired,
		onLoadSearchHistoryItem: PropTypes.func.isRequired,
	}

	handleEvent = (event) => {
		event.preventDefault()

		const { onLoadSearchHistoryItem, searchItem } = this.props
		onLoadSearchHistoryItem(searchItem.query)
	}

	render () {
		const { searchItem, icon = 'icon-update' } = this.props

		return (
			<li
	            className="list__item flex"
	            onClick={this.handleEvent}
	        >
	            <div className="list__icon flexbox">
	                <span className={`icon ${icon}`}></span>
	            </div>
	            <span className="list__text flexbox__elastic">
	            	{searchItem.query}
            	</span>
	        </li>
		)
	}
}

export default SearchHistoryItem

