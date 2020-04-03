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
    }
  };


////  Based on who the active player is, update opponent's ships grid
///   to reflect missles launched by active player
  updateGrid = (e, value) => {
    let state;
    let row = parseInt(e.target.dataset.row);
    let col = parseInt(e.target.dataset.col);

    if (this.state.activePlayer === "Player 1") {
      state = this.state.player2.shipsBoard;
      this.setState({ activePlayer: "Player 2" });
    } else {
      state = this.state.player1.shipsBoard;
      this.setState({ activePlayer: "Player 1" });
    }

    state[row][col].value = value;
    this.setState({ shipsBoard: state });
  };

  /// sets phase to firing after both players have finished ship placement. 
  /// 

  updatePhase = () => {
    if (this.state.activePlayer === "Player 2")
      this.setState({ placing: !this.state.placing, activePlayer: "Player 1" });
    else {
      this.setState({ activePlayer: "Player 2" });
    }
  };

  /// known issue: active player updates before check win is completed. 
  /// Workaround for now: set winner to opposite of active player 
  updateWinner = () => {
    
    let winner 

    if(this.state.activePlayer === "Player 1") { 
      winner = "Player 2"
    } else { 
      winner = "Player 1"
    }
    alert(`Game Over! Congrats ${winner}`);
    
    //// reset game to beginning
    this.setState({ placing: true, activePlayer: "Player 1" });
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
      />
    );
  };

  //// saving ship positions and board to state 
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
          <div className="boardContainer">
            <ShipBoard
              activePlayer={this.state.activePlayer}
              savedPositions={this.savedPositions}
              phase={this.state.placing}
              updatePhase={this.updatePhase}
            />
          </div>
        ) : (
          <div className="boardContainer">{this.renderMissleBoard()}</div>
        )}
      </div>
    );
  }
}

export default Game;
