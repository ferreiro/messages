import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'
import SearchHistoryItem from './SearchHistoryItem'

function SearchHistory (props) {
	const { previousSearches, onChangeQuery } = props

	return (
	    <ul className="search__history">
	        {previousSearches.map(searchItem => (
	            <SearchHistoryItem
	            	searchItem={searchItem}
	            	onChangeQuery={onChangeQuery}
	            />
	        ))}
	    </ul>
	)
}

SearchHistory.propTypes = {
	onChangeQuery: PropTypes.func.isRequired
}

export default SearchHistory
