interface IntradayData {
  open: number[];
  close: number[];
  high: number[];
  low: number[];
  volume: number[];
  timestamp: number[];
}

abstract class Intraday {
  abstract GetIntradayData(ticker: string, start: number, end: number): void;
}

export { Intraday, type IntradayData };
