import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PlaceholderCard extends Component {
	static propTypes = {
		height: PropTypes.string,
	}

	state = {
		height: 'auto',
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
		const { height } = this.props

		return (
			<div
				className={'card__wrapper '}
			>
				<div
					className={'card'}
					style={{
						position: 'relative',
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