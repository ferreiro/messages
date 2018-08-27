import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import CardAvatar from './CardAvatar'
import CardAuthor from './CardAuthor'
import CardDate from './CardDate'

const RIGHT = 'RIGHT'
const LEFT = 'LEFT'

class TobstoneCard extends Component {
	static propTypes = {
		height: PropTypes.string.isRequired,
	}

	state = {
		height: 'auto',
		isHidden: false,
		opacity: 1,
		positionX: 0,
		extraCardClassNames: ''
	}

	componentDidMount () {
		this.resize()
	}

	resize = () => {
		const { id } = this.props
		const node = document.getElementById(id)
		node && this.updateHeight(node.offsetHeight)
	}

	updateHeight = (height) => {
		this.setState({ height })
	}

	onRemoveCard = (event) => {
		event.preventDefault()
		this.removeCard()
	}

	removeCard = () => {
		const { message, onRemoveMessage } = this.props
		const removeCard = () => {
			setTimeout(() => onRemoveMessage(message), 2000)
		}
		this.setState({ isHidden: true, height: 0 }, removeCard)
	}

	render () {
		const { message } = this.props
		const { positionX, height, opacity, isHidden, extraCardClassNames } = this.state
		const { handleSwipe, handlePan } = this

		const cardClassNames = 'card ' + extraCardClassNames

		return (
			<div
				className={'card__wrapper ' + (isHidden ? 'hide' : '')}
				style={{ height }}
			>
				<div
					className={'card'}
					style={{
						position: 'relative',
						'transform': `translateX(${positionX}px) translateY(0)`,
						opacity
					}}
				>
					<div className='flex card__header'>
						<CardAvatar />
						<div className='flexbox__elastic card__header__group'>
							<div className='placeholder__line' style={{width: '150px'}}></div>
							<span className='line'></span>
							<div className='placeholder__line' style={{width: '110px'}}></div>
						</div>
					</div>
					<div className='card__message'>
						<div className='placeholder__message'></div>
						<div className='placeholder__message'></div>
						<div className='placeholder__message'></div>
					</div>
				</div>
			</div>
		)
 	}
}

export default TobstoneCard