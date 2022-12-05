import React from "react";
//import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from "./button";
import Movie from "./movie";
import axios from "axios";
import { map } from "lodash";
import "../style/App.css";

const BACKEND_BASE_URL = "http://localhost:3001/movies";

export default class MoviePageEdit extends React.Component {
  constructor() {
    super();
    Movie.connected = true;
    this.state = {
      movies: [],
      addFilmInputValue: "",
    };
  }

  componentDidMount() {
    this.getList();
  }

  addFilmInputChange = (event) => {
    this.setState({ addFilmInputValue: event.target.value });

    console.log("value is:", event.target.value);
  };

  getList = () => {
    axios
      .get(BACKEND_BASE_URL)
      .then(
        (data) =>
          data.data &&
          data.data.movies &&
          this.setState({ movies: data.data.movies })
      );
  };

  addMovie = () => {
    axios
      .put(BACKEND_BASE_URL, { movie: this.state.addFilmInputValue })
      .then((data) => this.getList());
  };

  deleteMovie = (id) => {
    axios.delete(`${BACKEND_BASE_URL}/${id}`).then((data) => this.getList());
  };

  renderCategory = (label, action) => {
    return (
      <div className="category">
        <h2>Films à l'affiche à Paris</h2>
        <Button text={label} onClick={action} />
      </div>
    );
  };

  render() {
    const { movies, addFilmInputValue } = this.state;

    return (
      <div>
        {this.renderCategory("Refresh", this.getList)}
        <div className="category">
          <input
            type="text"
            id="addFilm"
            name="addFilm"
            onChange={this.addFilmInputChange}
            value={addFilmInputValue}
          />
          <Button text={"Add movie"} onClick={this.addMovie} />
        </div>
        <div className="message">
          <p id="showMessage" name="showMessage"></p>
        </div>
        <div className="movies">
          {map(movies, (movie, index) => (
            <div className="element">
              <Movie
                key={`movie-${index}`}
                infos={movie}
                deleteMovie={() => this.deleteMovie(movie["_id"])}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
