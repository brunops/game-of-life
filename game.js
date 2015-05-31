'use strict';

function getNextGen(board) {
  if (!(board instanceof Array) || !(board[0] instanceof Array)) {
    throw new Error('`board` needs to be an array of arrays');
  }

  board.forEach(function (row, i) {
    row.map(function (cell, j) {
      board[i][j] = 0;
    });
  });

  return board;
};

module.exports = getNextGen;
