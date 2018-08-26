import React from 'react'
import PropTypes from 'prop-types'

import SearchHistoryItem from './SearchHistoryItem'

function SearchHistory (props) {
	const { previousSearches, onLoadSearchHistoryItem } = props

	return (
	    <ul className="search__history">
	    	{console.log(previousSearches)}
	        {previousSearches.map(searchItem => (
	            <SearchHistoryItem
	            	key={searchItem.date}
	            	searchItem={searchItem}
	            	onLoadSearchHistoryItem={onLoadSearchHistoryItem}
	            />
	        ))}
	    </ul>
	)
}

SearchHistory.propTypes = {
	previousSearches: PropTypes.array.isRequired,
	onLoadSearchHistoryItem: PropTypes.func.isRequired,
}

export default SearchHistory
