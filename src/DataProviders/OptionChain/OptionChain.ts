export type OptionChainData = {
  Ticker: string[],
  ExpirationDate: Date[],
  Strike: number[]
}

export abstract class OptionChain {
  abstract Init(): Promise<boolean>;
  abstract GetOptionChainElements(): OptionChainData[];
}