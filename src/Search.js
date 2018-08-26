import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import SearchHistoryRepository from './libs/SearchHistoryRepository'

import SearchHeader from './components/SearchHeader'
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'

class Search extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
    }

    state = {
        query: '',
        filteredMessages: [],
        previousSearches: [
            // SearchHistoryRepository.create({ query: 'William Shakespeare' })
        ],
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

        const updateHistorySearches = (prevState) => {
            const newSearches = [ historyQuery, ...prevState.previousSearches]
            return newSearches.slice(0, SearchHistoryRepository.getMaxSearches())
        }

        this.setState((prevState) => ({
            previousSearches: updateHistorySearches(prevState)
        }))
    }

    render() {
        return (
        	<div className="Page">
                <SearchHeader
                    query={this.state.query}
                    onChangeQuery={this.onChangeQuery}
                    onClearSearch={this.onClearSearch}
                    onSubmitHandler={this.onSubmitQuery}
                />

                <div className="container">
                    {this.state.displaySearchHistory === true
                        ? (
                            <SearchHistory
                                previousSearches={this.state.previousSearches}
                                onLoadSearchHistoryItem={this.loadSearchHistoryItem}
                            />
                        ) : (
                            <SearchResult
                                messages={this.state.filteredMessages}
                            />
                        )
                    }
                </div>
	        </div>
        )
    }
}

export default Search
