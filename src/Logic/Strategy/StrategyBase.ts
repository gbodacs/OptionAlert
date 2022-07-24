import Global from "../../Global/Global";
import logger from "../../../utils/logger";

abstract class StrategyBase {
  constructor(ticker: string) {
    this.ticker = ticker;
    this.lastTimestamp = 0;
    return
  }

  ticker: string;
  lastTimestamp: number;

  abstract Tick(lastPrevTimestamp: number):void;

  FindFistNewCandleIndex(): number {
    // get data from store
    const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.ticker);
    if (item === undefined) {
      logger.error("VolumeAboveStrategy.Tick() cannot get data");
      return -1;
    }

    // check data
    const chartData = item.chartData;
    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i].timestamp > this.lastTimestamp)
        return i;
    }

    return -1;
  }
}

export default StrategyBase;