import React from 'react'
import PropTypes from 'prop-types'

function CardActionBar (props) {
	const { actions } = props

	return (
		<ul className="card__options flex">
			{actions.map((action, index) => {
				const { isSelected } = action
				return (
					<li
						key={index}
						onClick={action.executeAction}
						className={'card__options__item flexbox ' + (isSelected === true ? 'card__options__item__selected' : '')}
					>
						<div className='flex'>
							<div className='card__options__icon flexbox'>
								<span className={'icon ' + action.icon}></span>
							</div>
						</div>
					</li>
				)
			})}
		</ul>
	)
}

// <div className='card__options__text flexbox__elastic'>{action.label}</div>

CardActionBar.propTypes = {
	actions: PropTypes.array.isRequired
}

export default CardActionBar