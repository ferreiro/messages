import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onOpenMenu: PropTypes.func,
    displayGoBack: PropTypes.bool,
    displaySearch: PropTypes.bool,
  }

  goBack = () => {
    this.props.goBack()
  }

  handleOpenMenu = (event) => {
    event.preventDefault()
    this.props.onOpenMenu()
  }

  render () {
    const {
      title = '',
      onOpenMenu,
      displayGoBack = false,
      displaySearch = true,
    } = this.props

    if (displayGoBack === false && onOpenMenu === undefined) {
      throw new Error('You should specify a method to open menu')
    }

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
                  <div
                    className="header__burger"
                    onClick={this.handleOpenMenu}
                  >
                    <span className="icon icon-dehaze"></span>
                  </div>
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
