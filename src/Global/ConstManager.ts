
export default class ConstManager {
  private volumeMin = 1000;
  private stochasticUnder = 20;
  private optionChainLength = 10;
  private refreshInterval = 10000; // 20 sec refresh
//
  private fidelityKey = "xxxxx"
  private fidelityHost = "xxxxx"

  private yahooKey = "xxxxx"
  private yahooHost = "xxxxx"

  public getVolumeMin(): number {return this.volumeMin;}

  public getRefreshInterval(): number {return this.refreshInterval;}

  public getOptionChainLength(): number {return this.optionChainLength;}
  public getStochasticUnder(): number {return this.stochasticUnder;}

  public getFidelityKey(): string {return this.fidelityKey;}
  public getFidelityHost(): string {return this.fidelityHost;}

  public getYahooKey(): string {return this.yahooKey;}
  public getYahooHost(): string {return this.yahooHost;}
}