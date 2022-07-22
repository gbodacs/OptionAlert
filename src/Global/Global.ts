import CandleStore from "../Logic/CandleStore/CandleStore";

// const SECURITY = "SPY";
// const STRIKE_PRICE_LOW = 385;
// const STRIKE_PRICE_HIGH = 385;

export const VOLUME_MIN = 1000;
export const STOCHASTIC_UNDER = 20;

export default class Global {
  private static instance: Global;
  private candleStore: CandleStore;

  private constructor() {
    this.candleStore = new CandleStore();
  }

  public static getInstance(): Global {
      if (!Global.instance) {
        Global.instance = new Global();
      }

      return Global.instance;
  }

  public getCandleStore() {return this.candleStore;}
}