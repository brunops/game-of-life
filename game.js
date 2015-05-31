'use strict';

function Game(width, height) {
  this.width = width || 5;
  this.height = height || width || 5;
}

module.exports = Game;
