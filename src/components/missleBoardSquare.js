import React from "react";
import "./missleBoardSquare.css";

function MissleBoardSquare(props) {
  let updateClassName = square => {
    let className = "square";

    switch (square.value) {
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

  return (
    <div
      onClick={props.clickHandler}
      className={updateClassName(props.value)}
      data-row={props.row}
      data-col={props.column}
      data-value={props.value}
      data-coord={props.coordinates}
    ></div>
  );
}

export default MissleBoardSquare;
