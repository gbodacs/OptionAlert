
function Vwap(dataSeries) {
  // input: [[volume, price], [volume, price], ...]
  try {
    var p = [];
    var temp = [];
    // create vwap for every value, not just the last one
    for (var i = 0; i < dataSeries.length; i++) {
      temp[i] = dataSeries[i];
      // Calculate vwap
      const i1 = temp.reduce((s, x) => s + x[0] * x[1], 0);
      const i2 = temp.reduce((s, x) => s + x[0], 0);
      p[i] = i1 / i2 || 0;
    }
    return p;
  } catch (error) {
    console.log("Cannot calculate vwap");
    console.log(error);
    return [];
  }
}

module.exports = { Vwap };
