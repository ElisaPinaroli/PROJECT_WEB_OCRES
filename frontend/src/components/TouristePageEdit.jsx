import React from "react";
import Button from "./button";
import Touriste from "./touriste";
import axios from "axios";
import { map } from "lodash";
import "../style/App.css";
import "./touristes.css";

const BACKEND_BASE_URL = "http://localhost:3001/touristes";

export default class TouristePageEdit extends React.Component {
  constructor() {
    super();
    Touriste.connected = true;
    this.state = {
      touristes: [],
      addTouristeInputValue: "",
      modifyTouristeInputValue: "",
    };
  }
  componentDidMount() {
    this.getListTouristes();
  }

  addTouristeInputChange = (event) => {
    this.setState({ addTouristeInputValue: event.target.value });

    console.log("value is:", event.target.value);
  };

  modifyTouristeInputChange = (event) => {
    this.setState({ modifyTouristeInputValue: event.target.value });

    console.log("value is:", event.target.value);
  };

  getListTouristes = () => {
    axios
      .get(BACKEND_BASE_URL)
      .then(
        (data) =>
          data.data &&
          data.data.touristes &&
          this.setState({ touristes: data.data.touristes })
      );
  };

  addTouriste = () => {
    console.log("fonction addTouriste");
    axios
      .put(BACKEND_BASE_URL, { continent: this.state.addTouristeInputValue })
      .then(() => this.getListTouristes());
  };

  deleteTouriste = (id) => {
    axios
      .delete(`${BACKEND_BASE_URL}/${id}`)
      .then(() => this.getListTouristes());
  };

  modifyTouriste = (id) => {
    axios
      .put(`${BACKEND_BASE_URL}/${id}`, {
        tauxTouriste: this.state.modifyTouristeInputValue,
      })
      .then(() => this.getListTouristes());
  };

  renderCategory = (label, action) => {
    return (
      <div className="category">
        <h2>Répartition touristique par continent</h2>
        <Button text={label} onClick={action} />
      </div>
    );
  };

  render() {
    const { touristes, addTouristeInputValue, modifyTouristeInputValue } =
      this.state;

    return (
      <div>
        {this.renderCategory("Refresh", this.getListTouristes)}
        <div className="category">
          <input
            type="text"
            id="addTouriste"
            name="addTouriste"
            onChange={this.addTouristeInputChange}
            value={addTouristeInputValue}
          />
          <Button text={"Add"} onClick={this.addTouriste} />
        </div>
        <div className="message">
          <p id="showMessage" name="showMessage"></p>
        </div>
        <div className="">
          {map(touristes, (touriste, index) => (
            <Touriste
              key={`touriste-${index}`}
              infos={touriste}
              deleteTouriste={() => this.deleteTouriste(touriste["_id"])}
              modifyTouriste={() => this.modifyTouriste(touriste["_id"])}
            />
          ))}
        </div>
        <div className="category">
          <input
            type="text"
            id="modifyTouriste"
            name="modifyTouriste"
            onChange={this.modifyTouristeInputChange}
            value={modifyTouristeInputValue}
          />
        </div>
      </div>
    );
  }
}
