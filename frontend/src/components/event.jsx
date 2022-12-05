import React from "react";
import Button from "./button";
import { map } from "lodash";
import "./event.css";
import "./edit.css";
/**
 * Data reçu :
 *  [
  {
    id: '2',
    event: "Bio-inspirée, une autre approche l'exposition",
    Street: '30 avenue Corentin-Cariou',
    CP: '75019',
    City: 'Paris',
    poster: 'https://cdn.paris.fr/qfapv4/2021/11/08/huge-2e0a2d9ffcbf6d419a865bac30f960f6.jpg',      
    audience: 'Tout public.',
    description: 'Nouvelle exposition permanente installée en partie dans la serre, Bio-inspirée, une autre approche s’attache à expliquer cette démarche scientifique respectueuse du vivant, au travers d’un parcours où le visiteur découvre comment fonctionne le vivant et comment on peut s’en inspirer.',
    modality: 'payant',
    fourchettePrix: 'De 9€ à 12€'
  }
]
 */

export default class Event extends React.Component {
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
      <div className="infoLineEvent">
        <div className="infoLabelEvent"> {label} </div>
        <div>
          {map(infos, (info) => (
            <div className="info" key={`infoListEvent-${info}`}>
              {info}
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { infos, deleteEvent } = this.props;
    const {
      id,
      event,
      Street,
      CP,
      City,
      poster,
      audience,
      description,
      modality,
      fourchettePrix,
    } = infos;

    const connected = Event.connected;
    if (connected) {
      return (
        <div className="infoEdit">
          {this.renderInfo("Title", event)}
          {this.renderInfo("Audience", audience)}
          {this.renderInfo("Modalité", modality)}
          <Button
            text={"Delete"}
            style={{
              color: "red",
              textAlign: "center",
              fontWeight: "bold",
              backgroundColor: "#E2E2ED",
            }}
            onClick={() => deleteEvent(id)}
          />
        </div>
      );
    } else {
      return (
        <div className="event">
          <img src={poster} alt={`${event}-poster`} />
          <div className="infos">
            {this.renderInfo("Title", event)}
            {this.renderInfo("Description", description)}
            {this.renderInfo("Audience", audience)}
            {this.renderInfo("Modalité", modality)}
            {this.renderInfo("Fourchette de prix", fourchettePrix)}
            {this.renderInfo("Adresse", `${Street}, ${CP} ${City}`)}
          </div>
        </div>
      );
    }
  }
}
