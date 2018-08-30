import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
				<div className='menu__item flex'>
					<div className='menu__icon flexbox'>
						<span className={'icon ' + icon}></span>
					</div>
					<div className='menu__text flexbox__elastic'>
						{label}
					</div>
				</div>
			</Link>
		)
 	}
}

export default Menu