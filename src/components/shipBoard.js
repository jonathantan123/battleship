import React from "react";
import "./shipBoard.css";
import GridSquare from "./gridSquare";
import { gridGenerator, shipGenerator } from "../utils";

class ShipBoard extends React.Component {
  state = {
    board: gridGenerator(),
    horizantal: true,
    currentShip: 0,
    ships: shipGenerator()
  };

  ///// check if occupied

  checkOccupied = (e, horizantal, currentShip) => {
    let col = parseInt(e.target.dataset.col);
    let row = parseInt(e.target.dataset.row);
    let newBoard = this.state.board;
    let size = this.state.ships[currentShip].size;

    let isTaken = false;

    if (horizantal === true) {
      if (col + size <= newBoard[row].length)
        for (let i = 0; i < size; i++) {
          if (newBoard[row][col + i] !== "null") {
            isTaken = true;
          }
        }
    } else {
      if (row + size <= newBoard.length) {
        for (let i = 0; i < size; i++) {
          if (newBoard[row + i][col] !== "null") {
            isTaken = true;
          }
        }
      }
    }
    return isTaken;
  };

  placeShip = (e, horizantal, currentShip) => {
    debugger;
    let col = parseInt(e.target.dataset.col);
    let row = parseInt(e.target.dataset.row);
    let newBoard = this.state.board;
    let size = this.state.ships[currentShip].size;
    let type = this.state.ships[currentShip].type;

    let positions = [];
    debugger;

    if (
      this.checkOccupied(e, this.state.horizantal, this.state.currentShip) ===
      true
    ) {
    } else {
      if (horizantal === true) {
        if (col + size <= newBoard[row].length) {
          for (let i = 0; i < size; i++) {
            newBoard[row][col + i] = type;
            positions.push({
              coordinates: `(${row},${col + i})`,
              status: false
            });
          }
        } else {
          alert("out of bounds ");
          return;
        }
      } else {
        debugger;
        if (row + size <= newBoard.length) {
          for (let i = 0; i < size; i++) {
            newBoard[row + i][col] = type;
            positions.push({
              coordinates: `(${row + i},${col})`,
              status: false
            });
          }
        } else {
          alert("out of bounds ");
          return;
        }
      }
      this.setState({ board: newBoard });
      this.setPositions(positions, currentShip);
      this.setCurrentShip(currentShip);

      this.props.savedPositions(
        positions,
        this.state.ships,
        this.state.board,
        this.props.activePlayer
      );
    }
  };

  setPositions = (positions, currentShip) => {
    let ships = [...this.state.ships];
    let ship = ships[currentShip];
    ship.positions = positions;
    ships[currentShip] = ship;

    this.setState({ ships });
  };

  handleClick = e => {
    if (this.props.phase === true) {
      this.placeShip(e, this.state.horizantal, this.state.currentShip);
    } else {
      return;
    }
  };

  setCurrentShip = currentShip => {
    if (this.state.currentShip < this.state.ships.length - 1) {
      this.setState({ currentShip: currentShip + 1 });
    } else {
      this.setState(
        {
          board: gridGenerator(),
          horizantal: true,
          currentShip: 0,
          ships: shipGenerator()
        },
        () => this.props.updatePhase()
      );
    }
  };

  flipDirection = () => {
    this.setState({ horizantal: !this.state.horizantal });
  };

  renderButton = () => {
    return <button onClick={this.flipDirection}>Flip Direction</button>;
  };

  renderSquares = () => {
    return this.state.board.map((row, i) => {
      return row.map((square, c) => {
        return (
          <GridSquare
            key={`(${i}, ${c})`}
            coordinates={`(${i}, ${c})`}
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
        <h2>Place your Ships {this.props.activePlayer}</h2>
        <div className="grid-container">{this.renderSquares()}</div>
        {this.renderButton()}
      </div>
    );
  }
}

export default ShipBoard;
