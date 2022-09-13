import StrategyBase from "./StrategyBase";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { getTimestampStringEST } from "../../Utils/timedate";
import {RSI} from "technicalindicators"
import {Stochastic} from "technicalindicators"


class RsiStochBelowStrategy extends StrategyBase {
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

export default RsiStochBelowStrategy;
