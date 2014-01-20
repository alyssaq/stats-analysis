/* Mini statistics library to calculate/perform:
 * - Mean
 * - Median
 * - Standard Deviation
 * - Outlier detection (Iglewicz and Hoaglin method)
 * - Remove outliers from an array of numbers
 */

function mean(arr) {
  return (arr.reduce(function(prev, curr) {
    return prev + curr;
  }) / arr.length);
}

function variance(arr) {
  var dataMean = mean(arr);

  return (arr.reduce(function(prev, curr) {
    return prev + Math.pow(curr - dataMean, 2);
  }) / arr.length);
}

function stdev(arr) {
  return Math.sqrt(variance(arr));
}

function median(arr) {
  if (arr.length === 0) return NaN

  var half = Math.floor(arr.length / 2);

  arr = arr.sort(function (a, b) { return a - b });
  if (arr.length % 2) { // Odd length, true middle element
    return arr[half]
  } else { // Even length, average middle two elements
    return (arr[half-1] + arr[half]) / 2.0
  }
}

function medianAbsoluteDeviation(arr, dataMedian) {
  dataMedian = dataMedian || median(arr);
  var absoluteDeviation = arr.map(function(val) {
      return Math.abs(val - dataMedian);
    });

  return median(absoluteDeviation);
}

// Iglewicz and Hoaglin method 
//  values with a Z-score > 3.5 are considered potential outliers
function isOutlierCache(val, threshold, dataMedian, dataMAD) {
  return Math.abs((0.6745 * (val-dataMedian)) / dataMAD) > threshold;
}

function isOutlier(val, arr, threshold) {
  threshold = threshold || 3.5;
  return isOutlierCache(val, threshold, median(arr), medianAbsoluteDeviation(arr));
}

function filterOutliers(arr, threshold) {
  var dataMedian = median(arr), 
    dataMAD = medianAbsoluteDeviation(arr, dataMedian);

  threshold = threshold || 3.5; //Default recommended threshold
  return arr.filter(function(val) {
    return !isOutlierCache(val, threshold, dataMedian, dataMAD);
  });
}

module.exports = {
  stdev: stdev,
  mean: mean,
  median: median,
  MAD: medianAbsoluteDeviation,
  isOutlier: isOutlier,
  filterOutliers: filterOutliers
};

