import React from "react";
import "./gridSquare.css";



class GridSquare extends React.Component {

  

  updateClassName = (square) => {
    let className = "square";
    
     
    
   if(square !== "null") {
     className += " occupied"
   }

  
    return className;
  };


    render() {
      
      return (
      
      <div
      onClick= {this.props.clickHandler}
      className= {this.updateClassName(this.props.value)}
      data-row = {this.props.row}
      data-col = {this.props.column}
      data-value = {this.props.value}
      data-coord = {this.props.coordinates}
      >
          
    </div>)
    }
  }
  
  export default GridSquare;
  