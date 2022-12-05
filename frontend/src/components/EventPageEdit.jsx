import React from "react";
//import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from "./button";
import Event from "./event";
import axios from "axios";
import { map } from "lodash";
import "../style/App.css";
import "./edit.css";

const BACKEND_BASE_URL = "http://localhost:3001/parisEvent";

export default class EventPageEdit extends React.Component {
  constructor() {
    super();
    Event.connected = true;
    this.state = {
      events: [],
      addEventInputValue: " ",
    };
  }

  componentDidMount() {
    this.getListEvent();
  }

  addEventInputChange = (e) => {
    this.setState({ addEventInputValue: e.target.value });

    console.log("value is:", e.target.value);
  };

  getListEvent = () => {
    axios
      .get(BACKEND_BASE_URL)
      .then(
        (data) =>
          data.data &&
          data.data.events &&
          this.setState({ events: data.data.events })
      );
  };

  addEvent = () => {
    axios
      .put(BACKEND_BASE_URL, { event: this.state.addEventInputValue })
      .then(() => this.getListEvent());
  };

  deleteEvent = (id) => {
    // console.log("I try to delete but...");
    axios
      .delete(`${BACKEND_BASE_URL}/${id}`)
      .then((data) => this.getListEvent());
  };

  renderCategory = (label, action) => {
    return (
      <div className="category">
        <h2>Meilleurs événéments parisiens</h2>
        <Button text={label} onClick={action} />
      </div>
    );
  };

  render() {
    const { events, addEventInputValue } = this.state;

    return (
      <div>
        {this.renderCategory("Refresh", this.getListEvent)}
        <div className="category">
          <input
            type="text"
            id="addEvent"
            name="addEvent"
            onChange={this.addEventInputChange}
            value={addEventInputValue}
          />
          <Button text={"Add event"} onClick={this.addEvent} />
        </div>
        <div className="message">
          <p id="showMessage" name="showMessage"></p>
        </div>
        <div className="edit">
          {map(events, (event, index) => (
            <div className="element">
              <Event
                key={`event-${index}`}
                infos={event}
                deleteEvent={() => this.deleteEvent(event["_id"])}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
