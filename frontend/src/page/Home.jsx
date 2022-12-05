import React from "react";
//import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from "../components/button";
import Movie from "../components/movie";
import Event from "../components/event";
import Menu from "../components/menu";
import GraphTouristes from "../components/graphTouristes";
import Areachartfunc from "../components/areacharts";
import Continent from "../components/continents";
import Balade from "../components/balade";
import Monnaie from "../components/monnaie";
import Touriste from "../components/touriste";
import axios from "axios";
import { map } from "lodash";
import "../style/App.css";

const BACKEND_BASE_URL_MOVIE = "http://localhost:3001/movies/";
const BACKEND_BASE_URL_EVENT = "http://localhost:3001/parisEvent/";
const BACKEND_BASE_URL_TOURISTE = "http://localhost:3001/touristes/";
const BACKEND_BASE_URL_BALADE = "http://localhost:3001/balade/";
const BACKEND_BASE_URL_MONNAIE = "http://localhost:3001/monnaie/";

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      events: [],
      touristes: [],
      balades: [],
      monnaies: [],
      addEventInputValue: "",
      addFilmInputValue: "",
      addTouristeInputValue: "",
      addBaladeInputValue: "",
      addMonnaieInputValue: "",
    };
  }

  componentDidMount() {
    this.getListMovie();
    this.getListEvent();
    this.getListTouriste();
    this.getListBalade();
    this.getListMonnaie();

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

  getListBalade = () => {
    axios.get(BACKEND_BASE_URL_BALADE).then((data) => {
      console.log("data:", data);
      data.data &&
        data.data.balades &&
        this.setState({ balades: data.data.balades });
    });
  };

  getListMonnaie = () => {
    axios.get(BACKEND_BASE_URL_MONNAIE).then((data) => {
      console.log("data:", data);
      data.data &&
        data.data.monnaies &&
        this.setState({ monnaies: data.data.monnaies });
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
    const { movies, events, touristes, balades, monnaies } = this.state;

    return (
      <div className="Window">
        <div className="ContenuMenu">
        <div className="menu">
          <Menu />

          </div>
        </div>
        <div className="Contenu">
          {map(movies, (movie, index) => (
            <Movie key={`movie-${index}`} infos={movie} />
          ))}

          <div className="paddingtop">
            {map(events, (event, index) => (
              <Event key={`event-${index}`} infos={event} />
            ))}
          </div>
        </div>
        <div className="Contenu2">
          <div className="touriste">
            <Areachartfunc />
          </div>


          <div className="Contenu4">

          <div className="paddingtop">
            <div className="Contenu3">
              <div className="continent">
                <GraphTouristes />
              </div>
              <div className="paddingtop">
                
                {map(balades, (balade, index) => (
              <Balade key={`balade-${index}`} infos={balade} />
            ))}
                
              </div>
            </div>
          </div>

          
            
          <div className="monnaie">
          <div className="paddingleft">
            {map(monnaies, (monnaie, index) => (
              <Monnaie key={`monnaie-${index}`} infos={monnaie} />
            ))}
            </div>
            </div>
          </div>
        </div>
        <div className="Contenu2"></div>
      </div>
    );
  }
}
