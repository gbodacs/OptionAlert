import StrategyBase from "./StrategyBase";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { getTimestampStringEST } from "../../Utils/timedate";
import {RSI} from "technicalindicators"
import {Stochastic} from "technicalindicators"
/*var inputRSI = {
  values : [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27,277.35,269.02,263.23,214.90],
  period : 14
};

RSI.calculate(inputRSI) 

var expectedResult = [
    86.41,86.43,89.65,86.50,84.96,80.54,77.56,58.06
];

*/

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
*/

class RSI_StochAboveStrategy extends StrategyBase {
  constructor(optionTicker: string) {
    super(optionTicker, "RSI Above");
  }

  Tick(): void {
    // Get data from store
    const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.getOptionTicker());
    if (item === undefined) {
      logger.error("VolumeAboveStrategy.Tick() ticker is not available in the store: "+this.getOptionTicker());
      return;
    }

    // Find new data in Store
    const startIndex: number = this.FindFistNewCandleIndex()
    if (startIndex === -1) {
      logger.info("No new data in CandleStore?");
      return;
    }

    // Check data
    const chartData = item.chartData;
    const minVol = Global.getInstance().getConstManager().getVolumeAlertValue()
    for (let i=startIndex; i<chartData.length; i++) {
      const elem = chartData[i]
      if (elem.volume > minVol) {

        Global.getInstance().getAlertManager().addAlert(
          item.ticker,
          this.strategyName,
          elem.timestamp, // todo add underlying ticker price
          " Volume " + elem.volume + " is above the limit:" + minVol + " at the moment: " + getTimestampStringEST(elem.timestamp));
      }
    }
    this.lastTimestamp = chartData[chartData.length - 1].timestamp; // Last candle timestamp
  }
}

export default RSI_StochAboveStrategy;
