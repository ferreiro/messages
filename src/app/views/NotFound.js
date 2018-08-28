import React, { Component } from "react"
import PropTypes from 'prop-types'

import Header from '../components/Header'

class NotFound extends Component {
    static propTypes = {}

    render() {
        const {} = this.props
        return (
        	<div className="Page">
                <Header
                    title='Not found'
                    displaySearch={false}
                />
		        <div className="container">
		        	<div className="container__wrapper">
		          		<center>Not found :(</center>
		          	</div>
		        </div>
	        </div>
        )
    }
}

export default NotFound
