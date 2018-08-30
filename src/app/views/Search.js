import React, { Component } from "react";
import PropTypes from 'prop-types'

import SearchHistoryRepository from '../libs/SearchHistoryRepository'

import SearchHeader from '../components/SearchHeader'
import SearchHistory from '../components/SearchHistory'
import SearchResult from '../components/SearchResult'

class Search extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onRemoveMessage: PropTypes.func.isRequired,
        onFavoriteMessage: PropTypes.func.isRequired,
    }

    state = {
        query: '',
        filteredMessages: [],
        suggestedSearches: [
            SearchHistoryRepository.create({ query: 'Lewis Carroll' }),
            SearchHistoryRepository.create({ query: 'Come away, my dears' }),
            SearchHistoryRepository.create({ query: 'William Shakespeare' }),
        ],
        previousSearches: [], 
        displaySearchHistory: true,
    }

    componentDidMount () {
        this.focusOnSearch()
        this.setState({ previousSearches: SearchHistoryRepository.getQueries() })
    }

    focusOnSearch = () => {
        const input = document.getElementById('searchQueryInput')
        input.focus()
    }

    udpateQuery = (query) => this.setState({ query })
    
    onChangeQuery = (event) => this.udpateQuery(event.target.value)

    onClearSearch = (event) => {
        event.preventDefault()
        this.clearSearchResult()
        this.focusOnSearch()
    }

    onSubmitQuery = (event) => {
        event.preventDefault()

        const input = document.getElementById('searchQueryInput')
        const query = input.value

        if (query.length === 0) {
            this.clearSearchResult()
        } else {
            this.addSearchHistoryItem(query)
            this.getSearchResult(query)
        }
    }

    clearSearchResult = () => {
        this.showSearchHistory()
        this.setState({
            query: '',
            filteredMessages: [],
        })
    }

    getSearchResult = (query) => {
        const { messages } = this.props
        const normalizedQuery = query.toLowerCase().trim()

        this.hideSearchHistory()
        this.setState({
            filteredMessages: messages.filter(message => {
                return message.content.toLowerCase().includes(normalizedQuery)
                        || message.authorName.toLowerCase().includes(normalizedQuery)
            })
        })
    }

    hideSearchHistory = () => this.setState({ displaySearchHistory: false })
    showSearchHistory = () => this.setState({ displaySearchHistory: true })

    loadSearchHistoryItem = (query) => {
        this.udpateQuery(query)
        this.getSearchResult(query)
        this.hideSearchHistory()
    }

    addSearchHistoryItem = (query) => {
        const historyQuery = SearchHistoryRepository.create({
            query, date: new Date()
        })

        SearchHistoryRepository.addQuery(historyQuery)

        const updateHistorySearches = (prevState) => {
            const newSearches = [ historyQuery, ...prevState.previousSearches]
            return newSearches.slice(0, SearchHistoryRepository.getMaxSearches())
        }

        this.setState((prevState) => ({
            previousSearches: updateHistorySearches(prevState)
        }))
    }

    render () {
        const { query } = this.state
        const {
            onChangeQuery,
            onClearSearch,
            onSubmitQuery,
        } = this

        return (
        	<div className="Page">
                <SearchHeader
                    query={query}
                    onChangeQuery={onChangeQuery}
                    onClearSearch={onClearSearch}
                    onSubmitHandler={onSubmitQuery}
                />

                <div className="container">
                    {this.state.displaySearchHistory === true
                        ? (
                            <div>

                                <div className="list__title flex">
                                    <span className="flexbox__elastic">Suggested searches</span>
                                </div>
                                <SearchHistory
                                    icon='icon-star_border'
                                    searches={this.state.suggestedSearches}
                                    onLoadSearchHistoryItem={this.loadSearchHistoryItem}
                                />

                                <div className="list__title flex">
                                    <span className="flexbox__elastic">Previous searches</span>
                                </div>

                                <SearchHistory
                                    icon='icon-update'
                                    searches={this.state.previousSearches}
                                    onLoadSearchHistoryItem={this.loadSearchHistoryItem}
                                />

                                {this.state.previousSearches.length === 0 && (
                                    <p className='search__noResults'>No previous search saved!<br /> Your next queries will be stored here :)</p>
                                )}
                            </div>
                        ) : (
                            <SearchResult
                                messages={this.state.filteredMessages}
                                onRemoveMessage={this.props.onRemoveMessage}
                                onFavoriteMessage={this.props.onFavoriteMessage}
                            />
                        )
                    }
                </div>
	        </div>
        )
    }
}

export default Search
