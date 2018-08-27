import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchHeader extends Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    onClearSearch: PropTypes.func.isRequired,
    onChangeQuery: PropTypes.func.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
  }

  render () {
    const { query, onClearSearch, onChangeQuery, onSubmitHandler } = this.props
  	return (
      <header className="header flex" style={{ backgroundColor: '#fff' }}>
          <div className="flexbox">
              <div className="header__burger" style={{height: '100%'}}>
                  <Link to='/'>
                      <span
                          className="icon icon-arrow_back"
                          style={{
                              color: '#000'
                          }}
                      >
                      </span>
                  </Link>
              </div>
          </div>

          <form
              onSubmit={onSubmitHandler}
              className="header__search flexbox__elastic"
          >
              <input
                  type="text"
                  value={query}
                  placeholder="Search message"
                  onChange={onChangeQuery}
                  id="searchQueryInput"
                  autoComplete="off"
              />
          </form>

          <div className="flexbox">
              <div
                  className="header__burger"
                  style={{height: '100%'}}
              >
                  <span
                      className="icon icon-close"
                      style={{
                          color: '#000'
                      }}
                      onClick={onClearSearch}
                  >
                  </span>
              </div>
          </div>
      </header>
  	) 
  }
}

export default SearchHeader
