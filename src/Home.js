import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import CardList from './components/CardList'
import Header from './components/common/Header'


class Home extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onAddMessage: PropTypes.func.isCompactMode,
        isCompactMode: PropTypes.func.isCompactMode,
        activateCompactMode: PropTypes.func.isRequired,
        deactivateCompactMode: PropTypes.bool.isRequired,
    }

    render() {
        const {
        	messages,
        	onAddMessage,
        	activateCompactMode,
        	deactivateCompactMode,
        	isCompactMode,
        } = this.props

        return (
        	<div className="Page">
	            <Header
					activateCompactMode={activateCompactMode}
					deactivateCompactMode={deactivateCompactMode}
					isCompactMode={isCompactMode}
              	/>

		        <div className="container">
		        	<div className="container__wrapper">
		          		<CardList messages={messages} />
		          	</div>
		        </div>
	        </div>
        )
    }
}

export default Home
