import React from 'react'

function SearchNotFound (props) {
	return (
		<div className="search__notFound">
			<div className="search__notFound__wrapper">
				<div className="search__notFound__icon">
					<span className="icon icon-search"></span>
				</div>
				<div className="search__notFound__text">Not found</div>
			</div>
		</div>
	)
}

export default SearchNotFound