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
      attackboard: [], 
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
    this.setState({ placing: !this.state.placing });
  };

  updateWinner = () => {
    debugger
    this.setState({gameOver : true})
  }

  



  //// saving ship positions in array to check hits
  savedPositions = (array, shipsArray, placedBoard) => {
    this.setState({
      player1: {
        positions: [...this.state.player1.positions, ...array],
        ships: shipsArray,
        shipsBoard: placedBoard
      }
    });
  };

  render() {
    return (
      <div className="game">
       
        {this.state.placing ? 
         <div className="shipsContainer">
         <ShipBoard
           player={this.state.player1}
           savedPositions={this.savedPositions}
           phase={this.state.placing}
           updatePhase={this.updatePhase}
           
         />
       </div>
         :  <MissleBoard
        player={this.state.player1}
        updateGrid={this.updateGrid}
        updateWinner= {this.updateWinner}
      />}
      </div>
    );
  }
}

export default Game;
