import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class Header extends Component {
  static propTypes = {
    isCompactMode: PropTypes.bool.isRequired,
    deactivateCompactMode: PropTypes.func.isRequired,
    activateCompactMode: PropTypes.func.isRequired,
  }

  deactivateCompact () {
    this.props.deactivateCompactMode()
  }

  activateCompact () {
    this.props.activateCompactMode()
  }

  render () {
    const { isCompactMode } = this.props
  	return (
          <header className="header">
            <div className="header__wrapper">

              <div className="header__burger">
                <span className="icon icon-dehaze"></span>
              </div>

              <div className="header__logo">
                Messages
              </div>

              <ul className="header__options" style={{float: 'right'}}>

                <li className="header__item">
                  {isCompactMode
                      ? (
                        <button onClick={() => this.deactivateCompact()}>Disable compact</button>
                      ) : (
                        <button onClick={() => this.activateCompact()}>Activate compact</button>
                      ) 
                  }
                </li>

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
