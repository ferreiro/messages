import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Home from './views/Home'
import Search from './views/Search'
import Settings from './views/Settings'
import NotFound from './views/NotFound'

import * as MessagesApi from './libs/MessagesApi'
import '../styles/css/index.css';

const COMPACT_MODE_CLASSNAME = 'compact'
const NIGTH_MODE_CLASSNAME = 'night'

class App extends Component {
  state = {
    messages: [],
    nextPageToken: null,
    settings: {
      nightMode: false,
      compactMode: true,
      infiniteScroll: true,
    }
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

  addClassToBody = (className) => {
    const body = document.getElementsByTagName('body')[0]
    body.classList.add(className)
  }

  removeClassFromBody = (className) => {
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove(className)
  }

  setSettingsValue = (settingsValue) => {
    this.setState((prevState) => ({
      settings: Object.assign(prevState.settings, settingsValue)
    }))
  }

  activateNightMode = () => {
    this.addClassToBody(NIGTH_MODE_CLASSNAME)
    this.setSettingsValue({ nightMode: true })
  }

  deactivateNigthMode = () => {
    this.removeClassFromBody(NIGTH_MODE_CLASSNAME)
    this.setSettingsValue({ nightMode: false })
  }

  activateCompactMode = () => {
    this.addClassToBody(COMPACT_MODE_CLASSNAME)
    this.setSettingsValue({ compactMode: true })
  }

  deactivateCompactMode = () => {    
    this.removeClassFromBody(COMPACT_MODE_CLASSNAME)
    this.setSettingsValue({ compactMode: false })
  }

  activateInfiniteScroll = () => {
    this.setSettingsValue({ infiniteScroll: true })
  }

  deactivateInfiniteScroll = () => {    
    this.setSettingsValue({ infiniteScroll: false })
  }

  isCompactModeActivated = () => this.state.settings.compactMode

  isNightModeActivated = () => this.state.settings.nightMode

  isInfiniteScroll = () => this.state.settings.infiniteScroll

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
                          onAddMessage={this.addMessage}
                          onRemoveMessage={this.removeMessage}
                      />
                  )}
              ></Route>
              <Route
                  path='/search'
                  exact
                  render={() => {
                    return (
                      <Search
                          messages={this.state.messages}
                      />
                    )
                  }}
              ></Route>
              <Route
                  path='/settings'
                  exact
                  render={() => {
                    const { history } = this.props

                    const goBack = () => history.goBack()

                    return (
                      <div>
                        {console.log(this.state)}
                        <Settings
                            onGoBack={goBack}
                            onActivateCompactMode={this.activateCompactMode}
                            onDeactivateCompactMode={this.deactivateCompactMode}
                            onActivateNightMode={this.activateNightMode}
                            onDeactivateNightMode={this.deactivateNigthMode}
                            onActivateInfiniteScroll={this.activateInfiniteScroll}
                            onDeactivateInfiniteScroll={this.deactivateInfiniteScroll}

                            isCompactMode={this.isCompactModeActivated}
                            isNightMode={this.isNightModeActivated}
                            isInfiniteScroll={this.isInfiniteScroll}
                        />
                      </div>
                    )
                  }}
              ></Route>
              <Route
                  path='/'
                  render={() => (
                      <NotFound />
                  )}
              ></Route>
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
