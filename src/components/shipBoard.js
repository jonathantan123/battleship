import React from "react";
import "./shipBoard.css";
import GridSquare from "./gridSquare";

let ships = [
  {
    type: "s5",
    size: 5,
    positions: []
  },
  {
    type: "s4",
    size: 4,
    positions: []
  },
  {
    type: "s3",
    size: 3,
    positions: []
  },
  {
    type: "s2",
    size: 2,
    positions: []
  },
  {
    type: "s1",
    size: 1,
    positions: []
  }
];

class ShipBoard extends React.Component {
  state = {
    board: "",
    horizantal: true,
    currentShip: 0,
    ships: ships
  };

  gridGenerator = () => {
    let grid = [];
    let length = 10;
    for (let r = 0; r < length; r++) {
      let row = [];
      for (let c = 0; c < length; c++) {
        row.push("null");
      }
      grid.push(row);
    }

    return grid;
  };

  componentWillMount() {
    this.setState({ board: this.gridGenerator() });
  }

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
          if (newBoard[row][col + i] !== "null") {
            isTaken = true;
          }
        }
      }
    }
    return isTaken;
  };

  placeShip = (e, horizantal, currentShip) => {
    let col = parseInt(e.target.dataset.col);
    let row = parseInt(e.target.dataset.row);

    let newBoard = this.state.board;

    let size = this.state.ships[currentShip].size;
    let type = this.state.ships[currentShip].type;

    let positions = [];

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
        }
      } else {
        if (row + size <= newBoard.length) {
          for (let i = 0; i < size; i++) {
            newBoard[row + i][col] = type;
            positions.push({
              coordinates: `(${row + i},${col})`,
              status: false
            });
          }
        }
      }

      this.setState({ board: newBoard });
      this.setPositions(positions, currentShip);
      this.setCurrentShip(currentShip);
      this.props.savedPositions(positions, this.state.ships, this.state.board);
    }
  };

  setPositions = (positions, currentShip) => {
    let ships = [...this.state.ships];
    let ship = ships[currentShip];
    ship.positions = positions;
    ships[currentShip] = ship;
    this.setState({ ships });
  };

  handleHover = e => {};

  handleClick = e => {
    
    if (this.props.phase === true) {
      this.placeShip(e, this.state.horizantal, this.state.currentShip);
    } else {
      
      return;
    }
  };

  setCurrentShip = currentShip => {
    
    if (this.state.currentShip < this.state.ships.length - 1 ) {
      this.setState({ currentShip: currentShip + 1 });
    } else {
      
      this.props.updatePhase()
    }
  };

  renderOptions = () => {
    return (
      <ul onClick={this.handleShipSelect}>
        <li>Ship 1</li>
        <li>Ship 2 </li>
        <li>Ship 3 </li>
        <li>Ship 4</li>
        <li>Ship 5</li>
      </ul>
    );
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
        <div className="grid-container">{this.renderSquares()}</div>
        {this.renderOptions()}
        {this.renderButton()}
      </div>
    );
  }
}

export default ShipBoard;
