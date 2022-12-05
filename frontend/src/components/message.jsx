import React from "react";
import "./message.css";

export default class message extends React.Component {
  render() {
    const { text, style } = this.props;

    return (
      <div className="text" style={style}>
        <p> {text} </p>
      </div>
    );
  }
}
