import React from 'react'
import PropTypes from 'prop-types'

import SearchNotFound from './SearchNotFound'
import CardList from './CardList'

function SearchResult (props) {
	const { messages, onRemoveMessage, onFavoriteMessage } = props

	return messages.length === 0
		? (
			<SearchNotFound />
		) : (
			<div>
            	<div className="list__title flex">
                    <span className="flexbox__elastic">Results</span>
                    <span className="flexbox">{messages.length}</span>
                </div>
                <div className="container__wrapper">
                    <div className="searchResults">
                        <CardList
                            messages={messages}
                            onRemoveMessage={onRemoveMessage}
                            onFavoriteMessage={onFavoriteMessage}
                        />
                    </div>
                </div>
            </div>)
}

SearchResult.propTypes = {
	messages: PropTypes.array.isRequired,
    onRemoveMessage: PropTypes.func.isRequired,
    onFavoriteMessage: PropTypes.func.isRequired,
}

export default SearchResult
