import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { slide as MenuSlide } from 'react-burger-menu'

class Menu extends Component {
	static propTypes = {
		onUpdateMenuState: PropTypes.func.isRequired,
		type: PropTypes.string.isRequired,
		linkUrl: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		extraAction: PropTypes.func.isRequired,
	}

	handleStateChange = (state) => {
		this.props.onUpdateMenuState(state.isOpen)
	}

	handleClickOnItem = (node) => {
		console.log('handleClickOnItem')
	  	this.props.onUpdateMenuState(false)
	}

	render () {
		const { linkUrl, icon, label, handleClick, } = this.props

		return (
			<Link to={linkUrl} onClick={handleClick}>
				<div className='flex'>
					<div className='flexbox'>
						<span className={'icon ' + icon}></span>
					</div>
					<div className='flexbox'>
						{label}
					</div>
				</div>
			</Link>
		)
 	}
}

export default Menu