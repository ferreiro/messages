import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import './App.css';

import Message from './types/Message'
import CardList from './components/CardList'

class App extends Component {
  state = {
    messages: [
      new Message({
          "id":1,
          "content":"Her pretty looks have been mine enemies, And therefore have I invoked thee for her seal, and meant thereby Thou shouldst print more, not let that pine to aggravate thy store Buy terms divine in selling hours of dross Within be fed, without be rich no more So shalt thou feed on Death, that feeds on men, And Death once dead, there's no more to shame nor me nor you.",
          "updated":new Date(),
          "authorName": "William Shakespeare",
          "avatarUrl": "/photos/william-shakespeare.jpg"
      }),
      new Message({
          "id":2,
          "content":"Her pretty looks have been mine enemies, And therefore have I invoked thee for her seal, and meant thereby Thou shouldst print more, not let that pine to aggravate thy store Buy terms divine in selling hours of dross Within be fed, without be rich no more So shalt thou feed on Death, that feeds on men, And Death once dead, there's no more to shame nor me nor you.",
          "updated":new Date() - 60000 * 30,
          "authorName": "William Shakespeare",
          "avatarUrl": "/photos/william-shakespeare.jpg"
      }),
      new Message({
          "id":3,
          "content":"Her pretty looks have been mine enemies, And therefore have I invoked thee for her seal, and meant thereby Thou shouldst print more, not let that pine to aggravate thy store Buy terms divine in selling hours of dross Within be fed, without be rich no more So shalt thou feed on Death, that feeds on men, And Death once dead, there's no more to shame nor me nor you.",
          "updated":"2015-02-01T07:46:23Z",
          "authorName": "William Shakespeare",
          "avatarUrl": "/photos/william-shakespeare.jpg"
      })
    ],
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
