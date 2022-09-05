export interface CandleType {  // Contains one candle
  open: number;
  close: number;
  low: number;
  high: number;
  volume: number;
  timestamp:number;
}

export interface TickerData { // Stores all data for one ticker
  ticker: String;
  chartData: CandleType[] // An array of candles with timestamp
}