import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import HistoryQuery from './types/HistoryQuery'

import Header from './components/common/Header'
import SearchHistory from './components/SearchHistory'
import CardList from './components/CardList'

class Search extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
    }

    state = {
        query: '',
        searchedMessages: [],
        previousSearches: [
            new HistoryQuery({ query: 'William', date: new Date() }),
            new HistoryQuery({ query: 'Paul', date: new Date() }),
            new HistoryQuery({ query: 'Maria Shar', date: new Date() }),
            new HistoryQuery({ query: 'Reinaldo Maldonado', date: new Date() }),
            new HistoryQuery({ query: 'Ben Suarez', date: new Date() }),
            new HistoryQuery({ query: 'Pablo Marcos', date: new Date() }),
        ]
    }

    componentDidMount () {
        // getCachedPreviousSearchess
    }

    changeQuery = (newQuery) => {
        this.setState({ query: newQuery })
    }

    handleChange = (event) => {
        const query = event.target.value
        this.changeQuery(query)

        if (query.length === 0) {
            this.clearSearchResult()
        } else {
            this.getSearchResult(query)
        }
    }

    clearSearchResult = () => {
        this.setState({
            searchedMessages: []
        })
    }

    getSearchResult = (query) => {
        const { messages } = this.props
        const normalizedQuery = query.toLowerCase().trim()

        this.setState({
            searchedMessages: messages.filter(message => {
                return message.content.toLowerCase().includes(normalizedQuery)
                        || message.authorName.toLowerCase().includes(normalizedQuery)
            })
        })
    }

    loadHistoryQuery = (historyQuery) => {
        this.setState({
            query: historyQuery.trim()
        })
    }

    render() {
        return (
        	<div className="Page">

                <header className="header flex" style={{ backgroundColor: '#fff' }}>
                    <div className="flexbox">
                        <div className="header__burger" style={{height: '100%'}}>
                            <Link to='/'>
                                <span
                                    className="icon icon-arrow_back"
                                    style={{
                                        color: '#000'
                                    }}
                                >
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="header__search flexbox__elastic">
                        <input
                            type="text"
                            value={this.state.query}
                            placeholder="Search message"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="flexbox">
                        <div className="header__burger" style={{height: '100%'}}>
                            <span
                                className="icon icon-close"
                                style={{
                                    color: '#000'
                                }}
                            >
                            </span>
                        </div>
                    </div>
                </header>

                {this.state.searchedMessages.length === 0
                    ? (
                        <div className="container">
                            {this.state.query.length === 0
                                ? (
                                    <SearchHistory
                                        previousSearches={this.state.previousSearches}
                                        onChangeQuery={this.changeQuery}
                                    />
                                ) : (
                                    <div>
                                        no results!
                                    </div>
                                )
                            }
                        </div>
                    ) : (
                        <div className="container">
                            <div className="search__title flex">
                                <span className="flexbox__elastic">Results</span>
                                <span className="flexbox">{this.state.searchedMessages.length}</span>
                            </div>
                            <div className="container__wrapper">
                                <div className="searchResults">
                                    <CardList messages={this.state.searchedMessages} />
                                </div>
                            </div>
                        </div>
                    )
                }
	        </div>
        )
    }
}

// <Searchheader> <SearchResults messages={} query={}>

export default Search
