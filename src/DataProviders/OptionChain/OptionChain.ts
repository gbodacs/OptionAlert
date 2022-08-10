export interface OptionInfo {
  ask: number;
  bid:number;
  contractSymbol: string;
  impliedVolatility: number;
  lastPrice: number;
  strike: number;
  volume: number;
  inTheMoney: boolean;
}

export interface OptionChainData {
  calls: OptionInfo[];
  puts: OptionInfo[];
};

export abstract class OptionChain {
  // abstract Init(): Promise<boolean>;
  abstract GetOptionChainElements(ticker: string): Promise<OptionChainData|undefined>;
}
