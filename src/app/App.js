import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Menu from './components/Menu'

import Home from './views/Home'
import Favorite from './views/Favorite'
import Search from './views/Search'
import Settings from './views/Settings'
import NotFound from './views/NotFound'
import Message from './types/Message'

import * as MessagesApi from './libs/MessagesApi'
import '../styles/css/index.css';

const COMPACT_MODE_CLASSNAME = 'compact'
const NIGTH_MODE_CLASSNAME = 'night'

class App extends Component {
  state = {
    messages: [],
    isMenuOpen: false,
    user: {
      name: 'Jorge Ferreiro',
      bio: 'Software Engineer and entrepreneur',
      website: 'www.ferreiro.me',
      avatar: '/photos/jorge_ferreiro.jpg',
    },
    settings: {
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
            const { pageToken, messages } = response // count, 
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
      messages: [ ...prevState.messages, ...transformedMessages ]
    }), () => {
      return callback()
    })
  }

  removeMessage = (message) => {
    console.log('.....')
    console.log('removeMessage')
    console.log(this.state)
    const messageId = message.id
    this.setState(({ messages }, props) => ({
      messages: messages.filter(m => m.id !== messageId) // ...messages.slice(0, index) , ...messages.slice(index + 1, messages.length)
    }), () => {
      console.log(this.state)
    })
  }

  favoriteMessage = (message) => {
    const { messages } = this.state

    const messageIndex = messages.findIndex((item) => item.id === message.id)
    const data = Object.assign({}, message.toJSON(), { isFavorite: !message.isFavorite })

    this.setState(({ messages }, props) => ({
        messages: [
            ...messages.slice(0, messageIndex), 
            new Message(data),
            ...messages.slice(messageIndex + 1)
        ]
    }))
  }

  openMenu = () => {
    this.updateMenuState(true)
  }

  updateMenuState = (isMenuOpen) => {
    this.setState({ isMenuOpen })
  }

  updateNextPageToken = (newToken) =>
    this.setState({ nextPageToken: newToken })

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

  activateInfiniteScroll = () =>
    this.setSettingsValue({ infiniteScroll: true })

  deactivateInfiniteScroll = () =>
    this.setSettingsValue({ infiniteScroll: false })

  render() {
    const { messages, } = this.state // compactMode

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

          <Menu
            isOpen={this.state.isMenuOpen}
            onUpdateMenuState={this.updateMenuState}
            user={this.state.user}
          />

          <Switch>
              <Route
                  path='/'
                  exact
                  render={() => (
                      <Home
                          messages={messages}
                          onOpenMenu={this.openMenu}
                          isInfiniteScrollActivated={this.state.settings.infiniteScroll}
                          onAddMessages={this.addMessages}
                          onRemoveMessage={this.removeMessage}
                          onFavoriteMessage={this.favoriteMessage}
                      />
                  )}
              ></Route>
              <Route
                  path='/favorite'
                  exact
                  render={() => (
                      <Favorite
                          messages={messages.filter(message => message.isFavorite === true)}
                          onOpenMenu={this.openMenu}
                          onRemoveMessage={this.removeMessage}
                          onFavoriteMessage={this.favoriteMessage}
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
                          onRemoveMessage={this.removeMessage}
                          onFavoriteMessage={this.favoriteMessage}
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
