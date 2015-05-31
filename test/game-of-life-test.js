'use strict';

// 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// 2. Any live cell with two or three live neighbours lives on to the next generation.
// 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
// 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

var assert = require('assert');

var getNextGen = require('../game.js');

describe('getNextGen', function () {
  it('throws an error if input is not an array', function () {
    assert.throws(function () {
      getNextGen();
    });
  });

  it('throws an error if input is not an array of arrays', function () {
    assert.throws(function () {
      getNextGen([]);
    });
  });

  it('1x1 board with a dead cell [[0]] remains dead', function () {
    assert.deepEqual(getNextGen([[0]]), [[0]]);
  });

  it('A lonely living cell [[1]] dies', function () {
    assert.deepEqual(getNextGen([[1]]), [[0]]);
  });
});


