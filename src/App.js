import React from 'react';
import { Container } from 'semantic-ui-react';
import SearchBar from './searchBar'
import Filters from './filterSection'

import './App.css';

const App = props => {
  return (
    <div className="App">
      <Container>
        <SearchBar
          options={props.options}
          onChange={props.handleChange}
          value={props.value}
          simpleValue
        />
        <Filters
          umbrellas={props.umbrellas}
          selected={props.selected}
          disabledBuckets={props.disabledBuckets}
        />
      </Container>
    </div>
  )
}


export default App;
