import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { getUnderlyingTickerFromOptionsTicker } from "../../Utils/timedate";

abstract class StrategyBase {
  constructor(ticker: string, strategyName: string) {
    this.optionTicker = ticker;
    this.lastTimestamp = 0;
    this.strategyName = strategyName;
    return
  }

  protected strategyName: string;
  private optionTicker: string;
  protected lastTimestamp: number;

  getStrategyName() {return this.strategyName}
  getOptionTicker() {return this.optionTicker}
  getLastTimeStamp() {return this.lastTimestamp}
  getUnderlyingTicker(): string { return getUnderlyingTickerFromOptionsTicker(this.optionTicker) };

  abstract Tick():void;

  FindFistNewCandleIndex(): number {
    // get data from store
    const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.optionTicker);
    if (item === undefined) {
      logger.error("FindFistNewCandleIndex cannot get data");
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