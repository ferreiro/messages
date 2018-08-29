import React, { Component } from "react"

import Header from '../components/Header'

class NotFound extends Component {
    render() {
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
