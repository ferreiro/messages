import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { List, AutoSizer, CellMeasurerCache } from 'react-virtualized'
import PropTypes from 'prop-types'

import * as MessagesApi from '../libs/MessagesApi'

import Card from './Card'
import PlaceholderCardList from './PlaceholderCardList'
import ScrollUtils from '../libs/ScrollUtils'

class InfiniteCardListPerformance extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
        onAddMessages: PropTypes.func.isCompactMode,
        onRemoveMessage: PropTypes.func.isCompactMode,
        isInfiniteScrollActivated: PropTypes.bool.isRequired,
    }

	state = {
		isLoading: false,
		rowHeight: 187,
		nextPageToken: null
	}

    loadMoreElement = React.createRef()

	componentDidMount () {
		this.loadMore()
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = () => {
		const { loadMoreElement } = this
		const { isInfiniteScrollActivated } = this.props

		if (!loadMoreElement) {
			throw new Error('No loadMore node')
		}

		const isVisible =
			ScrollUtils.isElementInViewport(this.loadMoreElement)

		if (isVisible && isInfiniteScrollActivated && isInfiniteScrollActivated === true) {
			this.loadMore()
		}
	}

	onClickLoadMore = (event) => {
		event.preventDefault()
		this.loadMore()
	}

	loadMore = () => {
		const { isLoading } = this.state
		const { isInfiniteScrollActivated, onAddMessages } = this.props

		console.log(this.props)
		console.log(isLoading, isInfiniteScrollActivated, isInfiniteScrollActivated===false)

		if (isLoading) {
			return; // don't load
		}

		this.setState({ isLoading: true })
		this.fetchData()
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

	fetchData = () => {
		const { nextPageToken, limit } = this.state

		return MessagesApi.get({
			limit,
			nextPageToken,
		})
	}


	renderRow = ({ index, key, isScrolling, isVisible }) => {
		const { messages } = this.props

		if (!messages || messages.length === 0 || index > messages.length) {
			return (<div>Item not available yet</div>)
		}

		return (<div>Render item</div>)
	}


	constructor(props) {
	    super(props);
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
		const { messages } = this.props

		if (!messages || messages.length === 0 || index >= messages.length) {
			return (<div>borrado</div>)
		}

		const { rowHeight } = this.state
		const message = messages[index]

		return (
			<Card
				key={key}
				height={rowHeight}
				message={message}
			/>
		)
	}

	render () {
		const { messages, isInfiniteScrollActivated } = this.props

	    const {
		      listHeight,
		      overscanRowCount,
		      scrollToIndex,
		      showScrollingPlaceholder,
		      useDynamicRowHeight,

		      rowHeight,
		      isLoading,
	    } = this.state;

	    const rowCount = messages.length

	    const width = window.outerWidth
	    const height = rowHeight * messages.length

	    const loadMoreWithPlaceHoldersAndTrigger = (
	      	<div
				id='loadMore'
				className='loadMoreTrigger'
				ref={(element) => this.loadMoreElement = element}
			>
				<PlaceholderCardList
					count={1}
					placeholderHeight={130}
				/>
			</div>
	    )

	    const loadMoreWithButton = (
  			<div
  				className='loadMore'
  				ref={(element) => this.loadMoreElement = element}
				>
					{isLoading && (
						<div style={{marginBottom: '30px'}}>
							<PlaceholderCardList
								count={1}
								placeholderHeight={130}
							/>
						</div>
					)}

      			<button
      				className='loadMore__button'
      				onClick={this.onClickLoadMore}
  				>
      				Load more
      			</button>
  			</div>
      	)

		return (
			<div>
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
		      	/>

		      	{isInfiniteScrollActivated === true
		      		? loadMoreWithPlaceHoldersAndTrigger
		      		: loadMoreWithButton
		      	}
			</div>
		)
	}
}

export default InfiniteCardListPerformance

// rowHeight={ useDynamicRowHeight ? this._getRowHeight : listRowHeight }
// 			className={styles.List}
// 			overscanRowCount={overscanRowCount}
// 			noRowsRenderer={this._noRowsRenderer}
