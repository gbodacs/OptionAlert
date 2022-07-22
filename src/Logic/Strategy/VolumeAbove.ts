import { CandleType } from "../CandleStore/CandleStore.d";
import StrategyBase from "./StrategyBase";
import Global, { VOLUME_MIN } from "../../Global/Global";
import logger from "../../../utils/logger";
import { timeStamp } from "console";

// Volume on the 1 min chart is over "x"
class VolumeAboveStrategy extends StrategyBase {
  constructor(ticker: string) {
    super(ticker);
  }

  Tick(): void {
    // Get data from store
    const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.ticker);
    if (item === undefined) {
      logger.error("VolumeAboveStrategy.Tick() cannot get data");
      return;
    }

    // Find new data in Store
    const startIndex: number = this.FindFistNewCandleIndex()
    if (startIndex === -1) {
      logger.error("No new data in CandleStore?");
      return;
    }

    // Check data
    const chartData = item.chartData;
    for (let i=startIndex; i<chartData.length; i++) {
      const elem = chartData[i]
      if (elem.volume > VOLUME_MIN)
        logger.info("VolumeAboveStrategy Alert! Volume above limit:" + elem.volume + " at the moment: " + new Date(elem.timestamp * 1000).toLocaleString()); // todo: alert
    }
    this.lastTimestamp = chartData[chartData.length - 1].timestamp; // Last candle timestamp
  }
}

export default VolumeAboveStrategy;
