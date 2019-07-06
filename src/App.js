import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API_BASE = 'https://swapi.co/api'
const getPersonURL = id => `${API_BASE}/people/${id}`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    const id = 1

    fetch(getPersonURL(id))
      .then(resp => resp.json())
      .then(json => this.setState({ person: json }))
  }

  render() {
    const { person } = this.state

    person && console.log(person.films)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        {
          person &&
            <section>
              <h4>{person.name}</h4>
              <h6>{person.height}</h6>
            </section>
        }
      </div>
    );
  }
}

export default App;
