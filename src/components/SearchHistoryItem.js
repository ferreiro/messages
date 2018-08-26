import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchHistoryItem extends Component {
	handleEvent = (event) => {
		event.preventDefault()

		const { onLoadSearchHistoryItem, searchItem } = this.props
		onLoadSearchHistoryItem(searchItem.query)
	}

	render () {
		const { searchItem } = this.props

		return (
			<li
	            className="search__history__item flex"
	            onClick={this.handleEvent}
	        >
	            <div className="search__history__icon flexbox">
	                <span className="icon icon-update"></span>
	            </div>
	            <span className="search__history__text flexbox__elastic">{searchItem.query}</span>
	        </li>
		)
	}
}

SearchHistoryItem.propTypes = {
	onLoadSearchHistoryItem: PropTypes.func.isRequired
}

export default SearchHistoryItem

