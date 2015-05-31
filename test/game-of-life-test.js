'use strict';

// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

var assert = require('assert');

var Game = require('../game.js');

describe('Game', function () {
  var game;

  beforeEach(function () {
    game = new Game();
  })

  it('is instanciable', function () {
    assert(game instanceof Game);
  });

  it('width defaults to 5', function () {
    assert.equal(game.width, 5);
  });

  it('height defaults to 5', function () {
    assert.equal(game.height, 5);
  });
});
