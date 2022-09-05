import { Stochastic } from "technicalindicators";
import Global from "../Global/Global";
import logger from "../Utils/logger";

interface StochInput {
  high: number[];
  low: number[];
  close: number[];
  period: number;
  signalPeriod: number;
}

interface StochResult {
  k: number,
  d: number
}

const StochPeriod = 14
const StochSignalPeriod = 3
const StochDefault = 50
const StochName = "Stochastic"


async function SlowStochasticCalc(ticker: string) {
  // Get data from store
  const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(ticker);
  if (item === undefined) {
    logger.error("StochasticCalc ticker is not available in the store: " + ticker);
    return;
  }

  const close: number[] = [];
  const high: number[] = [];
  const low: number[] = [];
  const timestamp: number[] = [];

  item.chartData.forEach((item2) => {
    close.push(item2.close);
    high.push(item2.high);
    low.push(item2.low);
    timestamp.push(item2.timestamp)
  });

  const input: StochInput = {
    low,
    close,
    high,
    period: StochPeriod,
    signalPeriod: StochSignalPeriod,
  };

  const result: StochResult[] = Stochastic.calculate(input);

  if ( (result.length+StochPeriod-1) !== item.chartData.length ) {
    logger.error("StochasticCalc calculation error!")
    return;
  }

  for (let i=0; i<StochSignalPeriod-1; i++) {
    result.unshift({k: StochDefault, d: StochDefault})
  }

  const result2: number[] = [];
  for (const item3 of result) {
    result2.push(item3.d)
  }

  if ( result2.length !== timestamp.length ) {
    logger.error("StochasticCalc calculation error_2!")
    return;
  }

  Global.getInstance().getIndicatorStore().AddIndicatorDataByTicker(ticker, StochName, result2, timestamp);
}

export { SlowStochasticCalc };

/*
let high  = [127.009,127.616,126.591,127.347,128.173,128.432,127.367,126.422,126.900,126.850,125.646,125.716,127.158,127.715,127.686,128.223,128.273,128.093,128.273,127.735,128.770,129.287,130.063,129.118,129.287,128.472,128.093,128.651,129.138,128.641];
let low   = [125.357,126.163,124.930,126.094,126.820,126.482,126.034,124.830,126.392,125.716,124.562,124.572,125.069,126.860,126.631,126.800,126.711,126.800,126.134,125.925,126.989,127.815,128.472,128.064,127.606,127.596,126.999,126.900,127.487,127.397];
let close = [125.357,126.163,124.930,126.094,126.820,126.482,126.034,124.830,126.392,125.716,124.562,124.572,125.069,127.288,127.178,128.014,127.109,127.725,127.059,127.327,128.710,127.875,128.581,128.601,127.934,128.113,127.596,127.596,128.690,128.273];
let period = 14;
let signalPeriod = 3;


let input = {
  high: high,
  low: low,
  close: close,
  period: period,
  signalPeriod: signalPeriod
};

Stochastic.calculate(input)

Array (17 items)
  0: Object {k: 70.44, d: undefined}
  1: Object {k: 67.6, d: undefined}
  2: Object {k: 89.2, d: 75.75}
  3: Object {k: 65.81, d: 74.2}
  4: Object {k: 81.73, d: 78.91}
  5: Object {k: 64.52, d: 70.69}
  6: Object {k: 74.51, d: 73.59}
  7: Object {k: 98.57, d: 79.2}
  8: Object {k: 70.12, d: 81.07}
  9: Object {k: 73.06, d: 80.58}
  10: Object {k: 73.42, d: 72.2}
  11: Object {k: 61.23, d: 69.24}
  12: Object {k: 60.95, d: 65.2}
  13: Object {k: 40.38, d: 54.19}
  14: Object {k: 40.38, d: 47.24}
  15: Object {k: 66.82, d: 49.19}
  16: Object {k: 56.74, d: 54.65}
length: 17
Array Prototype

 */
