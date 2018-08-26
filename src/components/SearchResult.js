import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SearchNotFound from './SearchNotFound'
import CardList from './CardList'

function SearchResult (props) {
	const { messages } = props

	return messages.length === 0
		? (
			<SearchNotFound />
		) : (
			<div>
            	<div className="search__title flex">
                    <span className="flexbox__elastic">Results</span>
                    <span className="flexbox">{messages.length}</span>
                </div>
                <div className="container__wrapper">
                    <div className="searchResults">
                        <CardList messages={messages} />
                    </div>
                </div>
            </div>)
}

SearchResult.propTypes = {
	messages: PropTypes.array.isRequired
}

export default SearchResult
