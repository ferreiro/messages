import React, { Component } from "react";
import PropTypes from 'prop-types'

import CardList from '../components/CardList'
import Header from '../components/Header'

class Configure extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onAddMessage: PropTypes.func.isCompactMode,
        onRemoveMessage: PropTypes.func.isCompactMode,
        isCompactMode: PropTypes.bool.isCompactMode,
        activateCompactMode: PropTypes.func.isRequired,
        deactivateCompactMode: PropTypes.func.isRequired,
    }

    render() {
        const {
        	messages,
        	onAddMessage,
            onRemoveMessage,
        	activateCompactMode,
        	deactivateCompactMode,
        	isCompactMode,
        } = this.props

        return (
        	<div className="Page">
	            <Header />

		        <div className="container">
		        	<div className="container__wrapper">
		          		<CardList
                            messages={[]}
                        />
		          	</div>
		        </div>
	        </div>
        )
    }
}

export default Configure
