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

  it('parameter is not changed - non-destructive function', function () {
    var board = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ];

    getNextGen(board);

    assert.deepEqual(board, [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ]);
  });

  describe('1st rule - Any live cell with fewer than two live neighbours dies', function () {
    it('[[0, 0, 0], \n\t[0, 1, 0], \n\t[0, 0, 0]] returns all dead cells', function () {
      assert.deepEqual(getNextGen([[0, 0, 0], [0, 1, 0], [0, 0, 0]]), [[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    });

    it('[[0, 0, 0], \n\t[0, 1, 1], \n\t[0, 0, 0]] returns all dead cells', function () {
      var board = [
        [0, 0, 0],
        [0, 1, 1],
        [0, 0, 0]
      ];

      assert.deepEqual(getNextGen(board), [[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    });

    it('[[0, 1, 1], \n\t[0, 1, 1], \n\t[0, 0, 0]] returns the same board', function () {
      var board = [
        [0, 1, 1],
        [0, 1, 1],
        [0, 0, 0]
      ];

      assert.deepEqual(getNextGen(board), board);
    });
  });

  describe('2nd rule - Any live cell with two or three live neighbours lives on to the next generation.', function () {

    it('[[0, 0, 1], \n\t[0, 1, 0], \n\t[1, 0, 0]] only center cell lives', function () {
      var board = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0]
      ];

      assert.deepEqual(getNextGen(board), [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0]
      ]);
    });

    it('[[1, 1, 0], \n\t[1, 1, 0], \n\t[0, 0, 0]] returns the same board', function () {
      var board = [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
      ];

      assert.deepEqual(getNextGen(board), board);
    });
  });

  describe('3rd rule - Any live cell with more than three live neighbours dies, as if by overcrowding.', function () {
    it('[[1, 1, 0], \n\t[0, 1, 0], \n\t[1, 1, 1]] center cell dies', function () {
      var board = [
        [1, 1, 0],
        [0, 1, 0],
        [1, 1, 1]
      ];

      assert.deepEqual(getNextGen(board), [
        [1, 1, 0],
        [0, 0, 0],
        [1, 1, 1]
      ]);
    });

    it('[[1, 1, 1], \n\t[1, 1, 1], \n\t[1, 1, 1]] only edge cells live', function () {
      var board = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
      ];

      assert.deepEqual(getNextGen(board), [
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1]
      ]);
    });
  });

  describe('4th rule - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', function () {
    it('[[1, 1, 0], \n\t[1, 0, 0], \n\t[0, 0, 0]] center cell comes back to life', function () {
      var board = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]
      ];

      assert.deepEqual(getNextGen(board), [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
      ]);
    });
  });

  describe('glider', function () {
    it('gliders gonna glide', function () {
      var board = [
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ];

      var nextGen = getNextGen(board);
      assert.deepEqual(nextGen, [
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0]
      ]);

      nextGen = getNextGen(nextGen);
      assert.deepEqual(nextGen, [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]);

      nextGen = getNextGen(nextGen);
      assert.deepEqual(nextGen, [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0]
      ]);

      nextGen = getNextGen(nextGen);
      assert.deepEqual(nextGen, [
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0]
      ]);
    });
  });
});


