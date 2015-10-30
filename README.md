# Statistics and Data Analysis

[![Build Status](https://travis-ci.org/alyssaq/stats-analysis.png?branch=master)](https://travis-ci.org/alyssaq/stats-analysis)

Mini javascript statistics library for nodejs or the browser.   
No production dependencies.   

## Current Library Coverage

 - Standard Deviation
 - Mean
 - Median (sorts before calculating)
 - Median Absolute Deviation (MAD)
 - Outlier Detection & Filtering using Iglewicz and Hoaglin's method (MAD)
 - Outlier Detection & Filtering using Median Differencing (Default method)

## Installation

```js
  $ npm install stats-analysis
```

## Usage

```js
  var stats = require("./stats") // include statistics library
```

```js
  var arr = [-2, 1, 2, 2, 3, 3, 4, 15];

  //standard deviation
  stats.stdev(arr).toFixed(2) * 1 // Round to 2dp and convert to number
  > 4.88

  //mean
  stats.mean(arr).toFixed(2) * 1 
  > 3.86

  //median
  stats.median(arr)
  > 3

  //median absolute deviation
  stats.MAD(arr)
  > 1

  // Outlier detection. Returns indexes of outliers
  stats.indexOfOutliers(arr)  // Default theshold of 3
  > [7]

  stats.indexOfOutliers(arr, 6) // Supply higher threshold to allow more outliers.

  // Outlier filtering. Returns array with outliers removed.
  stats.filterOutliers(arr)
  > [-2, 1, 2, 2, 3, 3, 4] 
```

## Tests

[Mocha](http://visionmedia.github.io/mocha/) is used as the testing framework.      
To run the tests, simply run the following commands:

```js
  $ npm install  // Grab mocha
  $ npm test     // Run tests
```

## Resources

**Engineering statistics handbook:**   
http://www.itl.nist.gov/div898/handbook/index.htm

## Contribute to the library
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License
MIT