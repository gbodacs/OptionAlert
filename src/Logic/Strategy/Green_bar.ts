import StrategyBase from "./StrategyBase";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { getTimestampStringEST } from "../../Utils/timedate";

// Volume on the 1 min chart is over "x"
class GreenBarStrategy extends StrategyBase {
  constructor(optionTicker: string) {
    super(optionTicker, "Green bar");
  }

  Tick(): Promise<number> {
    logger.info("---GreenBar tick");
    let newAlertNum = 0;
    // Get data from store
    const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.getOptionTicker());
    if (item === undefined) {
      logger.error("GreenBarStrategy.Tick() ticker is not available in the store: " + this.getOptionTicker());
      return Promise.resolve(newAlertNum);
    }

    // Find new data in Store
    const startIndex: number = this.FindFistNewCandleIndex();
    if (startIndex === -1) {
      logger.info("No new data in CandleStore?");
      return Promise.resolve(newAlertNum);
    }

    // Check data
    const chartData = item.chartData;
    const minVol = Global.getInstance().getConstManager().getVolumeAlertValue();
    for (let i = startIndex; i < chartData.length; i++) {
      const elem = chartData[i];
      if (elem.volume > minVol) {
        Global.getInstance().getAlertManager().addAlert(
            item.ticker,
            this.strategyName,
            elem.timestamp, // todo add underlying ticker price
            " Volume " + elem.volume + " is above the limit:" + minVol + " at the moment: " + getTimestampStringEST(elem.timestamp)
          );
          newAlertNum++;
      }
    }
    this.setLastTimeStamp(chartData[chartData.length - 1].timestamp); // Last candle timestamp
    return Promise.resolve(newAlertNum);
  }
}

export default GreenBarStrategy;
