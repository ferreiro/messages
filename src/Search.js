import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import CardList from './components/CardList'
import Header from './components/common/Header'


class Search extends Component {
    state = {
        query: ''
    }

    static propTypes = {
        messages: PropTypes.array.isRequired,
    }

    getSearchMessages (messages) {
        const { query } = this.state

        const normalizedQuery = query.toLowerCase().trim()

        return messages.filter(message => {
            return message.content.toLowerCase().includes(normalizedQuery)
                    || message.authorName.toLowerCase().includes(normalizedQuery)
        })
    }

    render() {
        const { query } = this.state
        const { messages } = this.props

        return (
        	<div className="Page">

                <header className="header" style={{ 'background-color': '#fff' }}>
                    <div className="header__burger">
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

                    <div className="header__search">
                        <input type="text" placeholder="Search message" />
                    </div>
                </header>

                <div className="searchResults__title">
                    <span>Results</span>
                    <span>20</span>
                </div>

                Welcome to the search!

		        <div className="container">
                    <div className="searchResults">
                        <CardList messages={this.getSearchMessages(messages)} />
                    </div>
		        </div>
	        </div>
        )
    }
}

// <Searchheader> <SearchResults messages={} query={}>

export default Search
