import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import MenuItem from './MenuItem'
import { slide as MenuSlide } from 'react-burger-menu'

class Menu extends Component {
	static propTypes = {
		onUpdateMenuState: PropTypes.func.isRequired,
	}

	options = [
		{
			type: 'parent',
			element: (<span></span>),
			children: [
				{
					type: 'child',
					linkUrl: '/',
					label: 'Messages',
					icon: 'favorite',
					extraAction: () => {}
				},
				{
					type: 'child',
					linkUrl: '/favorite',
					label: 'Favorite',
					icon: 'favorite',
					extraAction: () => {}
				},
				{
					type: 'child',
					linkUrl: '/settings',
					label: 'Settings',
					icon: 'settings',
					extraAction: () => {}
				}
			]
		}
	]

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
		const { isOpen, user } = this.props
		const { name, bio, website, avatar } = user

		return (
			<MenuSlide
				width={ 280 }
				isOpen={ isOpen }
				onStateChange={ this.handleStateChange }
			>
				<div>
					<div style={{
						width: 80,
						height: 80,
						backgroundSize: 'cover', 
						backgroundImage: `url(${avatar})`
					}}></div>
					<span>{name}</span>
					<span>{website}</span>
				</div>

				{this.options.map(option => (
					<div className='list'>
						{option.element}
						{option.children.map(child => (
							<MenuItem
								linkUrl={child.linkUrl}
								label={child.label}
								icon={child.icon}
								handleClick={(event) => {
								  	this.props.onUpdateMenuState(false)
								}}
							/>
						))}
					</div>
				))}
			</MenuSlide>
		)
 	}
}

export default Menu