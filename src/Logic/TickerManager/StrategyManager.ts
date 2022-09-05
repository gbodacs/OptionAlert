import logger from "../../Utils/logger";
import StrategyBase from "../Strategy/StrategyBase";
import GreenBarStrategy from "../Strategy/Volume_Above";
import TickerManager from "./TickerManager";

class StrategyManager {
  /* Strategies are here */
  private strategies: StrategyBase[] = [];

  /* Ticker and options ticker manager */
  private tickerManager = new TickerManager();

  public AddGreenBarStrategy(optionTicker: string) {
    this.tickerManager.AddOptionTicker(optionTicker);
    this.strategies.push(new GreenBarStrategy(optionTicker)); // Todo: tickereket a stratekiakba tenni es onnan kiszedni, hogy mindig friss legyen
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

  public Tick() {
    logger.info("StrategyManager::Tick() called!")
    this.tickerManager.Tick();

    this.strategies.forEach((elem) => elem.Tick());
  }
}

export default StrategyManager