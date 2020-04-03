import React from "react";
import "./missleBoardSquare.css";

class MissleBoardSquare extends React.Component {
  updateClassName = square => {
    let className = "square";

    switch (square) {
      case "hit":
        className += "hit";
        break;
      case "miss":
        className += "miss";
        break;

      default:
        break;
    }

    return className;
  };

  render() {
    return (
      <div
        onClick={this.props.clickHandler}
        className={this.updateClassName(this.props.value)}
        data-row={this.props.row}
        data-col={this.props.column}
        data-value={this.props.value}
        data-coord={this.props.coordinates}
      ></div>
    );
  }
}

export default MissleBoardSquare;
