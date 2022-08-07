import Global from "../../Global/Global";
import logger from "../../Utils/logger";

abstract class StrategyBase {
  constructor(ticker: string, underlyingTicker:string, strategyName: string) {
    this.optionTicker = ticker;
    this.lastTimestamp = 0;
    this.strategyName = strategyName;
    this.underlyingTicker = underlyingTicker;
    return
  }

  private strategyName: string;
  private underlyingTicker: string;
  private optionTicker: string;
  protected lastTimestamp: number;

  getStrategyName() {return this.strategyName}
  getOptionTicker() {return this.optionTicker}
  getUnderlyingTicker() {return this.underlyingTicker}
  getLastTimeStamp() {return this.lastTimestamp}

  abstract Tick():void;

  FindFistNewCandleIndex(): number {
    // get data from store
    const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.optionTicker);
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