import React from "react";
import "./shipBoard.css";
import GridSquare from "./gridSquare";
import { gridGenerator, shipGenerator } from "../utils";
import { checkOccupied, clearHover } from "../shipsUtils";

class ShipBoard extends React.Component {
  state = {
    board: gridGenerator(),
    horizantal: true,
    currentShip: 0,
    ships: shipGenerator()
  };

  placeShip = (e, horizantal, currentShip) => {
    let col = parseInt(e.target.dataset.col);
    let row = parseInt(e.target.dataset.row);
    let newBoard = this.state.board;
    let size = this.state.ships[currentShip].size;
    let type = this.state.ships[currentShip].type;
    let positions = [];

    if (
      checkOccupied(
        e,
        this.state.horizantal,
        this.state.currentShip,
        this.state.board,
        this.state.ships
      ) === true
    ) {
    } else {
      if (horizantal === true) {
        if (col + size <= newBoard[row].length) {
          for (let i = 0; i < size; i++) {
            newBoard[row][col + i].value = type;
            newBoard[row][col + i].hover = false;
            positions.push({
              coordinates: `(${row},${col + i})`,
              status: false
            });
          }
        } else {
          alert("Out of bounds!");
          return;
        }
      } else {
        if (row + size <= newBoard.length) {
          for (let i = 0; i < size; i++) {
            newBoard[row + i][col].value = type;
            newBoard[row + i][col].hover = false;
            positions.push({
              coordinates: `(${row + i},${col})`,
              status: false
            });
          }
        } else {
          alert("Out of bounds!");
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

  handleHover = e => {
    this.hoverUpdate(e, this.state.horizantal, this.state.currentShip);
  };

  hoverUpdate = (e, horizantal, currentShip) => {
    clearHover(this.state.board);

    let col = parseInt(e.target.dataset.col);
    let row = parseInt(e.target.dataset.row);
    let newBoard = this.state.board;
    let size = this.state.ships[currentShip].size;

    if (horizantal === true) {
      if (col + size <= newBoard[row].length) {
        for (let i = 0; i < size; i++) {
          newBoard[row][col + i].hover = true;
        }
      } else {
        return;
      }
    } else {
      if (row + size <= newBoard.length) {
        for (let i = 0; i < size; i++) {
          newBoard[row + i][col].hover = true;
        }
      } else {
        return;
      }
    }

    this.setState({ board: newBoard });
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
            handleHover={this.handleHover}
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
        <h3>Now Placing: {this.state.ships[this.state.currentShip].type}</h3>
      </div>
    );
  }
}

export default ShipBoard;
