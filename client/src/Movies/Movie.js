import React from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { Route } from 'react-router-dom';
import FormikUpdateForm from './UpdateForm';
export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.props.match.params.id}`)
      .then(res => {
        this.setMovies(res.data);
      })
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };
  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    console.log(this.props);
    return (
      <>
        <div className="save-wrapper">
          <MovieCard movie={this.state.movie} />
          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>
        </div>
        <button
          onClick={() =>
            this.props.history.push(
              `/movies/update-movie/${this.state.movie.id}`
            )
          }
          className="save-button"
        >
          Update Movie
        </button>{' '}
        <div className="save-button" onClick={this.deleteMovie}>
          Delete
        </div>
      </>
    );
  }
}
