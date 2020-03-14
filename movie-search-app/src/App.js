import React from 'react';
import MovieList from './components/MovieList';
import MovieSearch from './components/MovieSearch';

const App=()=>{
  return (
    <>
      <MovieSearch></MovieSearch>
      <br></br>
      <br></br>
      <MovieList></MovieList>
    </>
  )
}

export default App;