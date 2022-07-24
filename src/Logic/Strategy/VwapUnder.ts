import StrategyBase from "./StrategyBase";
import Global from "../../Global/Global";
import logger from "../../../utils/logger";
import {Vwap, VwapInput} from "../../Indicators/vwap"


// Current Option price is below VWAP.

class VwapAboveStrategy extends StrategyBase {
  constructor(ticker: string) {
    super(ticker);
  }

  Tick():void {
    // Get chart data from store
    const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.ticker);
    if (item === undefined) {
      logger.error("VwapAboveStrategy.Tick() cannot get data")
      return;
    }

    // Find new data in Store
    const startIndex: number = this.FindFistNewCandleIndex()
    if (startIndex === -1) {
      logger.error("No new data in CandleStore?");
      return;
    }

    // Create input data for VWAP calculation
    const input: VwapInput[] = []
    const chartData = item.chartData;
    for (let i=startIndex; i<chartData.length; i++) {
      const elem = chartData[i]
      input.push({"price": elem.close, "volume": elem.volume})
    }

    // Calculate VWAP
    const vwapValues: number[] = Vwap(input);
    if (vwapValues.length !== input.length) {
      logger.warning("vwapValues calculation array size problem!")
    }

    // Check data
   /* for (const elem of vwapValues) {
      if (elem < VWA)
        logger.info("VwapAboveStrategy Alert! Volume above limit:"+elem.volume+ " at the moment: "+(new Date(elem.timestamp*1000).toLocaleString()) ); // todo: alert
    }*/
  }
}

export default VwapAboveStrategy;
