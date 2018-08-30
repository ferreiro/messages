import React, { Component } from 'react'
import { CellMeasurer, CellMeasurerCache, } from 'react-virtualized'
import PropTypes from 'prop-types'

import Card from './Card'

// In this example, average cell width is assumed to be about 100px.
// This value will be used for the initial `Grid` layout.
// Cell measurements smaller than 75px should also be rounded up.
// Height is not dynamic.
const cache = new CellMeasurerCache({
  defaultWidth: 100,
  minWidth: 75,
  fixedHeight: false,
})

class ListEfficient extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onRemoveMessage: PropTypes.func.isCompactMode,
        onFavoriteMessage: PropTypes.func.isCompactMode,
    }

	state = {
		height: 500,
		rowHeight: 150,
		isLoading: false,
		nextPageToken: null,
	}

	componentDidMount () {
		this.updateViewportWidth()

		window.addEventListener('resize', this.handleResize)

		// Readjust width
		setTimeout(() => this.updateViewportWidth(), 100)
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize)
	}

	getViewportWidth = () => {
		const wrapper = document.getElementsByClassName('container__wrapper')
		return !wrapper || wrapper.length === 0
			? window.outerWidth
			: wrapper[0].offsetWidth
	}

	updateViewportWidth = () =>
		this.setState({ width: this.getViewportWidth() })

	handleResize = () =>
		this.updateViewportWidth()

	rowRenderer = ({
	  index,       // Index of row
	  key,         // Unique key within array of rendered rows
	  style,       // Style object to be applied to row (to position it);
	               // This must be passed through to the rendered row element.
	  isScrolling, // The List is currently being scrolled
	  isVisible,   // This row is visible within the List (eg it is not an overscanned row)
	  parent,      // Reference to the parent List (instance)
	}) => {
		const { messages, onRemoveMessage, onFavoriteMessage } = this.props

		if (!messages || messages.length === 0 || index >= messages.length) {
			return (<div></div>)
		}

		const message = messages[index]
		return (
		    <CellMeasurer
				key={key}
				parent={parent}
				rowIndex={index}
				columnIndex={index}
				cache={cache}
		    >
				{({ height, width }) => (
					<div>
				      	<Card
							key={key}
							index={index}
							height={height}
							message={message}
							style={style}
							onFavoriteMessage={onFavoriteMessage}
							onRemoveMessage={onRemoveMessage}
						/>
					</div>
				)}
			</CellMeasurer>
		)
	}

	render () {
		const { messages, noItemsComponent, onRemoveMessage, onFavoriteMessage } = this.props
	    const rowCount = messages.length

		return (
			<div style={{width: '100%'}}>
		      	{rowCount === 0 && (
		      		noItemsComponent
	      		)}

	      		{messages.map(message => (
			      	<Card
						key={message.id}
						height={this.state.rowHeight}
						message={message}
						onFavoriteMessage={onFavoriteMessage}
						onRemoveMessage={onRemoveMessage}
					/>
      			))}
			</div>
		)
	}
}

export default ListEfficient
