import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import './App.css';

import CardList from './components/CardList'
import * as MessagesApi from './libs/MessagesApi'

const COMPACT_MODE_CLASSNAME = 'compact'

class App extends Component {
  state = {
    messages: [],
    nextPageToken: null,
    compactMode: false 
  }

  componentDidMount() {
      this.isCompactModeActivated() && (
        this.activateCompactMode()
      )

      this.loadInitialMessages()
  }

  isCompactModeActivated () {
    return this.state.compactMode
  }

  loadInitialMessages () {
      MessagesApi.get()
          .then(response => {
            const { count, pageToken, messages } = response

            messages.forEach(message => {
              this.addMessage(MessagesApi.toInternalMessage(message))
            })

            this.updateNextPageToken(pageToken)
          })
          .catch(err => console.log(err))
  }

  addMessage (message) {
    this.setState((prevState, props) => ({
      messages: [ ...prevState.messages, message ]
    }))
  }

  updateNextPageToken (newToken) {
    this.setState({
      nextPageToken: newToken
    })
  }

  activateCompactMode () {
    this.setState({
      compactMode: true
    })

    const body = document.getElementsByTagName('body')[0]
    body.classList.add(COMPACT_MODE_CLASSNAME)
  }

  deactivateCompactMode () {
    this.setState({
      compactMode: false
    })
    
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove(COMPACT_MODE_CLASSNAME)
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Turbo Todo</title>
          <meta name="description" content="Todos on steroid!" />
          <meta name="theme-color" content="#522e92" />

          <meta charset="UTF-8" />
          <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        </Helmet>

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
                {this.isCompactModeActivated()
                    ? (
                      <button onClick={() => this.deactivateCompactMode()}>Disable compact</button>
                    ) : (
                      <button onClick={() => this.activateCompactMode()}>Activate compact</button>
                    ) 
                }
              </li>

              <li className="header__item">
                <span className="header__search icon icon-search"></span>
              </li>

            </ul>

          </div>
        </header>

        <div className="container">
          <CardList messages={this.state.messages} />
        </div>

      </div>
    );
  }
}

export default App;
