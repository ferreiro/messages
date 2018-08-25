import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import Home from './Home'
import Search from './Search'
import CardList from './components/CardList'
import * as MessagesApi from './libs/MessagesApi'
import './styles/css/index.css';

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
    console.log(this)
    this.setState({
      compactMode: true
    })

    const body = document.getElementsByTagName('body')[0]
    body.classList.add(COMPACT_MODE_CLASSNAME)
  }

  deactivateCompactMode () {
    console.log(this)
    this.setState({
      compactMode: false
    })
    
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove(COMPACT_MODE_CLASSNAME)
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
            <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
          </Helmet>
          {console.log(this)}
          <Switch>
              <Route
                  path='/'
                  exact
                  render={() => (
                      <Home
                          messages={messages}
                          isCompactMode={compactMode}
                          onAddMessage={this.addMessage}
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
