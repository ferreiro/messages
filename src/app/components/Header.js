import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class Header extends Component {
  static propTypes = {}

  render () {
    const { isCompactMode } = this.props
  	return (
          <header className="header">
            <div className="header__wrapper">

              <Link to='/configure'>
                <div className="header__burger">
                  <span className="icon icon-dehaze"></span>
                </div>
              </Link>

              <div className="header__logo">
                Messages
              </div>

              <ul className="header__options" style={{float: 'right'}}>
                <Link to='/search'>
                  <li className="header__item">
                    <span className="header__searchIcon icon icon-search"></span>
                  </li>
                </Link>

              </ul>
            </div>
          </header>
  	) 
  }
}

export default Header
