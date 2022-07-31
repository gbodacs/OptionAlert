
export default class ConstManager {
  private volumeMin = 1000;
  private stochasticUnder = 20;
//
  private fidelityKey = "xxxxx"
  private fidelityHost = "xxxxx"

  public getVolumeMin(): number {return this.volumeMin;}

  public getStochasticUnder(): number {return this.stochasticUnder;}

  public getFidelityKey(): string {return this.fidelityKey;}
  public getFidelityHost(): string {return this.fidelityHost;}
}