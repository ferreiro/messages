import React, { Component } from 'react'
import loremIpsum from 'lorem-ipsum'
import Header from '../components/Header'

const rowCount = 1000
const listHeight = 600
const rowHeight = 50
const rowWidth = 800

class Playground extends Component {
	state = {}

	render () {
		return (
			<div>
	            <Header
	                title='Playground'
	                displaySearch={false}
	            />
				<div className='container'>
					<div className='container__wrapper'>
					</div>
				</div>
			</div>
		)
	}
}

export default Playground