import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SettingsActionItem extends Component {
	propTypes = {
		text: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		isDisabled: PropTypes.bool.isRequired,
		onActionHandler: PropTypes.func.isRequired,
		requiredConfirmation: PropTypes.bool,
	}

	handleClickEvent = (event) => {
		const { onActionHandler } = this.props

		event.preventDefault()
		onActionHandler()
	}

	render () {
		const { text, icon, isDisabled } = this.props

		return (
			<li
	            className={'list__item flex ' + (isDisabled ? 'disabled' : '')}
	            style={{position: 'relative'}}
	        >	
	        	<button
	        		onClick={this.handleClickEvent}
	        		style={{width: '100%', height: '100%', background: 'transparent', outline: 0, border: 0, zIndex: 1, position: 'absolute', top: 0, left: 0}}
        		></button>
	            <div className="list__icon flexbox">
	                <span className={'icon ' + icon}></span>
	            </div>
	            <span className="list__text flexbox__elastic">
	            	{text}
            	</span>
	        </li>
		)
	}
}

export default SettingsActionItem

