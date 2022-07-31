import CandleStore from "../Logic/Stores/CandleStore";
import IndicatorStore from "../Logic/Stores/IndicatorStore";
import AlertManager from "../Alert/AlertManager";
import ConstManager from "./ConstManager"
import TickerManager from "../Logic/TickerManager/TickerManager";


export default class Global {
  private static instance: Global;
  private candleStore: CandleStore;
  private indicatorStore: IndicatorStore;
  private alertManager: AlertManager;
  private constManager: ConstManager;
  private tickerManager: TickerManager;

  private constructor() {
    this.candleStore = new CandleStore();
    this.indicatorStore = new IndicatorStore();
    this.alertManager = new AlertManager();
    this.constManager = new ConstManager();
    this.tickerManager = new TickerManager();
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
  public getTickerManager() {return this.tickerManager;}
}