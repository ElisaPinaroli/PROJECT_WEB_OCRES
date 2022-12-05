import React from "react";
import Button from "./button";
import { map } from "lodash";
import "./balade.css";
import "./edit.css";


export default class Balade extends React.Component {
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
        <div className="infoLabelBalade"> {label} </div>
        <div>
          {map(infos, (info) => (
            <div className="info" key={`infoListBalade-${info}`}>
              {info}
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { infos, deleteBalade } = this.props;
    const {
      id,
      balade,
      Street,
      CP,
      poster,
      categorie,
      description,
      
    } = infos;

    const connected = Balade.connected;
    if (connected) {
      return (
        <div className="infoEdit">
          {this.renderInfo("Title", balade)}
         
          <Button
            text={"Delete"}
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "#E2E2ED",
            }}
            onClick={() => deleteBalade(id)}
          />
        </div>
      );
    } else {
      return (
        <div className="balade">
          <img src={poster} alt={`${balade}-poster`} />
          <div className="infos">
            {this.renderInfo("Title", balade)}
            {this.renderInfo("Description", description)}
            {this.renderInfo("Categorie", categorie)}
            
            {this.renderInfo("Adresse", `${Street}, ${CP}`)}

        
      
     
          </div>
        </div>
      );
    }
  }
}
