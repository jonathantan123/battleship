import React, { Component } from "react";
import ShipBoard from "./shipBoard";
import "./game.css";
import MissleBoard from "./missleBoard";

class Game extends React.Component {
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

  state = {
    activePlayer: "player1",
    placing: true,
    player1: {
      positions: [],
      shipsBoard: this.gridGenerator(),
      ships: [],
      attackboard: []
    },
    player2: {
      positions: [],
      shipsBoard: this.gridGenerator(),
      ships: [],
      attackboard: []
    },
    gameOver: false
  };

  updateGrid = (e, value) => {
    let state = this.state.player1.shipsBoard;
    let row = parseInt(e.target.dataset.row);
    let col = parseInt(e.target.dataset.col);

    state[row][col] = value;
    this.setState({ shipsBoard: state });
  };

  updatePhase = () => {
    if (this.state.activePlayer === "player2")
      this.setState({ placing: !this.state.placing });
    else {
      this.setState({ activePlayer: "player2" });
    }
  };

  updateWinner = () => {
    debugger;
    this.setState({ gameOver: true });
  };

  /// Conditional Rendering starts with player 1 Board 

  renderShipBoard = () => {
    if (this.state.activePlayer === "player1") {
      return (
        <ShipBoard
          player={"player1"}
          savedPositions={this.savedPositions}
          phase={this.state.placing}
          updatePhase={this.updatePhase}
        />
      );
    } else {
      return (
        <ShipBoard
          player={"player2"}
          savedPositions={this.savedPositions}
          phase={this.state.placing}
          updatePhase={this.updatePhase}
        />
      );
    }
  };

  renderMissleBoard = () => {
    if (this.state.activePlayer === "player1") {
      return( <MissleBoard
        player={this.state.player1}
        updateGrid={this.updateGrid}
        updateWinner={this.updateWinner}
      />)
    } else { 
      return( <MissleBoard
        player={this.state.player2}
        updateGrid={this.updateGrid}
        updateWinner={this.updateWinner}
      />)

    }

  }

  //// saving ship positions in array to check hits
  savedPositions = (array, shipsArray, placedBoard, player) => {
    debugger

    if (player === "player1") { 

    this.setState({
      player1: {
        positions: [...this.state.player1.positions, ...array],
        ships: shipsArray,
        shipsBoard: placedBoard
      }
    });

    } else { 
      this.setState({
        player2: {
          positions: [...this.state.player1.positions, ...array],
          ships: shipsArray,
          shipsBoard: placedBoard
        }
    })
  }


  };

  render() {
    debugger
    return (
      <div className="game">
        {this.state.placing ? (
          <div className="shipsContainer">
            {this.renderShipBoard()}
          </div>
        ) : (
          <React.Fragment>
            {this.renderMissleBoard()}
          </React.Fragment>
          
        )}
      </div>
    );
  }
}

export default Game;
