import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const API_BASE = 'https://swapi.co/api'
const getPersonURL = id => `${API_BASE}/people/${id}`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { films: [] }
  }

  componentDidMount() {
    const id = 1

    fetch(getPersonURL(id))
      .then(resp => resp.json())
      .then((person) => {
        if(person.films.length) {
          const promises = person.films.map(
            (filmUrl) => fetch(filmUrl)
              .then(resp => resp.json())
          )

          Promise.all(promises)
           .then(films => this.setState({ person, films }))

        } else {
          this.setState({ person })
        }
      })
  }

  render() {
    const { person, films } = this.state

    console.log('render')

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
        {
          films.length &&
            <section>
              <h4>Films</h4>
              <ul>
                {
                  films.map(film => (
                    <li key={film.url}>
                      <span>{film.title}</span>
                      <p>{film.opening_crawl}</p>
                    </li>
                  ))
                }
              </ul>
            </section>

        }
      </div>
    );
  }
}

export default App;
