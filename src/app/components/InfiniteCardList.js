import React, { Component } from 'react'
import { List, CellMeasurer, CellMeasurerCache, } from 'react-virtualized'
import PropTypes from 'prop-types'
import { confirmAlert } from 'react-confirm-alert'
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

class InfiniteCardList extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
    	loadLimit: PropTypes.number.isRequired,
        onAddMessages: PropTypes.func.isRequired,
        onRemoveMessage: PropTypes.func.isRequired,
        onFavoriteMessage: PropTypes.func.isRequired,
        isInfiniteScrollActivated: PropTypes.bool.isRequired,
    }

	state = {
		width: 'auto',
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

		// Readjust width
		setTimeout(() => this.updateViewportWidth(), 100)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
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

	handleScroll = () =>
		this.loadMoreAutomatically()

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
			return // don't load
		}

		console.log(fetchDataFromApi)

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
				const alertNodes = document.getElementsByClassName('react-confirm-alert')
				if (alertNodes.length === 0) {
					confirmAlert({
						title: 'Error loading the data',
						message: 'Hi! We had an error while processing your request and we\'ll'
								+ 'try in a few seconds again. If the error persist, please'
								+ ' reach out to me: jorge@ferreiro.me'
								+ err,
						buttons: [
						    {
						      label: 'Retry, thanks!',
						      onClick: () => console.log('closed')
						    },
						]
					})
				}

				setTimeout(() => {
					this.setState({ isLoading: false })	
				}, 72000)
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
		const { messages, onRemoveMessage, onFavoriteMessage, } = this.props

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
							index={index}
							height={height}
							message={message}
							style={style}
							onRemoveMessage={onRemoveMessage}
							onFavoriteMessage={onFavoriteMessage}
						/>
					</div>
				)}
			</CellMeasurer>
		)
	}

	render () {
		const { messages, isInfiniteScrollActivated } = this.props
		const { width, rowHeight } = this.state

	    const rowCount = messages.length
	  	const height = rowHeight * rowCount

	  	if (messages !== undefined && rowCount < 5) {
	  		this.fetchItems()	
	  	}

		return (
			<div style={{width: '100%'}}>
		      	{rowCount === 0 && (
		      		<PlaceholderCardList count={10} />
	      		)}

			    <List
					width={width}
					height={height}
					rowHeight={rowHeight}
					rowRenderer={this.rowRenderer}
					rowCount={rowCount}
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

export default InfiniteCardList
