/* global describe it */
var assert = require('assert')
var stats = require('./stats')

var arrOddLen = [-2, 1, 2, 2, 3, 4, 15]
var arrEvenLen = [1, 2, 2, 3.4, 2.2, 19, 5.2, 1.3, 3.3, 4.1]
var randomData = [0.9, 0.74, 0.41, 2518, 0.64, 1.7, 0.63, 0.39,
  1.54, 0.277, 2.27, 0.37, 0.56, 0.2005, 3, 2.15, 0.78, 3.15, 2,
  0.29, 0.76, 1.38, 1.09, 2.6, 1.26, 0.83, 0.63, 2.98, 1.4, 0.36,
  0.59, 2.1, 1.58, 0.211, 0.65, 1.18, 2.95, 0.7, 0.22, 0.55, 0.37,
  0.93, 0.334, 0.47, 0.93, 0.233, 1.24, 0.2041, 1.38, 0.63, 0.58,
  1.91, 1.25, 0.33, 1.73, 2.29, 0.32, 0.272, 0.332, 0.8, 1.49, 0.38,
  0.32, 0.225, 3.47, 0.73, 0.4, 0.2559, 0.2039, 0.44, 0.2029, 0.2018,
  0.25, 0.46, 0.2024, 2.62, 0.83, 0.21, 0.53, 0.212, 1.64, 0.89, 0.59,
  0.39, 0.38, 2.99, 1.15, 0.603, 0.44, 0.207, 2.6, 0.48, 0.34, 0.2022,
  0.56, 1.3, 0.41, 0.204, 0.286, 0.28]

describe('mean', function () {
  it('should return the corrent mean value - oddLen', function () {
    assert.equal(stats.mean(arrOddLen).toFixed(2), 3.57)
  })

  it('should return the corrent mean value - evenLen', function () {
    assert.equal(stats.mean(arrEvenLen).toFixed(2), 4.35)
  })
})

describe('median', function () {
  it('should return NaN for empty array', function () {
    assert.ok(isNaN(stats.median([])))
  })

  it('should return the corrent median value - oddLen', function () {
    assert.equal(stats.median(arrOddLen), 2)
  })

  it('should return the corrent median value - evenLen', function () {
    assert.equal(stats.median(arrEvenLen).toFixed(2), 2.75)
  })
})

describe('standard deviation', function () {
  it('should return the corrent stdev value - oddLen', function () {
    assert.equal(stats.stdev(arrOddLen).toFixed(2), 4.98)
  })

  it('should return the corrent stdev value - evenLen', function () {
    assert.equal(stats.stdev(arrEvenLen).toFixed(2), 5.04)
  })

  it('should return zero for one-length array', function () {
    assert.equal(stats.stdev([-12]), 0)
  })

  it('should return the corrent stdev value for 2-signed array', function () {
    assert.equal(stats.stdev([-0.01, 0, 74.36]).toFixed(2), 35.06)
  })
})

describe('median absolute deviation', function () {
  it('should return the corrent MAD value  - oddLen', function () {
    assert.equal(stats.MAD(arrOddLen), 1)
  })

  it('should return the corrent MAD value - evenLen', function () {
    assert.equal(stats.MAD(arrEvenLen).toFixed(2), 1.05)
  })
})

describe('filterMADoutliers', function () {
  it('should return an array with two outliers removed given lower threshold', function () {
    var res = [1, 2, 2, 3, 4]
    assert.equal(stats.filterMADoutliers(arrOddLen, 2.5).join(','), res.join(','))
  })

  it('should return an array with one outlier removed using default threshold', function () {
    var res = [-2, 1, 2, 2, 3, 4]
    assert.equal(stats.filterMADoutliers(arrOddLen).join(','), res.join(','))
    assert.equal(stats.indexOfMADoutliers(arrOddLen).join(','), res.length.toString())
  })

  it('should return an array with single outlier removed', function () {
    var res = [1, 2, 2, 3.4, 2.2, 5.2, 1.3, 3.3, 4.1]
    assert.equal(stats.filterMADoutliers(arrEvenLen).join(','), res.join(','))
    assert.equal(stats.indexOfMADoutliers(arrEvenLen).join(','), '5')
  })

  it('should return an array with negative outliers removed', function () {
    var input = [1.1, 1.2, 2.2, -20, 3.3, 2.1, 2.3, -10.2]
    var res = [1.1, 1.2, 2.2, 3.3, 2.1, 2.3]

    assert.equal(stats.filterMADoutliers(input).join(','), res.join(','))
    assert.equal(stats.indexOfMADoutliers(input).join(','), '3,7')
  })

  it('should return an array with positive outliers removed', function () {
    var input = [1.1, 1.2, 2.2, 20, 3.3, 2.1, 2.3, 11]
    var res = [1.1, 1.2, 2.2, 3.3, 2.1, 2.3]

    assert.equal(stats.filterMADoutliers(input).join(','), res.join(','))
  })

  it('should return an array with 2-sided outliers removed', function () {
    var input = [1.1, 1.2, 2.2, -20, 3.3, 2.1, 18.2, 2.3]
    var res = [1.1, 1.2, 2.2, 3.3, 2.1, 2.3]

    assert.equal(stats.filterMADoutliers(input).join(','), res.join(','))
  })
})

describe('filterMedianDiffOutliers', function () {
  it('should remove 1 outlier', function () {
    var res = [-2, 1, 2, 2, 3, 4]
    assert.equal(stats.filterMedianDiffOutliers(arrOddLen).join(','), res.join(','))
    assert.equal(stats.indexOfMedianDiffOutliers(arrOddLen).join(','), res.length.toString())
  })

  it('should remove two outlier numbers', function () {
    assert.equal(stats.filterMedianDiffOutliers(randomData).length, randomData.length - 2)
    assert.equal(stats.indexOfMedianDiffOutliers(randomData).join(','), '3,4')
  })
})

describe('Filter Outliers', function () {
  assert.equal(stats.filterOutliers(randomData).length,
    stats.filterMedianDiffOutliers(randomData).length)

  assert.equal(stats.filterOutliers(randomData, stats.outlierMethod.MAD).length,
    stats.filterMADoutliers(randomData).length)
})

describe('Index of Outliers', function () {
  assert.equal(stats.indexOfOutliers(randomData).length, 2)
  assert.equal(stats.indexOfOutliers(randomData, stats.outlierMethod.MAD).length, 10)

  var arr = [5000, 4900, 1000, 3000, 4400, 1200300, 5000, 5500, 126500]
  var indexsToRemove = stats.indexOfOutliers(arr, stats.outlierMethod.MAD);
  assert.equal(stats.indexOfOutliers(arr, stats.outlierMethod.MAD).join(','), '2,5,8')
  assert.equal(stats.indexOfOutliers(arr, stats.outlierMethod.MedianDiff).join(','), '5,6,8')
})
