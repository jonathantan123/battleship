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

  /// Check to see if a hit is a sink. If so decrement total ships by 1. 
  checkSunk = ship => {
    let sunk = true;

    ship.positions.forEach(pos => {
      if (pos.status === false) {
        sunk = false;
      }
    });

    if (sunk) {
      alert("Sunk!");
      this.setState({ totalShips: this.state.totalShips - 1 }, () =>
        this.checkWin()
      );
    } else {
      alert("Hit!");
    }
  };

  checkMissle = e => {
    let value = "miss";

    let ships = this.props.opponent.ships;

    /// go through opponent's ships and see if the position exists

    let ship = ships.find(ship => {
      return ship.positions.some(position => {
        return position.coordinates === e.target.dataset.coord;
      });
    });

    //// if the coordinate exists on opponent's board, set the status of the 
    //// coordinate and update opponent gameboard apporiately

    if (ship) {
      let hit = ship.positions.find(
        position => position.coordinates === e.target.dataset.coord
      );

      if (hit.status === "hit") {
        alert("You've already hit here!");
        return;
      } else {
        hit.status = "hit";
        this.checkSunk(ship);
        value = "hit";
      }
    } else {
      value = "miss";
      alert("Miss!");
    }

    this.props.updateGrid(e, value);
  };

  handleClick = e => {
    this.checkMissle(e);
  };

  renderSquares = () => {
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
