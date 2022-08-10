import CandleStore from "../Logic/Stores/CandleStore";
import IndicatorStore from "../Logic/Stores/IndicatorStore";
import AlertManager from "../Alert/AlertManager";
import ConstManager from "./ConstManager"
import StrategyManager from "../Logic/TickerManager/StrategyManager";


export default class Global {
  private static instance: Global;
  private candleStore: CandleStore;
  private indicatorStore: IndicatorStore;
  private alertManager: AlertManager;
  private constManager: ConstManager;
  private strategyManager: StrategyManager;

  private constructor() {
    this.candleStore = new CandleStore();
    this.indicatorStore = new IndicatorStore();
    this.alertManager = new AlertManager(false, true, true);
    this.constManager = new ConstManager();
    this.strategyManager = new StrategyManager();
  }

  public static getInstance(): Global { // For singleton behavior
      if (!Global.instance) {
        Global.instance = new Global();
      }
      return Global.instance;
  }

  public getConstManager() {return this.constManager;}
  public getCandleStore() {return this.candleStore;}
  public getIndicatorStore() {return this.indicatorStore;}
  public getAlertManager() {return this.alertManager;}
  public getStrategyManager() {return this.strategyManager;}
}