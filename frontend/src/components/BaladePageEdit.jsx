import React from "react";
//import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from "./button";
import Balade from "./balade";
import axios from "axios";
import { map } from "lodash";
import "../style/App.css";
import "./balade.css";

const BACKEND_BASE_URL = "http://localhost:3001/balade";

export default class BaladePageEdit extends React.Component {
  constructor() {
    super();
    Balade.connected = true;
    this.state = {
      balades: [],
      addBaladeInputValue: " ",
    };
  }

  componentDidMount() {
    this.getListBalade();
  }

  addBaladeInputChange = (e) => {
    this.setState({ addBaladeInputValue: e.target.value });

    console.log("value is:", e.target.value);
  };

  getListBalade = () => {
    axios
      .get(BACKEND_BASE_URL)
      .then(
        (data) =>
          data.data &&
          data.data.balades &&
          this.setState({ balades: data.data.balades })
      );
  };

  addBalade = () => {
    console.log("dans addBalade front edit")
    axios
      .put(BACKEND_BASE_URL, { balade: this.state.addBaladeInputValue })
      .then(() => this.getListBalade());
  };

  deleteBalade = (id) => {
    // console.log("I try to delete but...");
    axios
      .delete(`${BACKEND_BASE_URL}/${id}`)
      .then((data) => this.getListBalade());
  };

  renderCategory = (label, action) => {
    return (
      <div className="category">
        <h2>Meilleurs balades parisiennes</h2>
        <Button text={label} onClick={action} />
      </div>
    );
  };

  render() {
    const { balades, addBaladeInputValue } = this.state;

    return (
      <div>
        {this.renderCategory("Refresh", this.getListBalade)}
        <div className="category">
          <input
            type="text"
            id="addBalade"
            name="addBalade"
            onChange={this.addBaladeInputChange}
            value={addBaladeInputValue}
          />
          <Button text={"Add Balade"} onClick={this.addBalade} />
        </div>
        <div className="message">
          <p id="showMessage" name="showMessage"></p>
        </div>
        <div className="edit">
          {map(balades, (balade, index) => (
            <div className="element">
              <Balade
                key={`balade-${index}`}
                infos={balade}
                deleteBalade={() => this.deleteBalade(balade["_id"])}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
