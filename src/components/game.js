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
    activePlayer: "Player 1",
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
    
    
    if (this.state.activePlayer === "Player 1") {
      let state = this.state.player2.shipsBoard;
      let row = parseInt(e.target.dataset.row);
      let col = parseInt(e.target.dataset.col);

      state[row][col] = value;

      this.setState({ shipsBoard: state });
      this.setState({activePlayer: "Player 2"})
    } else {
      let state = this.state.player1.shipsBoard;
      let row = parseInt(e.target.dataset.row);
      let col = parseInt(e.target.dataset.col);
      state[row][col] = value;

      this.setState({ shipsBoard: state });
      this.setState({activePlayer: "Player 1"})
    }
  };

  updatePhase = () => {
    if (this.state.activePlayer === "Player 2")
      this.setState({ placing: !this.state.placing, activePlayer: "Player 1" });
    else {
      this.setState({ activePlayer: "Player 2" });
    }
  };

  updateWinner = () => {
    alert("game Over")
    this.setState({placing: true, 
    activePlayer: "Player 1"})
    this.setState({ gameOver: true });
  };

  /// Conditional Rendering starts with player1 Board

  renderShipBoard = () => {
    if (this.state.activePlayer === "Player 1") {
      return (
        <ShipBoard
        activePlayer={this.state.activePlayer}
          player={"Player 1"}
          savedPositions={this.savedPositions}
          phase={this.state.placing}
          updatePhase={this.updatePhase}
        />
      );
    } else {
      return (
        <ShipBoard
        activePlayer={this.state.activePlayer}
          player={"Player 2"}
          savedPositions={this.savedPositions}
          phase={this.state.placing}
          updatePhase={this.updatePhase}
        />
      );
    }
  };

  renderMissleBoard = () => {
    
    
    if (this.state.activePlayer === "Player 1") {
      return (
        <MissleBoard
        activePlayer={this.state.activePlayer}
          player={this.state.player2}
          updateGrid={this.updateGrid}
          updateWinner={this.updateWinner}
          switchPlayer= {this.switchPlayer}
        />
      );
    } else {
      
      return (
        <MissleBoard
        activePlayer={this.state.activePlayer}
          player={this.state.player1}
          updateGrid={this.updateGrid}
          updateWinner={this.updateWinner}
          switchPlayer= {this.switchPlayer}
        />
      );
    }
  };

  //// saving ship positions in array to check hits
  savedPositions = (array, shipsArray, placedBoard, player) => {
    if (player === "Player 1") {
      
      this.setState({
        player1: {
          ships: shipsArray,
          shipsBoard: placedBoard
        }
      });
    } else {
      
      this.setState({
        player2: {
          ships: shipsArray,
          shipsBoard: placedBoard
        }
      });
    }
  };

  render() {
    return (
      <div className="game">
        {this.state.placing ? (
          <div className="shipsContainer">{this.renderShipBoard()}</div>
        ) : (
          <React.Fragment>{this.renderMissleBoard()}</React.Fragment>
        )}
      </div>
    );
  }
}

export default Game;
