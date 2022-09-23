import StrategyBase from "./StrategyBase";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { getTimestampStringEST } from "../../Utils/timedate";
import { RsiCalc, RsiName } from "../../Indicators/rsi";
import { SlowStochasticCalc, StochName } from "../../Indicators/slowstochastic";

class RsiStochAboveStrategy extends StrategyBase {
  constructor(optionTicker: string) {
    super(optionTicker, "RSI Stoch above");
  }

  async Tick(): Promise<number> {
    logger.info("---RSI_Stoch_above tick");
    let newAlertNum = 0;
    // Find new data in Store
    const startIndex: number = this.FindFistNewCandleIndex();
    if (startIndex === -1) {
      logger.info("No new data in CandleStore?");
      return newAlertNum;
    }

    // Calculate RSI
    // Calculate Stochastic
    await Promise.all([RsiCalc(this.getOptionTicker()), SlowStochasticCalc(this.getOptionTicker())]);

    // Get data from store
    const rsiData = Global.getInstance().getIndicatorStore().GetIndicatorDataByName(this.getOptionTicker(), RsiName);
    if (rsiData === undefined) {
      logger.error("RsiStochAboveStrategy.Tick() indicator is not available in the store: " + this.getOptionTicker() + " " + RsiName);
      return newAlertNum;
    }

    const stochData = Global.getInstance().getIndicatorStore().GetIndicatorDataByName(this.getOptionTicker(), StochName);
    if (stochData === undefined) {
      logger.error("RsiStochAboveStrategy.Tick() indicator is not available in the store: " + this.getOptionTicker() + " " + StochName);
      return newAlertNum;
    }

    // Get Constants
    const aboveRsi = Global.getInstance().getConstManager().getRsiMaxValue();
    const aboveStoch = Global.getInstance().getConstManager().getStochasticMaxValue();

    {
      // Debugger info to test array lengths
      const r = rsiData.dataValues.length;
      const s = stochData.dataValues.length;
      // Get data from store
      const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.getOptionTicker());
      if (item === undefined) {
        return newAlertNum;
      }

      if (r !== s && s !== item.chartData.length) {
        logger.error("RsiStochAboveStrategy - wrong arrays length!");
      }
    }

    // Check data for alert (also check the new data only!)
    for (let i = startIndex; i < rsiData.dataValues.length; i++) {
      const elemR = rsiData.dataValues[i];
      const elemS = stochData.dataValues[i];
      if (elemR.ivalue > aboveRsi && elemS.ivalue > aboveStoch) {
        if (elemR.timestamp !== elemS.timestamp) {
          logger.error("RsiStochAboveStrategy - different timestamps!");
        }

        Global.getInstance().getAlertManager().addAlert(this.getOptionTicker(), this.strategyName, elemR.timestamp,
        " RSI value is: " + elemR.ivalue + " and it's above the limit: " + aboveRsi + " SlowStochastic value is: " +
         elemS.ivalue + " and it's above the limit: " + aboveStoch + " at the moment: " + getTimestampStringEST(elemR.timestamp) );
        newAlertNum++;
      }
    }
    this.setLastTimeStamp(rsiData.dataValues[rsiData.dataValues.length - 1].timestamp); // Last candle timestamp
    return newAlertNum;
  }
}

export default RsiStochAboveStrategy;
