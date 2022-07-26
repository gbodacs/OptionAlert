import StrategyBase from "./StrategyBase";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import {VwapCalc, VwapInput} from "../../Indicators/vwap"


// Current Option price is below VWAP.

class VwapAboveStrategy extends StrategyBase {
  constructor(optionTicker: string, underlyingTicker:string) {
    super(optionTicker, "Josh VWAP under");
  }

  Tick():Promise<number> {
    const newAlertNum = 0;

    // Get chart data from store
    const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.getOptionTicker());
    if (item === undefined) {
      logger.error("VwapAboveStrategy.Tick() cannot get data")
      return Promise.resolve(newAlertNum);
    }

    // Find new data in Store
    const startIndex: number = this.FindFistNewCandleIndex()
    if (startIndex === -1) {
      logger.error("No new data in CandleStore?");
      return Promise.resolve(newAlertNum);
    }

    // Create input data for VWAP calculation
    const input: VwapInput[] = []
    const chartData = item.chartData;
    for (let i=startIndex; i<chartData.length; i++) {
      const elem = chartData[i]
      input.push({"price": elem.close, "volume": elem.volume})
    }

    // Calculate VWAP
    const vwapValues: number[] = VwapCalc(input);
    if (vwapValues.length !== input.length) {
      logger.error("vwapValues calculation array size problem!")
    }

    // Check data
   /* for (const elem of vwapValues) {
      if (elem < VWA) {
        logger.info("VwapAboveStrategy Alert! Volume above limit:"+elem.volume+ " at the moment: "+(new Date(elem.timestamp*1000).toLocaleString()) ); // todo: alert
        newAlertNum++;
      }
    }*/
    return Promise.resolve(newAlertNum);
  }
}

export default VwapAboveStrategy;
