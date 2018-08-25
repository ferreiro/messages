import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchHistoryItem extends Component {
	// Load the query into the search inout
	handleEvent = (event) => {
		const { onChangeQuery, searchItem } = this.props

		event.preventDefault()
		onChangeQuery(searchItem.query)
	}

	render () {
		const { searchItem } = this.props

		return (
			<li
	            className="search__history__item"
	            key={searchItem.date}
	            onClick={this.handleEvent}
	        >
	            <div className="search__history__icon">
	                <span className="icon icon-brightness_low"></span>
	            </div>
	            <span className="search__history__text">{searchItem.query}</span>
	        </li>
		)
	}
}

SearchHistoryItem.propTypes = {
	onChangeQuery: PropTypes.func.isRequired
}

export default SearchHistoryItem

