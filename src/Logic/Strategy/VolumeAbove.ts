import StrategyBase from "./StrategyBase";
import Global from "../../Global/Global";
import logger from "../../../utils/logger";

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
      logger.warning("No new data in CandleStore?");
      return;
    }

    // Check data
    const chartData = item.chartData;
    for (let i=startIndex; i<chartData.length; i++) {
      const elem = chartData[i]
      if (elem.volume > Global.getInstance().getVolumeMin()) {
        Global.getInstance().getAlertManager().Alert(item.ticker, "VolumeAboveStrategy", " volume " + elem.volume + " is above the limit:" + Global.getInstance().getVolumeMin() + " at the moment: " + new Date(elem.timestamp * 1000).toLocaleString());
      }
    }
    this.lastTimestamp = chartData[chartData.length - 1].timestamp; // Last candle timestamp
  }
}

export default VolumeAboveStrategy;
