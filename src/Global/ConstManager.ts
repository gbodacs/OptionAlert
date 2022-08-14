
interface SaveData  {
  yahooKey:string,
  yahooHost: string,
  fidelityKey: string,
  fidelityHost: string,
  optionChainLen: number,
  refreshInterval: number
  OptionVolumeStrategy:{
    volumeAlertValue: number,
    stochasticAlertValue: number
  }
}

export default class ConstManager {
  constructor() {
    this.Restore()
  }
  
  private constManagerName = "ConstManager"

  private volumeAlertValue = 1000;
  private stochasticAlertValue = 20;
  private optionChainLength = 10;
  private refreshInterval = 20000; // 20 sec refresh
//
  private fidelityKey = "dfa5a6ee0amsh91e2a8f071665a8p155928jsn1d6b32ec48d3"
  private fidelityHost = "fidelity-investments.p.rapidapi.com"

  private yahooKey = "dfa5a6ee0amsh91e2a8f071665a8p155928jsn1d6b32ec48d3"
  private yahooHost = "yahoo-finance97.p.rapidapi.com"

  // Globals
  public getRefreshInterval(): number {return this.refreshInterval;}
  public getOptionChainLength(): number {return this.optionChainLength;}
  public getFidelityKey(): string {return this.fidelityKey;}
  public getFidelityHost(): string {return this.fidelityHost;}
  public getYahooKey(): string {return this.yahooKey;}
  public getYahooHost(): string {return this.yahooHost;}

  public setRefreshInterval(i: number) {this.refreshInterval = i} // in millisecond
  public setOptionChainLength(i: number) {this.optionChainLength = i}
  public setFidelityKey(i: string) {this.fidelityKey = i}
  public setFidelityHost(i: string) {this.fidelityHost = i}
  public setYahooKey(i: string) {this.yahooKey = i}
  public setYahooHost(i: string) {this.yahooHost = i}

  // VolumeAlert Strategy
  public getVolumeAlertValue(): number {return this.volumeAlertValue;}
  public getStochasticAlertValue(): number {return this.stochasticAlertValue;}

  public setVolumeAlertValue(i: number) {this.volumeAlertValue = i}
  public setStochasticAlertValue(i: number) {this.stochasticAlertValue = i}


  Backup() {
    let saveData: SaveData = {
      yahooKey: "",
      yahooHost: "",
      fidelityKey: "",
      fidelityHost: "",
      optionChainLen: 10,
      refreshInterval: 60000,
      OptionVolumeStrategy: {
        volumeAlertValue: 1000,
        stochasticAlertValue: 20
      }
    };

    saveData.yahooHost = this.yahooHost
    saveData.yahooKey = this.yahooKey
    saveData.fidelityHost = this.fidelityHost
    saveData.fidelityKey = this.fidelityKey
    saveData.optionChainLen = this.optionChainLength
    saveData.refreshInterval = this.refreshInterval
    saveData.OptionVolumeStrategy.volumeAlertValue = this.volumeAlertValue
    saveData.OptionVolumeStrategy.stochasticAlertValue = this.stochasticAlertValue
    
    localStorage.setItem(this.constManagerName, JSON.stringify(saveData))
  }

  Restore() {
    let loadData: SaveData = {
      yahooKey: "",
      yahooHost: "",
      fidelityKey: "",
      fidelityHost: "",
      optionChainLen: 10,
      refreshInterval: 60000,
      OptionVolumeStrategy: {
        volumeAlertValue: 1000,
        stochasticAlertValue: 20
      }
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
      this.setStochasticAlertValue(loadData.OptionVolumeStrategy.stochasticAlertValue)
      this.setVolumeAlertValue(loadData.OptionVolumeStrategy.volumeAlertValue)
    }
  }
}