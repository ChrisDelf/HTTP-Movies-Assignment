import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import FormikUpdateForm from './Movies/UpdateForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState();

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/movies')
      .then(res => setMovies(res.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <SavedList list={savedList} />
      <Route
        exact
        path="/"
        render={props => {
          return (
            <MovieList
              {...props}
              movies={movies}
              setMovies={setMovies}
              addToSavedList={addToSavedList}
            />
          );
        }}
      />
      <Route
        path="/movies/:id"
        render={props => {
          return (
            <Movie
              {...props}
              movies={movies}
              setMovies={setMovies}
              addToSavedList={addToSavedList}
              setId={setId}
            />
          );
        }}
      />
      <Route
        path="/movies/update-movie/:id"
        render={props => {
          return (
            <FormikUpdateForm
            {...props}
              id = {id}
              movies={movies}
              setMovies={setMovies}
            />
          );
        }}
      />
    </>
  );
};

export default App;
