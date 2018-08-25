import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import './App.css';

import CardList from './components/CardList'
import * as MessagesApi from './libs/MessagesApi'

class App extends Component {
  state = {
    messages: [],
    nextPageToken: null
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

  componentDidMount() {
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
            <div className="header__burger"></div>
            <div className="header__logo">
              Messages
            </div>
            <ul className="header__options">
              <li className="header__item">
                <div className="">Test</div>
              </li>
              <li className="header__item">
                <div className="">Test</div>
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
