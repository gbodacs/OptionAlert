import StrategyBase from "./StrategyBase";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { getTimestampStringEST } from "../../Utils/timedate";
import { RsiCalc, RsiName } from "../../Indicators/rsi";
import { SlowStochasticCalc, StochName } from "../../Indicators/slowstochastic";

class RsiStochBelowStrategy extends StrategyBase {
  constructor(optionTicker: string) {
    super(optionTicker, "RSI Stoch below");
  }

  async Tick(): Promise<void> {
    logger.info("below tick");
    // Find new data in Store
    const startIndex: number = this.FindFistNewCandleIndex();
    if (startIndex === -1) {
      logger.info("No new data in CandleStore?");
      return;
    }

    //Calculate RSI
    //Calculate Stochastic
    await Promise.all([RsiCalc(this.getOptionTicker()), SlowStochasticCalc(this.getOptionTicker())]);

    // Get data from store
    const rsiData = Global.getInstance().getIndicatorStore().GetIndicatorDataByName(this.getOptionTicker(), RsiName);
    if (rsiData === undefined) {
      logger.error("RsiStochBelowStrategy.Tick() indicator is not available in the store: " + this.getOptionTicker() + " " + RsiName);
      return;
    }

    const stochData = Global.getInstance().getIndicatorStore().GetIndicatorDataByName(this.getOptionTicker(), StochName);
    if (stochData === undefined) {
      logger.error("RsiStochBelowStrategy.Tick() indicator is not available in the store: " + this.getOptionTicker() + " " + StochName);
      return;
    }

    // Get Constants
    const belowRsi = Global.getInstance().getConstManager().getRsiMinValue();
    const belowStoch = Global.getInstance().getConstManager().getStochasticMinValue();

    debugger;
    {
      // Debugger info to test array lengths
      const r = rsiData.dataValues.length;
      const s = stochData.dataValues.length;
      // Get data from store
      const item = Global.getInstance().getCandleStore().GetTickerDataByTicker(this.getOptionTicker());
      if (item === undefined) {
        return;
      }

      if (r !== s && s !== item.chartData.length) {
        logger.error("RsiStochAboveStrategy - wrong arrays length!");
      }
    }

    // Check data for alert (also check the new data only!)
    for (let i = startIndex; i < rsiData.dataValues.length; i++) {
      const elemR = rsiData.dataValues[i];
      const elemS = stochData.dataValues[i];
      if (elemR.ivalue < belowRsi && elemS.ivalue > belowStoch) {
        if (elemR.timestamp !== elemS.timestamp) {
          logger.error("RsiStochBelowStrategy - different timestamps!");
        }

        Global.getInstance()
          .getAlertManager()
          .addAlert(
            this.getOptionTicker(),
            this.strategyName,
            elemR.timestamp,
            " RSI value is " +
              elemR.ivalue +
              " and it's below the limit:" +
              belowRsi +
              " SlowStochastic value is" +
              elemS.ivalue +
              " and it's below the limit:" +
              belowStoch +
              " at the moment: " +
              getTimestampStringEST(elemR.timestamp)
          );
      }
    }
    this.setLastTimeStamp(rsiData.dataValues[rsiData.dataValues.length - 1].timestamp); // Last candle timestamp
  }
}

export default RsiStochBelowStrategy;