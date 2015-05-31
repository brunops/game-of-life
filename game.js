'use strict';

function getNextGen(board) {
  if (!(board instanceof Array) || !(board[0] instanceof Array)) {
    throw new Error('`board` needs to be an array of arrays');
  }

  var result = [];

  board.forEach(function (row, i) {
    result.push([]);
    row.map(function (cell, j) {
      result[i].push(0);
    });
  });

  return result;
};

module.exports = getNextGen;
