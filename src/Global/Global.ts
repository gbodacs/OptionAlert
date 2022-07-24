import CandleStore from "../Logic/Stores/CandleStore";
import IndicatorStore from "../Logic/Stores/IndicatorStore";
import AlertManager from "../Alert/AlertManager";


export default class Global {
  private static instance: Global;
  private candleStore: CandleStore;
  private indicatorStore: IndicatorStore;
  private alertManager: AlertManager;

  private volumeMin = 1000;
  private stochasticUnder = 20;
  private optionTicker = "SPY220722P00385000" // Yahoo option ticker
// private optionTicker = "SPY220722P385" // Fidelity option ticker
  private underlyingTicker = "SPY"

  private constructor() {
    this.candleStore = new CandleStore();
    this.indicatorStore = new IndicatorStore();
    this.alertManager = new AlertManager();
  }

  public static getInstance(): Global { // For singleton behavior
      if (!Global.instance) {
        Global.instance = new Global();
      }

      return Global.instance;
  }

  public getVolumeMin(): number {
    return this.volumeMin;
  }

  public getStochasticUnder(): number {
    return this.stochasticUnder;
  }

  public getOptionTicker(): string {
    return this.optionTicker;
  }

  public getUnderlyingTicker(): string {
    return this.underlyingTicker;
  }

  public getCandleStore() {return this.candleStore;}
  public getIndicatorStore() {return this.indicatorStore;}
  public getAlertManager() {return this.alertManager;}
}