import React, { Component } from 'react'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, } from 'react-virtualized'
import PropTypes from 'prop-types'

import * as MessagesApi from '../libs/MessagesApi'

import Card from './Card'
import LoaderWithPlaceholders from './LoaderWithPlaceholders'
import LoaderWithButton from './LoaderWithButton'
import PlaceholderCardList from './PlaceholderCardList'

import ScrollUtils from '../libs/ScrollUtils'

// In this example, average cell width is assumed to be about 100px.
// This value will be used for the initial `Grid` layout.
// Cell measurements smaller than 75px should also be rounded up.
// Height is not dynamic.
const cache = new CellMeasurerCache({
  defaultWidth: 100,
  minWidth: 75,
  fixedHeight: false,
})

class InfiniteCardListPerformance extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
    	loadLimit: PropTypes.number.isRequired,
        onAddMessages: PropTypes.func.isCompactMode,
        onRemoveMessage: PropTypes.func.isCompactMode,
        isInfiniteScrollActivated: PropTypes.bool.isRequired,
    }

	state = {
		height: 500,
		rowHeight: 150,
		isLoading: false,
		nextPageToken: null,
	}

    loadMoreElement = React.createRef()

	componentDidMount () {
		this.updateViewportWidth()
		this.fetchItems()

		window.addEventListener('scroll', this.handleScroll)
		window.addEventListener('resize', this.handleResize)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.handleResize);
	}

	updateViewportWidth = () => {
		this.setState({ width: window.outerWidth })
	}

	handleResize = () => {
		this.updateViewportWidth()
	}

	handleScroll = () => {
		this.loadMoreAutomatically()
	}

	loadMoreManually = (event) => {
		event.preventDefault()
		this.fetchItems()
	}

	loadMoreAutomatically = () => {
		// const { loadMoreElement } = this
		const { isInfiniteScrollActivated } = this.props
		const { rowHeight } = this.state
		const loadMoreElement = document.getElementById('moreMessagesTrigger')

		if (!loadMoreElement) {
			// throw new Error('No loadMore node')
			return
		}

		const isVisible =
			ScrollUtils.isElementInViewport({ element: loadMoreElement, offset: 12 * rowHeight })

		if (isVisible && isInfiniteScrollActivated && isInfiniteScrollActivated === true) {
			this.fetchItems()
		}
	}

	fetchItems = () => {
		const { isLoading, nextPageToken } = this.state
		const { loadLimit, onAddMessages } = this.props
		const fetchDataFromApi = () => {
			return MessagesApi.get({
				limit: loadLimit,
				nextPageToken,
			})
		}

		if (isLoading) {
			return; // don't load
		}

		this.setState({ isLoading: true })

		fetchDataFromApi()
			.then(response => {
				const { messages, pageToken, } = response
				onAddMessages(messages, () => {
					this.setState({
						isLoading: false,
						nextPageToken: pageToken
					})
				})
			})
			.catch(err => {
				console.log(err)
				this.setState({ isLoading: false })
			})
	}

	rowRenderer = ({
	  index,       // Index of row
	  key,         // Unique key within array of rendered rows
	  style,       // Style object to be applied to row (to position it);
	               // This must be passed through to the rendered row element.
	  isScrolling, // The List is currently being scrolled
	  isVisible,   // This row is visible within the List (eg it is not an overscanned row)
	  parent,      // Reference to the parent List (instance)
	}) => {
		const { messages, onRemoveMessage, } = this.props

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
				      		autoHeight
							key={key}
							height={height}
							message={message}
							style={style}
							onRemoveMessage={onRemoveMessage}
						/>
					</div>
				)}
			</CellMeasurer>
		)
	}

	render () {
		const { messages, isInfiniteScrollActivated } = this.props
		const { width, } = this.state

	    const {
		      listHeight,
		      overscanRowCount,
		      scrollToIndex,
		      showScrollingPlaceholder,
		      useDynamicRowHeight,

		      rowHeight,
		      isLoading,
		      bestEffortHeight,
	    } = this.state;

	    const rowCount = messages.length
	  	const height = rowHeight * messages.length

		return (
			<div style={{width: '100%'}}>
		      	{messages.length === 0 && (
		      		<PlaceholderCardList count={10} />
	      		)}

			    <List
					width={width}
					height={height}
					rowHeight={rowHeight}
					rowRenderer={this.rowRenderer}
					rowCount={messages.length}
					overscanRowCount={3}
					deferredMeasurementCache={cache}
		      	/>

  				<div id='moreMessagesTrigger' ref={(element) => this.loadMoreElement = element}>
			      	{isInfiniteScrollActivated === true
			      		? (
			      			<LoaderWithPlaceholders
			      				placeholderHeight={130}
			      				count={1}
			      		  	/>
			      		) : (
			      			<LoaderWithButton
			      				placeholderHeight={200}
			      				onLoadMoreManually={this.loadMoreManually}
			      			/>
			      		)
			      	}
			    </div>
			</div>
		)
	}
}

export default InfiniteCardListPerformance

// rowHeight={ useDynamicRowHeight ? this._getRowHeight : listRowHeight }
// 			className={styles.List}
// 			overscanRowCount={overscanRowCount}
// 			noRowsRenderer={this._noRowsRenderer}
