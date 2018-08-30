import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

import CardActionBar from './CardActionBar'
import CardAvatar from './CardAvatar'
import CardAuthor from './CardAuthor'
import CardDate from './CardDate'

const RIGHT = 'RIGHT'
const LEFT = 'LEFT'

class Card extends Component {
	static propTypes = {
		id: PropTypes.number.isRequired,
		index: PropTypes.number.isRequired,
		height: PropTypes.number,
		message: PropTypes.object.isRequired,
		onRemoveMessage: PropTypes.func.isRequired,
		onFavoriteMessage: PropTypes.func.isRequired,
	}

	state = {
		height: 'auto',
		isHidden: false,
		isFavorite: false,
		opacity: 1,
		positionX: 0,
		extraCardClassNames: ''
	}

	cardNode = new React.createRef()

	componentDidMount () {
		this.setState({ isFavorite: this.props.message.isFavorite })
		// this.resize()
	}

	handleFavoriteMessage = () => {
		const { message, onFavoriteMessage } = this.props
		onFavoriteMessage(message)
		this.setState((prevState, props) => ({ isFavorite: !prevState.isFavorite }))
	}

	handleDeleteMessage = () => {
		this.removeCard()
	}

	resize = () => {
		const { message } = this.props
		const node = document.getElementById(message.id)
		console.log(node)
		if (node && node !== undefined) {
			this.updateHeight(node.offsetHeight)
		}
	}

	updateHeight = (height) => {
		this.setState({ height })
	}

	onRemoveCard = (event) => {
		event.preventDefault()
		this.removeCard()
	}

	removeCard = () => {
		const { onRemoveMessage, message } = this.props

		const node = document.getElementById(message.id)
		if (node && node !== undefined) {
			this.updateHeight(node.offsetHeight)
		}

		setTimeout(() => {
			this.setState({ isHidden: true, height: 0 })
			onRemoveMessage(message)
		}, 0)
	}

	swipe = ({ opacity, positionX, className }, callback = () => {}) => {
		this.setState((prevState, props) => ({
			opacity,
			positionX,
			extraCardClassNames: className
		}), () => {
			callback()
		})
	}

	swipeToEnd = ({ direction, width }) => {
		this.swipe({
			opacity: 0,
			positionX: direction === RIGHT ? width : -width,
			className: 'hiding'
		}, () => {
			this.removeCard()
		})
	}

	swipeToBeginning = () => {
		this.swipe({
			opacity: 1,
			positionX: 0,
			className: 'restart'
		})
	}

	handlePan = (event) => {
		const { deltaX, isFinal } = event // velocityX
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
		const { velocity } = event // distance, 
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
		const { height, isFavorite, positionX, opacity, isHidden, extraCardClassNames } = this.state
		const { handleSwipe, handlePan } = this

		const cardClassNames = 'card ' + extraCardClassNames

		const favoriteIcon = isFavorite === true
			? 'icon-star'
			: 'icon-star_border'

		return (
			<div
				ref={this.cardNode}
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
							'transform': `translateX(${positionX}px) translateY(0)`,
							opacity
						}}
					>	
						<div className='flex card__header'>
							<CardAvatar
								avatarUrl={message.avatarUrl}
							/>
							<div className='flexbox__elastic card__header__group'>
								<CardAuthor
									authorName={message.authorName}
								/>
								<CardDate
									updated={message.updated}
								/>
							</div>
							<div className='flexbox'>
								<CardActionBar
									actions={[
										{
											type: 'action',
											label: 'Favorite',
											icon: favoriteIcon,
											isSelected: isFavorite,
											executeAction: this.handleFavoriteMessage
										},
									]}
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
{
	type: 'action',
	label: 'Delete',
	icon: 'icon-delete',
	isSelected: false,
	executeAction: this.handleDeleteMessage
}
*/
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