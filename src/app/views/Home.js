import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InfiniteCardList from '../components/InfiniteCardList'
import Header from '../components/Header'

class Home extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onAddMessages: PropTypes.func.isCompactMode,
        onRemoveMessage: PropTypes.func.isCompactMode,
    }

    render() {
        const {
        	messages,
        	onAddMessages,
            onRemoveMessage,
        } = this.props

        return (
        	<div className='Page'>
	            <Header title='Messages' />

		        <div className='container'>
		        	<div className='container__wrapper'>
		          		<InfiniteCardList
                            messages={messages}
                            onRemoveMessage={onRemoveMessage}
                            onAddMessages={onAddMessages}
                        />
		          	</div>
		        </div>
	        </div>
        )
    }
}

export default Home
