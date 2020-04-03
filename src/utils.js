

export function gridGenerator() {
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

export function shipGenerator() {
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

  return ships
  };