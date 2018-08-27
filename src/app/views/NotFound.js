import React, { Component } from "react";
import PropTypes from 'prop-types'

import CardList from '../components/CardList'
import Header from '../components/Header'

class NotFound extends Component {
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
	            <Header
					activateCompactMode={activateCompactMode}
					deactivateCompactMode={deactivateCompactMode}
					isCompactMode={isCompactMode}
              	/>

		        <div className="container">
		        	<div className="container__wrapper">
		          		Not found :(
		          	</div>
		        </div>
	        </div>
        )
    }
}

export default NotFound
