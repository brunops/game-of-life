'use strict';

function getNextGen(board) {
  if (!(board instanceof Array) || !(board[0] instanceof Array)) {
    throw new Error('`board` needs to be an array of arrays');
  }
};

module.exports = getNextGen;
