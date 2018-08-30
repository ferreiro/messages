import React, { Component } from 'react'
import PropTypes from 'prop-types'

import InfiniteCardList from '../components/InfiniteCardList'
import Header from '../components/Header'

class Home extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onOpenMenu: PropTypes.func.isRequired,
        onAddMessages: PropTypes.func.isRequired,
        onRemoveMessage: PropTypes.func.isRequired,
        onFavoriteMessage: PropTypes.func.isRequired,
        isInfiniteScrollActivated: PropTypes.bool.isRequired,
    }

    render () {
        const {
        	messages,
            onOpenMenu,
        	onAddMessages,
            onRemoveMessage,
            onFavoriteMessage,
            isInfiniteScrollActivated
        } = this.props

        return (
        	<div className='Page'>
	            <Header
                    title='Messages'
                    onOpenMenu={onOpenMenu}
                />

		        <div className='container'>
		        	<div className='container__wrapper'>
                        <InfiniteCardList
                            loadLimit={20}
                            messages={messages}
                            isInfiniteScrollActivated={isInfiniteScrollActivated}
                            onAddMessages={onAddMessages}
                            onRemoveMessage={onRemoveMessage}
                            onFavoriteMessage={onFavoriteMessage}
                        />
		          	</div>
		        </div>
	        </div>
        )
    }
}


// <InfiniteCardList
//    messages={messages}
//    onRemoveMessage={onRemoveMessage}
//    onAddMessages={onAddMessages}
///>

export default Home
