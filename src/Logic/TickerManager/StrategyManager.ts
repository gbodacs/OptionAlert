import logger from "../../Utils/logger";
import StrategyBase from "../Strategy/StrategyBase";
import GreenBarStrategy from "../Strategy/Green_bar";
import TickerManager from "./TickerManager";
import RsiStochAboveStrategy from "../Strategy/RSI_Stoch_above";
import RsiStochBelowStrategy from "../Strategy/RSI_Stoch_below";
import Global from "../../Global/Global";

class StrategyManager {
  /* Strategies are here */
  private strategies: StrategyBase[] = [];

  /* Ticker and options ticker manager */
  private tickerManager = new TickerManager();

  public AddGreenBarStrategy(optionTicker: string) {
    this.tickerManager.AddOptionTicker(optionTicker);
    this.strategies.push(new GreenBarStrategy(optionTicker)); // Todo: tickereket a stratekiakba tenni es onnan kiszedni, hogy mindig friss legyen
  }

  public AddRsiStochAbove(optionTicker: string) {
    this.tickerManager.AddOptionTicker(optionTicker);
    this.strategies.push(new RsiStochAboveStrategy(optionTicker)); // Todo: tickereket a stratekiakba tenni es onnan kiszedni, hogy mindig friss legyen
  }

  public AddRsiStochBelow(optionTicker: string) {
    this.tickerManager.AddOptionTicker(optionTicker);
    this.strategies.push(new RsiStochBelowStrategy(optionTicker)); // Todo: tickereket a stratekiakba tenni es onnan kiszedni, hogy mindig friss legyen
  }

  public getStrategy() {
    return this.strategies;
  }

  public removeStrategy(idx: number) {
    this.strategies.splice(idx,1)
  }

  public getTickerManager() {
    return this.tickerManager;
  }

  public async Tick() {
    logger.info("StrategyManager::Tick() start!")
    await this.tickerManager.Tick();


    this.strategies.forEach(async (elem) => {
      const num = await elem.Tick();
      logger.info("--------")
      logger.info("Strategy:"+ elem.getStrategyName())
      logger.info("Option Ticker:"+ elem.getOptionTicker())
      logger.info("Under Ticker:"+ elem.getUnderlyingTicker())
      logger.info("Last Timestamp:"+ elem.getLastTimeStamp().toString())
      logger.info("--------")
      Global.getInstance().getUiConstManager().addNumberOfAlerts(num);
    });
    logger.info("StrategyManager::Tick() end!")
  }
}

export default StrategyManager