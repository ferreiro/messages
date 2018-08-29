import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Home from './views/Home'
import Search from './views/Search'
import Settings from './views/Settings'
import Playground from './views/Playground'
import NotFound from './views/NotFound'

import * as MessagesApi from './libs/MessagesApi'
import '../styles/css/index.css';

const COMPACT_MODE_CLASSNAME = 'compact'
const NIGTH_MODE_CLASSNAME = 'night'

class App extends Component {
  state = {
    messages: [],
    settings: {
      user: {
        name: 'Jorge',
        bio: 'Software Engineer and entrepreneuri'
      },
      nightMode: true,
      compactMode: true,
      infiniteScroll: true,
    }
  }

  componentDidMount() {
      const { nightMode, compactMode } = this.state.settings
 
      nightMode && (this.activateNightMode())
      compactMode && (this.activateCompactMode())

      this.getMessages()
  }

  getMessages = () => {
      MessagesApi.get({ limit: null, pakeToken: null })
          .then(response => {
            const { count, pageToken, messages } = response
            this.addMessages(messages)
            this.updateNextPageToken(pageToken)
          })
          .catch(err => [])
  }

  addMessages = (messages, callback = () => {}) => {
    const transformedMessages = messages.map(message => {
      return MessagesApi.toInternalMessage(message)
    })
    this.setState((prevState, props) => ({
      messages: prevState.messages.concat(transformedMessages)
    }), () => {
      return callback()
    })
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

  deactivateNightMode = () => {
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
                          isInfiniteScrollActivated={this.state.settings.infiniteScroll}
                          onAddMessages={this.addMessages}
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
                            settings={this.state.settings}
                            onActivateCompactMode={this.activateCompactMode}
                            onDeactivateCompactMode={this.deactivateCompactMode}
                            onActivateNightMode={this.activateNightMode}
                            onDeactivateNightMode={this.deactivateNightMode}
                            onActivateInfiniteScroll={this.activateInfiniteScroll}
                            onDeactivateInfiniteScroll={this.deactivateInfiniteScroll}
                        />
                      </div>
                    )
                  }}
              ></Route>
              <Route
                  path='/playground'
                  exact
                  render={() => <Playground messages={this.state.messages}/>}
              />
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
