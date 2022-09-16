import { RSI } from "technicalindicators";
import Global from "../Global/Global";
import logger from "../Utils/logger";

interface RsiInput {
  values: number[]; // An array of close values
  period: number; // RSI period
}

const RsiPeriod = 14
const RsiDefault = 50
const RsiName = "RSI"


async function RsiCalc(ticker: string) {
  // Get data from store
  const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(ticker);
  if (item === undefined) {
    logger.error("RsiCalc ticker is not available in the store: " + ticker);
    return;
  }

  const close: number[] = [];
  const timestamp: number[] = [];

  item.chartData.forEach((item2) => {
    close.push(item2.close);
    timestamp.push(item2.timestamp)
  });

  const input: RsiInput = {
    values: close,
    period: RsiPeriod,
  };

  const result: number[] = RSI.calculate(input);

  if (result.length+RsiPeriod !== item.chartData.length ) {
    logger.error("RsiCalc calculation error!")
  }

  for (let i=0; i<RsiPeriod; i++) {
    result.unshift(RsiDefault)
  }

  Global.getInstance().getIndicatorStore().AddIndicatorDataByTicker(ticker, RsiName, result, timestamp);
}

export { RsiCalc, RsiName };

/*
var inputRSI = {
  values : [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
  period : 14
};
var expectedResult = [
    86.41,86.43,89.65,86.50,84.96,80.54,77.56,58.06
];

RSI.calculate(inputRSI)
 */
