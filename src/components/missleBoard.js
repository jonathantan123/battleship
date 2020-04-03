import React from "react";
import "./shipBoard.css";
import MissleBoardSquare from "./missleBoardSquare";

class MissleBoard extends React.Component {
  state = {
    totalShips: 5
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
      this.setState({ totalShips: this.state.totalShips - 1 }, ()=> this.checkWin());
      
    } else {
      alert("hit");
    }

    
  };

  checkMissle = e => {
      debugger

    let value = "miss";

    let ships = this.props.player.ships;

    debugger

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
      debugger
    return this.props.player.shipsBoard.map((row, i) => {
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
      debugger
    return (
      <div>
        <div className="grid-container">{this.renderSquares()}</div>
      </div>
    );
  }
}

export default MissleBoard;
