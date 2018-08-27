import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import CardAvatar from './CardAvatar'
import CardAuthor from './CardAuthor'
import CardDate from './CardDate'

const RIGHT = 'RIGHT'
const LEFT = 'LEFT'

class Card extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		message: PropTypes.object.isRequired,
		onRemoveMessage: PropTypes.func.isCompactMode,
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
		this.updateHeight(node.offsetHeight)
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
			setTimeout(() => onRemoveMessage(message), 1000)
		}
		this.setState({ isHidden: true, height: 0 }, removeCard)
	}

	swipe = ({ opacity, positionX, className }, callback = () => {}) => {
		this.setState((prevState, props) => ({
			opacity,
			positionX,
			extraCardClassNames: className
		}), () => {
			callback
		})
	}

	swipeToEnd = ({ direction, width }) => {
		this.swipe({
			opacity: 0,
			positionX: direction === RIGHT ? width : -width,
			className: 'hiding'
		}, this.removeCard())
	}

	swipeToBeginning = () => {
		this.swipe({
			opacity: 1,
			positionX: 0,
			className: 'restart'
		})
	}

	handlePan = (event) => {
		const { deltaX, isFinal, velocityX } = event
		const { outerWidth } = window
		const { positionX } = this.state

		const swipedPercentage = Math.abs(positionX / outerWidth)

		if (isFinal) {
			const hasSwipedReachedThreshold = swipedPercentage >= 0.4
			const swipeDirection = positionX > 0 ? RIGHT : LEFT

			hasSwipedReachedThreshold === true
				? this.swipeToEnd({ width: outerWidth, direction: swipeDirection })
				: this.swipeToBeginning()
		} else {
			const opacity = 1 - swipedPercentage
			this.swipe({ opacity, positionX: deltaX, className: 'moving' })
		}
	}

	handleSwipe = (event) => {
		const { distance, velocity } = event
		const { outerWidth } = window

		if (Math.abs(velocity) > 1) {
			const direction = velocity > 0 ? RIGHT : LEFT
			this.swipeToEnd({
				direction,
				width: outerWidth
			})
		}
	}

	render () {
		const { message } = this.props
		const { positionX, height, opacity, isHidden, extraCardClassNames } = this.state
		const { handleSwipe, handlePan } = this

		console.log(positionX)
		const cardClassNames = 'card ' + extraCardClassNames

		return (
			<div
				className={'card__wrapper ' + (isHidden ? 'hide' : '')}
				style={{ height }}
			>
				<Hammer
					onSwipe={handleSwipe}
					onPan={handlePan}
					direction='DIRECTION_HORIZONTAL'
				>
					<div
						id={message.id}
						className={cardClassNames}
						style={{
							position: 'relative',
							'-moz-transform': `translateX(${positionX}px) translateY(0)`,
							'-webkit-transform': `translateX(${positionX}px) translateY(0)`,
							'-o-transform': `translateX(${positionX}px) translateY(0)`,
							'-ms-transform': `translateX(${positionX}px) translateY(0)`,
							'transform': `translateX(${positionX}px) translateY(0)`,
							opacity
						}}
					>
						<div className='card__header'>
							<CardAvatar
								avatarUrl={message.avatarUrl}
							/>
							<div className='card__header__group'>
								<CardAuthor
									authorName={message.authorName}
								/>
								<CardDate
									updated={message.updated}
								/>
							</div>
						</div>
						<div className='card__message'>
							{message.content}
						</div>
					</div>
				</Hammer>
			</div>
		)
 	}
}

/*
	Options for the card in the background

	<div
		className="card__background flex"
		style={{ height }}
	>
		<div className="flexbox__elastic">
			<span className="icon icon-archive"></span>
		</div>
		<div className="right flexbox__elastic">
			<span className="icon icon-archive"></span>
		</div>
	</div>
					
*/

export default Card