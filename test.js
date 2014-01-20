var assert = require("assert"),
  stats = require("./stats");

var arrOddLen = [-2, 2, 2, 3, 3, 4, 15],
  arrEvenLen = [1, 2, 2, 3.4, 2.2, 19, 5.2, 1.3, 3.3, 4.1];

describe('mean', function() {
  it('should return the corrent mean value - oddLen', function(){
    assert.equal(stats.mean(arrOddLen).toFixed(2) * 1, 3.86);
  })

  it('should return the corrent mean value - evenLen', function(){
    assert.equal(stats.mean(arrEvenLen).toFixed(2) * 1, 4.35);
  })
})

describe('median', function() {
  it('should return the corrent median value - oddLen', function(){
    assert.equal(stats.median(arrOddLen), 3);
  })
  it('should return the corrent median value - evenLen', function(){
    assert.equal(stats.median(arrEvenLen).toFixed(2) * 1, 2.75);
  })
})

describe('standard deviation', function() {
  it('should return the corrent median value - oddLen', function(){
    assert.equal(stats.median(arrOddLen), 3);
  })
  
  it('should return the corrent median value - evenLen', function(){
    assert.equal(stats.median(arrEvenLen).toFixed(2) * 1, 2.75);
  })
})

describe('median absolute deviation', function() {
  it('should return the corrent MAD value  - oddLen', function(){
    assert.equal(stats.MAD(arrOddLen), 1);
  })
  
  it('should return the corrent MAD value - evenLen', function(){
    assert.equal(stats.MAD(arrEvenLen).toFixed(2) * 1, 1.05);
  })
})

describe('isOutlier', function() {
  it('should return true when target is an outlier with default threshold of 3.5', function(){
    assert.equal(stats.isOutlier(15, arrOddLen), true);
  })

  it('should return false when target is not an outlier with higher threshold', function(){
    assert.equal(stats.isOutlier(-3, arrOddLen, 5), false);
  })

  it('should return false when target is not an outlier', function(){
    assert.equal(stats.isOutlier(2.5, arrOddLen), false);
  })
})

describe('filterOutliers', function() {
  it('should return an array with two outliers removed given lower threshold', function(){
    var res = [2, 2, 3, 3, 4];
    assert.equal(stats.filterOutliers(arrOddLen, 2.5).sort().join(","), res.sort().join(","));
  })

  it('should return an array with one outlier removed using default threshold', function(){
    var res = [-2, 2, 2, 3, 3, 4];
    assert.equal(stats.filterOutliers(arrOddLen).sort().join(","), res.sort().join(","));
  })

  it('should return an array with single outlier removed', function(){
    var res = [1, 2, 2, 3.4, 2.2, 5.2, 1.3, 3.3, 4.1];
    assert.equal(stats.filterOutliers(arrEvenLen).sort().join(","), res.sort().join(","));
  })

  it('should return an array with negative outliers removed', function(){
    var input = [1.1, 1.2, 2.2, -20, 3.3, 2.1, 2.3, -10.2],
      res = [1.1, 1.2, 2.2, 3.3, 2.1, 2.3];

    assert.equal(stats.filterOutliers(input).sort().join(","), res.sort().join(","));
  })

  it('should return an array with positive outliers removed', function(){
    var input = [1.1, 1.2, 2.2, 20, 3.3, 2.1, 2.3, 11],
      res = [1.1, 1.2, 2.2, 3.3, 2.1, 2.3];

    assert.equal(stats.filterOutliers(input).sort().join(","), res.sort().join(","));
  })

  it('should return an array with 2-sided outliers removed', function(){
    var input = [1.1, 1.2, 2.2, -20, 3.3, 2.1, 18.2, 2.3],
      res = [1.1, 1.2, 2.2, 3.3, 2.1, 2.3];

    assert.equal(stats.filterOutliers(input).sort().join(","), res.sort().join(","));
  })
})

