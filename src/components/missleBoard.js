import React from "react";
import "./shipBoard.css";
import MissleBoardSquare from "./missleBoardSquare";

class MissleBoard extends React.Component {
  state = {
    totalShips: 5
  };

  checkWin = () => {
    if (this.state.totalShips === 0) {
      this.props.updateWinner();
    }
  };

  checkSunk = ship => {
    let sunk = true;

    ship.positions.forEach(pos => {
      if (pos.status === false) {
        sunk = false;
      }
    });

    if (sunk) {
      alert("sunk!");
      this.setState({ totalShips: this.state.totalShips - 1 }, () =>
        this.checkWin()
      );
    } else {
      alert("hit");
    }
  };

  checkMissle = e => {
    let value = "miss";

    let ships = this.props.opponent.ships;

    let ship = ships.find(ship => {
      return ship.positions.some(position => {
        return position.coordinates === e.target.dataset.coord;
      });
    });

    //// if the coordinate exists on opposite player board

    if (ship) {
      let hit = ship.positions.find(
        position => position.coordinates === e.target.dataset.coord
      );

      if (hit.status === "hit") {
        alert("you've already hit here");
        return;
      } else {
        hit.status = "hit";
        this.checkSunk(ship);
        value = "hit";
      }
    } else {
      value = "miss";
      alert("miss");
    }

    this.props.updateGrid(e, value);
  };

  handleClick = e => {
    this.checkMissle(e);
  };

  renderSquares = () => {
    ;
    return this.props.opponent.shipsBoard.map((row, i) => {
      return row.map((square, c) => {
        return (
          <MissleBoardSquare
            key={`(${i},${c})`}
            coordinates={`(${i},${c})`}
            row={`${i}`}
            column={`${c}`}
            value={square}
            clickHandler={this.handleClick}
          />
        );
      });
    });
  };

  render() {
    return (
      <div>
        <h3>Fire a missle {this.props.activePlayer}</h3>
        <div className="grid-container">{this.renderSquares()}</div>
      </div>
    );
  }
}

export default MissleBoard;
