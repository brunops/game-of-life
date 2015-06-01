'use strict';

function getNextGen(board) {
  if (!(board instanceof Array) || !(board[0] instanceof Array)) {
    throw new Error('`board` needs to be an array of arrays');
  }

  var result = [];

  board.forEach(function (row, i) {
    result.push([]);
    row.forEach(function (cell, j) {
      result[i].push(getNextGenCell(i, j, board));
    });
  });

  return result;
};

function getNextGenCell(row, col, board) {
  var totalLiveNeighbors = getTotalLiveNeighbors(row, col, board);


// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  // under-population
  if (totalLiveNeighbors < 2) {
    return 0;
  }
  // over-crowding
  else if (totalLiveNeighbors > 3) {
    return 0;
  }

  return board[row][col];
}

function getTotalLiveNeighbors(row, col, board) {
  var total = 0,
      neighRow,
      neighCol;

  for (var i = -1; i <= 1; ++i) {
    neighRow = row + i;
    for (var j = -1; j <= 1; ++j) {
      neighCol = col + j;

      if (typeof board[neighRow] !== 'undefined'
          && typeof board[neighRow][neighCol] !== 'undefined'
          && !(i === 0 && j === 0)) {
        total += board[neighRow][neighCol];
      }
    }
  }

  return total;
}

module.exports = getNextGen;
