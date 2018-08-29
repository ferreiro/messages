import React from 'react'
import PropTypes from 'prop-types'

import SearchHistoryItem from './SearchHistoryItem'

function SearchHistory (props) {
	const { icon, searches, onLoadSearchHistoryItem } = props

	return (
	    <ul className="search__history">
	        {searches.map(searchItem => (
	            <SearchHistoryItem
	            	key={searchItem.date}
	            	icon={icon}
	            	searchItem={searchItem}
	            	onLoadSearchHistoryItem={onLoadSearchHistoryItem}
	            />
	        ))}
	    </ul>
	)
}

SearchHistory.propTypes = {
	icon: PropTypes.string.isRequired,
	previousSearches: PropTypes.array.isRequired,
	onLoadSearchHistoryItem: PropTypes.func.isRequired,
}

export default SearchHistory
