import logger from "../../Utils/logger";
import StrategyBase from "../Strategy/StrategyBase";
import VolumeAboveStrategy from "../Strategy/VolumeAbove";
import TickerManager from "./TickerManager";

class StrategyManager {
  /* Strategies are here */
  private strategies: StrategyBase[] = [];

  /* Ticker and options ticker manager */
  private tickerManager = new TickerManager();

  public AddVolumeAboveStrategy(underlying: string, option: string) {
    this.tickerManager.AddTicker(underlying);
    this.tickerManager.AddOptionTicker(option);
    this.strategies.push(new VolumeAboveStrategy(option, underlying));
  }

  public getStrategy() {
    return this.strategies;
  }

  public getTickerManager() {
    return this.tickerManager;
  }

  public Tick() {
    console.log("StrategyManager::Tick() called!")
    this.tickerManager.Tick();

    this.strategies.forEach((elem) => elem.Tick());
  }
}

export default StrategyManager