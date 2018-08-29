import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hammer from 'react-hammerjs'

class PlaceholderCard extends Component {
	static propTypes = {
		height: PropTypes.string,
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

	render () {
		const { message, height } = this.props
		const { positionX, opacity, isHidden, extraCardClassNames } = this.state
		const { handleSwipe, handlePan } = this

		const cardClassNames = 'card ' + extraCardClassNames

		return (
			<div
				className={'card__wrapper ' + (isHidden ? 'hide' : '')}
			>
				<div
					className={'card'}
					style={{
						opacity,
						position: 'relative',
						transform: `translateX(${positionX}px) translateY(0)`,
						height: (height === 'auto' ? 'auto' : height + 'px')
					}}
				>
					<div className='flex card__header'>
						<div className="card__avatar flexbox">
							<div className='animated__background'></div>
						</div>
						<div className='flexbox__elastic card__header__group'>
							<div className='placeholder__line' style={{width: '150px'}}>
								<div className='animated__background'></div>
							</div>
							<span className='line'></span>
							<div className='placeholder__line' style={{width: '110px'}}>
								<div className='animated__background'></div>
							</div>
						</div>
					</div>
					<div className='card__message'>
						<div className='placeholder__message'>
							<div className='animated__background'></div>
						</div>
						<div className='placeholder__message'>
							<div className='animated__background'></div>
						</div>
						<div className='placeholder__message'>
							<div className='animated__background'></div>
						</div>
					</div>
				</div>
			</div>
		)
 	}
}

export default PlaceholderCard