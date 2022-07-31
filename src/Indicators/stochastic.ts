
// todo: rebuild the whole SlowStochastic
async function SlowStochastic(dataSeries:number) {/*
  try {
    //pass optional configuration object into the constructor
    let SlowStochastic = new SO({ periods: 14, smaPeriods: 3 });

    // Parameters: periods, startIndex, endIndex, smaPeriods, sliceOffset, lazyEvaluation, maxTickDuration

    // set data series
    SlowStochastic.setValues(dataSeries);

    //invoke calculate() to compute and retrieve result collection
    //an error will be throw if passed data series or options are invalid
    let result = await SlowStochastic.calculate();*/

    /*for (let i = 0, len = result.length; i < len; i++) {
      console.log(
        `Price: ${result[i].price}, SO.k: ${result[i].k}, SO.d: ${result[i].d}`
      );
    }*/
/*
    return result;
  } catch (err) {
    console.log(err.message);
    return [];
  }*/
}

export { SlowStochastic };
