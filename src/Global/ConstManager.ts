
export default class ConstManager {
  private volumeMin = 1000;
  private stochasticUnder = 20;
//  private optionTicker = "SPY220729P00385000" // Yahoo option ticker
  private optionTicker = "SPY220729P385" // Fidelity option ticker
  private underlyingTicker = "SPY"
  private fidelityKey = "xxxxx"
  private fidelityHost = "xxxxx"

  public getVolumeMin(): number {return this.volumeMin;}

  public getStochasticUnder(): number {return this.stochasticUnder;}

  public getOptionTicker(): string {return this.optionTicker;}

  public getUnderlyingTicker(): string {return this.underlyingTicker;}

  public getFidelityKey(): string {return this.fidelityKey;}
  public getFidelityHost(): string {return this.fidelityHost;}
}