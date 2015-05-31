'use strict';

function getNextGen(board) {
  if (!(board instanceof Array)) {
    throw new Error('`board` needs to be an array');
  }
};

module.exports = getNextGen;
