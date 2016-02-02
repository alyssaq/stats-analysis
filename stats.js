/* Mini statistics library to calculate/perform:
 * - Mean
 * - Median
 * - Standard Deviation
 * - Mean Absolute Deviation (MAD)
 * - Outlier detection (Iglewicz and Hoaglin method)
 * - Remove outliers from an array of numbers
 */

var outlierMethod = {
  MAD: 'MAD',
  medianDiff: 'medianDiff'
}

function mean (arr) {
  return (arr.reduce(function (prev, curr) {
    return prev + curr
  }) / arr.length)
}

function variance (arr) {
  var dataMean = mean(arr)

  return mean(arr.map(function (val) {
    return Math.pow(val - dataMean, 2)
  }))
}

function stdev (arr) {
  return Math.sqrt(variance(arr))
}

function median (arr) {
  var half = Math.floor(arr.length / 2)
  arr = arr.slice(0).sort(numSorter)

  if (arr.length % 2) { // Odd length, true middle element
    return arr[half]
  } else { // Even length, average middle two elements
    return (arr[half - 1] + arr[half]) / 2.0
  }
}

function medianAbsoluteDeviation (arr, dataMedian) {
  dataMedian = dataMedian || median(arr)
  var absoluteDeviation = arr.map(function (val) {
    return Math.abs(val - dataMedian)
  })

  return median(absoluteDeviation)
}

function numSorter (a, b) {
  return a - b
}

// Iglewicz and Hoaglin method
//  values with a Z-score > 3.5 are considered potential outliers
function isMADoutlier (val, threshold, dataMedian, dataMAD) {
  return Math.abs((0.6745 * (val - dataMedian)) / dataMAD) > threshold
}

function indexOfMADoutliers (arr, threshold) {
  threshold = threshold || 3.5 // Default recommended threshold
  var dataMedian = median(arr)
  var dataMAD = medianAbsoluteDeviation(arr, dataMedian)

  return arr.reduce(function (res, val, i) {
    if (isMADoutlier(val, threshold, dataMedian, dataMAD)) {
      res.push(i)
    }
    return res
  }, [])
}

function filterMADoutliers (arr, threshold) {
  threshold = threshold || 3.5 // Default recommended threshold
  var dataMedian = median(arr)
  var dataMAD = medianAbsoluteDeviation(arr, dataMedian)

  return arr.filter(function (val) {
    return !isMADoutlier(val, threshold, dataMedian, dataMAD)
  })
}

// Median filtering from difference between values
function differences (arr) {
  return arr.map(function (d, i) {
    return Math.round(Math.abs(d - (arr[i - 1] || d[0]))) + 1
  })
}

function isMedianDiffOutlier (threshold, difference, medianDiff) {
  return difference / medianDiff > threshold
}

function indexOfMedianDiffOutliers (arr, threshold) {
  threshold = threshold || 3 // Default threshold of 3 std
  var differencesArr = differences(arr)
  var medianDiff = median(differencesArr)

  return arr.reduce(function (res, val, i) {
    if (isMedianDiffOutlier(threshold, differencesArr[i], medianDiff)) {
      res.push(i)
    }
    return res
  }, [])
}

function filterMedianDiffOutliers (arr, threshold) {
  threshold = threshold || 3 // Default threshold of 3 std
  var differencesArr = differences(arr)
  var medianDiff = median(differencesArr)

  return arr.filter(function (_, i) {
    return !isMedianDiffOutlier(threshold, differencesArr[i], medianDiff)
  })
}

function filterOutliers (arr, method, threshold) {
  switch (method) {
    case outlierMethod.MAD:
      return filterMADoutliers(arr, threshold)
    default:
      return filterMedianDiffOutliers(arr, threshold)
  }
}

function indexOfOutliers (arr, method, threshold) {
  switch (method) {
    case outlierMethod.MAD:
      return indexOfMADoutliers(arr, threshold)
    default:
      return indexOfMedianDiffOutliers(arr, threshold)
  }
}

module.exports = {
  stdev: stdev,
  mean: mean,
  median: median,
  MAD: medianAbsoluteDeviation,
  numSorter: numSorter,
  outlierMethod: outlierMethod,
  filterOutliers: filterOutliers,
  indexOfOutliers: indexOfOutliers,
  filterMADoutliers: filterMADoutliers,
  indexOfMADoutliers: indexOfMADoutliers,
  filterMedianDiffOutliers: filterMedianDiffOutliers,
  indexOfMedianDiffOutliers: indexOfMedianDiffOutliers
}
