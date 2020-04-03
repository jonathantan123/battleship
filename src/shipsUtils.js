export function checkOccupied(e, horizantal, currentShip, currentBoard, ships) {
  let col = parseInt(e.target.dataset.col);
  let row = parseInt(e.target.dataset.row);
  let newBoard = currentBoard;
  let size = ships[currentShip].size;

  let isTaken = false;

  if (horizantal === true) {
    if (col + size <= newBoard[row].length)
      for (let i = 0; i < size; i++) {
        if (newBoard[row][col + i].value !== "null") {
          isTaken = true;
        }
      }
  } else {
    if (row + size <= newBoard.length) {
      for (let i = 0; i < size; i++) {
        if (newBoard[row + i][col].value !== "null") {
          isTaken = true;
        }
      }
    }
  }

  return isTaken;
}

export function clearHover(board) {
  board.forEach(row => {
    return row.forEach(element => {
      return (element.hover = false);
    });
  });
}
