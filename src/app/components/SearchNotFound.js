import React from 'react'

function SearchNotFound (props) {
	return (
		<div className="notFound">
			<div className="notFound__wrapper">
				<div className="notFound__icon">
					<span className="icon icon-search"></span>
				</div>
				<div className="notFound__text">No results</div>
			</div>
		</div>
	)
}

export default SearchNotFound