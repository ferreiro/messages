import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { slide as MenuSlide } from 'react-burger-menu'

class Menu extends Component {
	static propTypes = {
		onUpdateMenuState: PropTypes.func.isRequired,
	}

	componentDidMount () {
		
	}

	handleStateChange = (state) => {
		this.props.onUpdateMenuState(state.isOpen)
	}

	handleClickOnItem = (node) => {
		console.log('handleClickOnItem')
	  	this.props.onUpdateMenuState(false)
	}

	render () {
		const { isOpen } = this.props

		return (
			<MenuSlide
				width={ 280 }
				isOpen={ isOpen }
				onStateChange={ this.handleStateChange }
			>	
				<Link to='/' onClick={this.handleClickOnItem}>Messages</Link>
				<Link to='/' onClick={this.handleClickOnItem}>Favorite</Link>
				<Link to='/settings' onClick={this.handleClickOnItem}>Settings</Link>
			</MenuSlide>
		)
 	}
}

export default Menu