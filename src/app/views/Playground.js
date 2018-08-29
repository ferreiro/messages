import React, { Component } from 'react'
import { List } from 'react-virtualized'
import loremIpsum from 'lorem-ipsum'
import Header from '../components/Header'

const rowCount = 1000
const listHeight = 600
const rowHeight = 50
const rowWidth = 800

class Playground extends Component {
	constructor () {
		super()
	}
	/*

	  renderRow({ index, key, style }) {
	  	const { messages } = this.props
	    return (
	      <div key={key} style={style} className="row">
	        <div className="image">
	          <img src={messages[index].image} alt="" />
	        </div>
	        <div className="content">
	          <div>{messages[index].name}</div>
	          <div>{messages[index].text}</div>
	        </div>
	      </div>
	    );
	  }
 	*/

	render () {
		return (<div></div>)
		/*
		const { messages } = this.props

		const rowWidth = 300
		const rowHeight = 200
		const listHeight = rowHeight * messages.length

		return (
			<div>
	            <Header
	                title='Playground'
	                displaySearch={false}
	            />
				<div className='container'>
					<div className='container__wrapper'>
			          <List
			            width={rowWidth}
			            height={listHeight}
			            rowHeight={rowHeight}
			            rowRenderer={this.renderRow}
			            rowCount={messages.length}
			            overscanRowCount={3}
	            	/>
					</div>
				</div>
			</div>
		)
		*/
	}
}

export default Playground