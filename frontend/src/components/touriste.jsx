import React from "react";
import Button from "./button";
import { map } from "lodash";
import "./event.css";

export default class Touriste extends React.Component {
  constructor(connected) {
    super();
    this.connected = connected;
  }

  renderInfo(label, info) {
    return (
      <div className="infoLine">
        <div className="infoLabel"> {label} </div>
        <div className="info"> {info} </div>
      </div>
    );
  }

  renderInfos(label, infos) {
    return (
      <div className="infoLine">
        <div className="infoLabel"> {label} </div>
        <div>
          {map(infos, (info) => (
            <div className="info" key={`infoList-${info}`}>
              {info}
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { infos, deleteTouriste, modifyTouriste } = this.props;
    const { id, continent, tauxTouriste } = infos;
    const connected = Touriste.connected;
    if (connected) {
      return (
        <div className="touriste">
          <div className="infos">
            {this.renderInfo("continent", continent)}
            {this.renderInfo("tauxTouriste", tauxTouriste)}
          </div>
          <Button
            text={"Delete"}
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "#E2E2ED",
            }}
            onClick={() => deleteTouriste(id)}
          />
        </div>
      );
    } else {
      return (
        <div className="touriste">
          <div className="infos">
            {this.renderInfo("continent", continent)}
            {this.renderInfo("tauxTouriste", tauxTouriste)}
          </div>
        </div>
      );
    }
  }
}
