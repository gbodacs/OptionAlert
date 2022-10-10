import logger from "../Utils/logger";

interface SaveData  {
  yahooKey:string,
  yahooHost: string,
  fidelityKey: string,
  fidelityHost: string,
  optionChainLen: number,
  refreshInterval: number,
  theme:string,
  GreenBarStrategy: {
    volumeAlertValue: number,
    stochasticAlertValue: number,
  },
  RsiStochStrategy: {
    RsiMaxValue: number,
    RsiMinValue: number,
    StochasticMaxValue:number,
    StochasticMinValue:number,
  },
}

export default class ConstManager {
  constructor() {
    this.Restore()
  }

  /*
  DO NOT SAVE PROPERTIES!
   */
  public Version = "0.1.3"
  private isReleaseVersion = false;
  /*
  DO NOT SAVE PROPERTIES!
   */

  private constManagerName = "ConstManager"

  // Green Bar strategy
  private volumeAlertValue = 1000;
  private stochasticAlertValue = 20;

  // RSI Stochastic strategy
  private rsiMinValue = 30;
  private rsiMaxValue = 70;
  private stochasticMinValue = 20;
  private stochasticMaxValue = 80;

  private themeName1 = "dark";

  private optionChainLength = 10;
  private refreshInterval = 20000; // 20 sec refresh
//
  private fidelityKey = ""
  private fidelityHost = ""

  private yahooKey = ""
  private yahooHost = ""  

  // Globals
  public getRefreshInterval(): number {return this.refreshInterval;}
  public getOptionChainLength(): number {return this.optionChainLength;}
  public getFidelityKey(): string {return this.fidelityKey;}
  public getFidelityHost(): string {return this.fidelityHost;}
  public getYahooKey(): string {return this.yahooKey;}
  public getYahooHost(): string {return this.yahooHost;}
  public getThemeName(): string {return this.themeName1;}
  public getIsReleaseVersion() {return this.isReleaseVersion}

  public setRefreshInterval(i: number) {this.refreshInterval = i} // in millisecond
  public setOptionChainLength(i: number) {this.optionChainLength = i}
  public setFidelityKey(i: string) {this.fidelityKey = i}
  public setFidelityHost(i: string) {this.fidelityHost = i}
  public setYahooKey(i: string) {this.yahooKey = i}
  public setThemeName(i: string) {this.themeName1 = i;document.getElementsByTagName('html')[0].setAttribute('data-theme', i)}
  public setYahooHost(i: string) {this.yahooHost = i}


  // Green Bar Strategy
  public getVolumeAlertValue(): number {return this.volumeAlertValue;}
  public getStochasticAlertValue(): number {return this.stochasticAlertValue;}

  public setVolumeAlertValue(i: number) {this.volumeAlertValue = i}
  public setStochasticAlertValue(i: number) {this.stochasticAlertValue = i}

  // RSI Stochastic Strategy
  public getStochasticMaxValue(): number {return this.stochasticMaxValue;}
  public getStochasticMinValue(): number {return this.stochasticMinValue;}
  public getRsiMaxValue(): number {return this.rsiMaxValue;}
  public getRsiMinValue(): number {return this.rsiMinValue;}

  public setRsiMaxValue(i: number) {this.rsiMaxValue = i}
  public setRsiMinValue(i: number) {this.rsiMinValue = i}
  public setStochasticMaxValue(i: number) {this.stochasticMaxValue = i}
  public setStochasticMinValue(i: number) {this.stochasticMinValue = i}


  Backup() {
    const saveData: SaveData = {
      "yahooKey": "",
      "yahooHost": "",
      "fidelityKey": "",
      "fidelityHost": "",
      "optionChainLen": 10,
      "refreshInterval": 60000,
      "theme": "dark",
      "GreenBarStrategy": {
        "volumeAlertValue": 1000,
        "stochasticAlertValue": 20
      },
      "RsiStochStrategy": {
        "RsiMaxValue": 70,
        "RsiMinValue": 30,
        "StochasticMaxValue": 80,
        "StochasticMinValue": 20,
      },
    };

    saveData.yahooHost = this.yahooHost
    saveData.yahooKey = this.yahooKey
    saveData.fidelityHost = this.fidelityHost
    saveData.fidelityKey = this.fidelityKey
    saveData.optionChainLen = this.optionChainLength
    saveData.refreshInterval = this.refreshInterval
    saveData.theme = this.themeName1
    saveData.GreenBarStrategy.volumeAlertValue = this.volumeAlertValue
    saveData.GreenBarStrategy.stochasticAlertValue = this.stochasticAlertValue
    saveData.RsiStochStrategy.RsiMaxValue = this.rsiMaxValue
    saveData.RsiStochStrategy.RsiMinValue = this.rsiMinValue
    saveData.RsiStochStrategy.StochasticMaxValue = this.stochasticMaxValue
    saveData.RsiStochStrategy.StochasticMinValue = this.stochasticMinValue
    
    localStorage.setItem(this.constManagerName, JSON.stringify(saveData))
  }

  Restore() {
    let loadData: SaveData = {
      "yahooKey": "",
      "yahooHost": "",
      "fidelityKey": "",
      "fidelityHost": "",
      "optionChainLen": 10,
      "refreshInterval": 60000,
      "theme": "dark",
      "GreenBarStrategy": {
        "volumeAlertValue": 1000,
        "stochasticAlertValue": 20
      },
      "RsiStochStrategy": {
        "RsiMaxValue": 70,
        "RsiMinValue": 30,
        "StochasticMaxValue": 80,
        "StochasticMinValue": 20,
       },
    };

    const itemFromStorage = localStorage.getItem(this.constManagerName)
    if (itemFromStorage) {
      loadData = JSON.parse(itemFromStorage)
      this.setFidelityHost(loadData.fidelityHost)
      this.setFidelityKey(loadData.fidelityKey)
      this.setYahooHost(loadData.yahooHost)
      this.setYahooKey(loadData.yahooKey)
      this.setOptionChainLength(loadData.optionChainLen)
      this.setRefreshInterval(loadData.refreshInterval)
      this.setStochasticAlertValue(loadData.GreenBarStrategy.stochasticAlertValue)
      this.setVolumeAlertValue(loadData.GreenBarStrategy.volumeAlertValue)
      this.setRsiMaxValue(loadData.RsiStochStrategy.RsiMaxValue)
      this.setRsiMinValue(loadData.RsiStochStrategy.RsiMinValue)
      this.setStochasticMaxValue(loadData.RsiStochStrategy.StochasticMaxValue)
      this.setStochasticMinValue(loadData.RsiStochStrategy.StochasticMinValue)
      this.setThemeName(loadData.theme)
    }
  }
}
/*
  private fidelityHost = "fidelity-investments.p.rapidapi.com"
  private Key = "dfa5a6ee0amsh91e2a8f071665a8p155928jsn1d6b32ec48d3"
  private yahooHost = "yahoo-finance97.p.rapidapi.com"
  */