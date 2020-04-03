import React from "react";
import ShipBoard from "./shipBoard";
import "./game.css";
import MissleBoard from "./missleBoard";
import { gridGenerator } from "../utils";

class Game extends React.Component {
  state = {
    activePlayer: "Player 1",
    placing: true,
    player1: {
      shipsBoard: gridGenerator(),
      ships: []
    },
    player2: {
      shipsBoard: gridGenerator(),
      ships: []
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
      this.setState({ activePlayer: "Player 2" });
    } else {
      let state = this.state.player1.shipsBoard;
      let row = parseInt(e.target.dataset.row);
      let col = parseInt(e.target.dataset.col);
      state[row][col] = value;

      this.setState({ shipsBoard: state });
      this.setState({ activePlayer: "Player 1" });
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
    alert(`Game Over! Congrats ${this.state.activePlayer}`);
    this.setState({ placing: true, activePlayer: "Player 1" });
    this.setState({ gameOver: true });
  };

  renderMissleBoard = () => {
    let opponent;

    if (this.state.activePlayer === "Player 1") {
      opponent = this.state.player2;
    } else {
      opponent = this.state.player1;
    }

    return (
      <MissleBoard
        activePlayer={this.state.activePlayer}
        opponent={opponent}
        updateGrid={this.updateGrid}
        updateWinner={this.updateWinner}
        switchPlayer={this.switchPlayer}
      />
    );
  };

  //// saving ship positions in array to check hits
  savedPositions = (array, shipsArray, placedBoard, player) => {
    ;
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
          <div className="shipsContainer">
            <ShipBoard
              activePlayer={this.state.activePlayer}
              savedPositions={this.savedPositions}
              phase={this.state.placing}
              updatePhase={this.updatePhase}
            />
          </div>
        ) : (
          <React.Fragment>{this.renderMissleBoard()}</React.Fragment>
        )}
      </div>
    );
  }
}

export default Game;
