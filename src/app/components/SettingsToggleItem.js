import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SettingsToggleItem extends Component {
	handleClickEvent = (event) => {
		const { onToggleState } = this.props

		event.preventDefault()
		onToggleState()
	}

	render () {
		const { text, icon, isToggle } = this.props

		return (
			<li
	            className="search__history__item flex"
	            style={{position: 'relative'}}
	        >	
	        	<button
	        		onClick={this.handleClickEvent}
	        		style={{width: '100%', height: '100%', background: 'transparent', outline: 0, border: 0, zIndex: 1, position: 'absolute', top: 0, left: 0}}></button>
	            <div className="search__history__icon flexbox">
	                <span className={'icon ' + icon}></span>
	            </div>
	            <span className="search__history__text flexbox__elastic">
	            	{text}
            	</span>
            	<div className="flexbox">
					<label className="switch">
						<input type="checkbox" checked={isToggle()} />
						<div className="slider round"></div>
					</label>
            	</div>
	        </li>
		)
	}
}

SettingsToggleItem.propTypes = {
	text: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	isToggle: PropTypes.func.isRequired,
	onToggleState: PropTypes.func.isRequired,
}

export default SettingsToggleItem

