import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import ListEfficient from '../components/ListEfficient'
import Header from '../components/Header'

class Favorite extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onOpenMenu: PropTypes.func.isRequired,
        onRemoveMessage: PropTypes.func.isRequired,
        onFavoriteMessage: PropTypes.func.isRequired,
    }

    render () {
        const {
        	messages,
            onOpenMenu,
            onRemoveMessage,
            onFavoriteMessage,
        } = this.props

        return (
        	<div className='Page'>
	            <Header
                    title='Favorite messages'
                    onOpenMenu={onOpenMenu}
                />

		        <div className='container'>
		        	<div className='container__wrapper'>
                        <ListEfficient
                            messages={messages}
                            onRemoveMessage={onRemoveMessage}
                            onFavoriteMessage={onFavoriteMessage}
                            noItemsComponent={(
                                <div className="notFound">
                                    <div className="notFound__wrapper">
                                        <div className="notFound__icon">
                                            <span className="icon icon-star_border"></span>
                                        </div>
                                        <div className="notFound__text">No favorites yet!</div>
                                        <Link
                                            to='/'
                                            className="notFound__button"
                                        >Star now!</Link>
                                    </div>
                                </div>
                            )}
                        />
		          	</div>
		        </div>
	        </div>
        )
    }
}

export default Favorite
