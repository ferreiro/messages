import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InfiniteCardListPerformance from '../components/InfiniteCardListPerformance'
import Header from '../components/Header'

class Favorite extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onOpenMenu: PropTypes.func.isRequired,
        onAddMessages: PropTypes.func.isRequired,
        onRemoveMessage: PropTypes.func.isRequired,
        isInfiniteScrollActivated: PropTypes.bool.isRequired,
    }

    render () {
        const {
        	messages,
            onOpenMenu,
        	onAddMessages,
            onRemoveMessage,
            isInfiniteScrollActivated
        } = this.props

        return (
        	<div className='Page'>
	            <Header
                    title='Favorite messages'
                    onOpenMenu={onOpenMenu}
                />

		        <div className='container'>
		        	<div className='container__wrapper'>
                        <InfiniteCardListPerformance
                            loadLimit={20}
                            messages={messages}
                            isInfiniteScrollActivated={isInfiniteScrollActivated}
                            onAddMessages={onAddMessages}
                            onRemoveMessage={onRemoveMessage}
                        />
		          	</div>
		        </div>
	        </div>
        )
    }
}

export default Favorite
