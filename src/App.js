import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Search from './Search';
import SearchResults from './SearchResults';

const API_BASE = 'https://swapi.co/api'
const getPersonURL = id => `${API_BASE}/people/${id}`

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { films: [] }
  }

  componentDidMount() {
    const id = 1

    return

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

    return (
      <Container maxWidth="sm">
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Starwars
          </Typography>
          <Search />
          <SearchResults />
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
        </Box>
      </Container>
    );
  }
}

export default App;
