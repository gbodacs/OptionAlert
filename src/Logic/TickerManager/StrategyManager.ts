import logger from "../../Utils/logger";
import StrategyBase from "../Strategy/StrategyBase";
import VolumeAboveStrategy from "../Strategy/Volume_Above";
import TickerManager from "./TickerManager";

class StrategyManager {
  /* Strategies are here */
  private strategies: StrategyBase[] = [];

  /* Ticker and options ticker manager */
  private tickerManager = new TickerManager();

  public AddVolumeAboveStrategy(optionTicker: string) {
    this.tickerManager.AddOptionTicker(optionTicker);
    this.strategies.push(new VolumeAboveStrategy(optionTicker));
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
    console.log("StrategyManager::Tick() called!")
    this.tickerManager.Tick();

    this.strategies.forEach((elem) => elem.Tick());
  }
}

export default StrategyManager