import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  goBack = () => {
    this.props.goBack()
  }

  render () {
    const {
      title = '',
      displayGoBack = false,
      displaySearch = true,
    } = this.props

  	return (
          <header className="header">
            <div className="header__wrapper">

              {displayGoBack
                ? (
                  <div
                    className="header__burger"
                    onClick={this.goBack}
                  >
                    <span className="icon icon-arrow_back"></span>
                  </div>
                ) : (
                  <Link to='/settings'>
                    <div className="header__burger">
                      <span className="icon icon-dehaze"></span>
                    </div>
                  </Link>
                )}

              <div className="header__logo">
                {title}
              </div>

              <ul className="header__options" style={{float: 'right'}}>
                {displaySearch && (
                  <Link to='/search'>
                    <li className="header__item">
                      <span className="header__searchIcon icon icon-search"></span>
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </header>
  	) 
  }
}

export default Header
