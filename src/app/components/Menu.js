import React, { Component } from 'react'
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
					icon: 'icon-message',
					extraAction: () => {}
				},
				{
					type: 'child',
					linkUrl: '/favorite',
					label: 'Favorite',
					icon: 'icon-star_border',
					extraAction: () => {}
				},
				{
					type: 'child',
					linkUrl: '/settings',
					label: 'Settings',
					icon: 'icon-settings',
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
				<div className='userHeroe'>
					<div className='userHeroe__pic' style={{
						width: 50,
						height: 50,
						backgroundImage: `url(${avatar})`
					}}></div>
					<div className='userHeroe__name'>{name}</div>
					<div className='userHeroe__bio'>{bio}</div>
					<a
						target='_blank'
						rel='noopener noreferrer'
						href='https://www.ferreiro.me/'
						className='userHeroe__website'
					>{website}</a>
				</div>

				{this.options.map(option => (
					<div className='menu'>
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