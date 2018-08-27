import React, { Component } from 'react'
import PropTypes from 'prop-types'

import CardList from '../components/CardList'
import Header from '../components/Header'

class Home extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onAddMessage: PropTypes.func.isCompactMode,
        onRemoveMessage: PropTypes.func.isCompactMode,
    }

    render() {
        const {
        	messages,
        	onAddMessage,
            onRemoveMessage,
        } = this.props

        return (
        	<div className='Page'>
	            <Header title='Messages' />

		        <div className='container'>
		        	<div className='container__wrapper'>
		          		<CardList
                            messages={messages}
                            onRemoveMessage={onRemoveMessage}
                        />
		          	</div>
		        </div>
	        </div>
        )
    }
}

export default Home
