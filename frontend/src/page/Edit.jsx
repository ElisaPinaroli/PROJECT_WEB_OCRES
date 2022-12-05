import React from "react";
import Movie from "../components/MoviePageEdit";
import Event from "../components/EventPageEdit";
import Balade from "../components/BaladePageEdit";
import Touriste from "../components/TouristePageEdit";
import Monnaie from "../components/monnaiePageEdit";

//import "react-widgets/styles.css";
//mport Combobox from "react-widgets/Combobox";

export default class Edit extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Movie />
        </div>
        <div>
          <Event />
        </div>
        <div>
          <Touriste />
        </div>
        <div>
          <Balade />
        </div>
        <div>
          <Monnaie />
        </div>
      </div>
    );
  }
}
