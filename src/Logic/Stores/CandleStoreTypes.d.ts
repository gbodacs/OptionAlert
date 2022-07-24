export interface CandleType {  // Contains one candle
  open: number;
  close: number;
  low: number;
  high: number;
  volume: number;
  timestamp:number;
}

export interface CandleData { // Stores all data for one ticker
  ticker: string;
  chartData: CandleType[] // An array of candles with timestamp
}