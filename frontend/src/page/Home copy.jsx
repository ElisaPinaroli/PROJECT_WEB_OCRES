import React from "react";
//import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from "../components/button";
import Movie from "../components/movie";
import Event from "../components/event";
import Menu from "../components/menu";
import Touristes from "../components/graphTouristes";
import Continent from "../components/continents";
import Monnaie from "../components/monnaie";
import Touriste from "../components/touriste";
import axios from "axios";
import { map } from "lodash";
import "../style/App.css";

const BACKEND_BASE_URL_MOVIE = "http://localhost:3001/movies/";
const BACKEND_BASE_URL_EVENT = "http://localhost:3001/parisEvent/";
const BACKEND_BASE_URL_TOURISTE = "http://localhost:3001/touristes/";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      events: [],
      touristes: [],
      addEventInputValue: "",
      addFilmInputValue: "",
      addTouristeInputValue: "",
    };
  }

  componentDidMount() {
    this.getListMovie();
    this.getListEvent();
    this.getListTouriste();
  }

  getListMovie = () => {
    axios
      .get(BACKEND_BASE_URL_MOVIE)
      .then(
        (data) =>
          data.data &&
          data.data.movies &&
          this.setState({ movies: data.data.movies })
      );
  };

  getListEvent = () => {
    axios.get(BACKEND_BASE_URL_EVENT).then((data) => {
      console.log("data:", data);
      data.data &&
        data.data.events &&
        this.setState({ events: data.data.events });
    });
  };

  getListTouriste = () => {
    axios.get(BACKEND_BASE_URL_TOURISTE).then((data) => {
      console.log("data:", data);
      data.data &&
        data.data.touristes &&
        this.setState({ touristes: data.data.touristes });
    });
  };

  renderCategory = (label, action) => {
    return (
      <div className="category">
        <Button text={label} onClick={action} />
      </div>
    );
  };

  render() {
    const { movies, events, touristes } = this.state;

    return (
      <div className="Window">
        /*
        {this.renderCategory(
          "Refresh",
          this.getListEvent,
          this.getListMovie,
          this.getListTouriste
        )}
        <div className="Contenu">
          <h1> Actuellement au cinéma </h1> <br />
          {map(movies, (movie, index) => (
            <Movie key={`movie-${index}`} infos={movie} />
          ))}
        </div>
        <div className="paddingtop">
          <h1> Les meilleurs événements Parisiens </h1>
          {map(events, (event, index) => (
            <Event key={`event-${index}`} infos={event} />
          ))}
        </div>
        <div className="Contenu2">
          <h1> Répartition touristique par continent </h1>
          {map(touristes, (touriste, index) => (
            <Touriste key={`touriste-${index}`} infos={touriste} />
          ))}
        </div>
        <div className="paddingtop">
          <div className="Contenu3">
            <div className="continent">
              <Continent />
            </div>
            <div className="paddingtop">
              <div className="continent">
                <Continent />
              </div>
            </div>
          </div>
        </div>
        <div className="Contenu4">
          <div className="monnaie">
            <Monnaie />
          </div>
        </div>
        <div className="Contenu2"></div>
      </div>
    );
  }
}
