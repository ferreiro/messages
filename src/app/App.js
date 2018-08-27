import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Home from './pages/Home'
import Search from './pages/Search'
import * as MessagesApi from './libs/MessagesApi'
import '../styles/css/index.css';

const COMPACT_MODE_CLASSNAME = 'compact'

class App extends Component {
  state = {
    messages: [],
    nextPageToken: null,
    compactMode: true,
    nightMode: false,
  }

  componentDidMount() {
      this.isCompactModeActivated() && (this.activateCompactMode())
      this.isNightModeActivated() && (this.activateNigthMode())
      this.getMessages()

      /*
      setInterval(() => {
        this.loadInitialMessages()
      }, 2000)
      */
  }

  isCompactModeActivated = () => this.state.compactMode

  isNightModeActivated = () => this.state.nightMode

  getMessages = () => {
      MessagesApi.get({
        limit: 30,
        pakeToken: '303030',
      })
          .then(response => {
            const { count, pageToken, messages } = response

            messages.forEach(message => {
              this.addMessage(MessagesApi.toInternalMessage(message))
            })

            this.updateNextPageToken(pageToken)
          })
          .catch(err => console.log(err))
  }

  addMessage = (message) => {
    this.setState((prevState, props) => ({
      messages: [ ...prevState.messages, message ]
    }))
  }

  removeMessage = (message) => {
    this.setState((prevState, props) => ({
      messages: prevState.messages.filter(m => m.id !== message.id)
    }))
  }

  updateNextPageToken = (newToken) => {
    this.setState({
      nextPageToken: newToken
    })
  }

  activateNigthMode = () => {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add('night')
    this.setState({ nightMode: true })
  }

  deactivateNigthMode = () => {
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('night')
    this.setState({ nightMode: false })
  }

  activateCompactMode = () => {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add(COMPACT_MODE_CLASSNAME)
    this.setState({ compactMode: true })
  }

  deactivateCompactMode = () => {    
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove(COMPACT_MODE_CLASSNAME)
    this.setState({ compactMode: false })
  }

  render() {
    const { messages, compactMode } = this.state

    return (
      <div className="App">
          <Helmet>
            <title>Messages</title>
            <meta name="description" content="Todos on steroid!" />
            <meta name="theme-color" content="#522e92" />

            <meta charset="UTF-8" />
            <meta name="msapplication-tap-highlight" content="no" />
            <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
          </Helmet>
          <Switch>
              <Route
                  path='/'
                  exact
                  render={() => (
                      <Home
                          messages={messages}
                          isCompactMode={compactMode}
                          onAddMessage={this.addMessage}
                          onRemoveMessage={this.removeMessage}
                          activateCompactMode={this.activateCompactMode}
                          deactivateCompactMode={this.deactivateCompactMode}
                      />
                  )}
              ></Route>
              <Route
                  path='/search'
                  exact
                  render={() => (
                      <Search
                          messages={this.state.messages}
                      />
                  )}
              ></Route>
          </Switch>
      </div>
    );
  }
}

export default App;
