export interface OptionChainData {
  underlyingSymbol: string;
  underlyingLongName?: string;
  underlyingBid: number;
  underlyingAsk: number;
  calls: string[];
  puts: string[];
  expirationDates: number[];
  strikes: number[];
};

export abstract class OptionChain {
  // abstract Init(): Promise<boolean>;
  abstract GetOptionChainElements(ticker: string): Promise<OptionChainData|undefined>;
}
