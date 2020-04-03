import React from "react";
import "./gridSquare.css";

function GridSquare(props) {
  let updateClassName = square => {
    let className;

    if (square.hover === true) {
      className = "active";
    } else if (square.value === "null") {
      className = "square";
    } else {
      className = "occupied";
    }

    return className;
  };

  return (
    <div
      onClick={props.clickHandler}
      className={updateClassName(props.value)}
      data-row={props.row}
      data-col={props.column}
      data-value={props.value}
      data-coord={props.coordinates}
      onMouseOver={props.handleHover}
    ></div>
  );
}

export default GridSquare;
