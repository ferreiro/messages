import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ScrollUtils from '../libs/ScrollUtils'
import * as MessagesApi from '../libs/MessagesApi'

import Card from './Card'
import TobstoneCard from './TobstoneCard'

const random = require("random-js")() 

class InfiniteCardList extends Component {
	static propTypes = {
		messages: PropTypes.array.isRequired,
		onAddMessages: PropTypes.func.isCompactMode,
		onRemoveMessage: PropTypes.func.isCompactMode,
	}

	state = {
		isLoading: false,
		nextPageToken: null,
		limit: 30,
	}

	loadMoreNode = React.createRef()
	loadMoreElement = null

	componentDidMount () {
		window.addEventListener('scroll', this.handleScroll)
		this.loadMoreElement = document.getElementById("loadMore")
		this.loadNextPage()
	}


	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	fetchData = () => {
		const { nextPageToken, limit } = this.state

		return MessagesApi.get({
			limit,
			nextPageToken,
		})
	}

	loadNextPage = () => {
		const { isLoading } = this.state
		const { onAddMessages } = this.props

		if (isLoading) {
			return;
		}

		this.setState({ isLoading: true })
		this.fetchData()
			.then(response => {
				const { messages, pageToken, } = response

				this.setState({ nextPageToken: pageToken })

				onAddMessages(messages, () => {
					this.setState({ isLoading: false })
				})
			})
			.catch(err => {
				console.log(err)
				window.alert(err)
				this.setState({ isLoading: false })
			})
	}

	handleScroll = (event) => {
		const { isLoading } = this.state
		const { offsetTop } = this.loadMoreNode.current

		const isVisible = ScrollUtils.checkVisible(this.loadMoreElement)
		console.log('isVisible', isVisible)
		console.log(isVisible)

		if (isVisible && !isLoading) {
			this.loadNextPage()
		}
	}

	generateRandomId = ({ seed = 0 }) => {
		return parseInt(random.integer(1, 1000000) + seed)
	}

	render () {
		const { messages, onRemoveMessage } = this.props

		return (
			<div className="cardList">
				{messages.map(message => {
					const id = this.generateRandomId({ seed: message.id})
					return (
						<Card
							id={id}
							key={id}
							message={message}
							onRemoveMessage={onRemoveMessage}
						/>
					)
				})}

				<div
					id='loadMore'
					className='loadMoreTrigger'
					ref={this.loadMoreNode}
				></div>

				<TobstoneCard 
					height={'auto'}
				/>
			</div>
		)
	}
}

export default InfiniteCardList