export type CandleType = {  // Contains one candle
  open: number;
  close: number;
  low: number
  high: number
  volume: number
}

export type ChartDataType = { //Helper type
  [timestamp:number]: CandleType;
}

export type TickerData = { // Stores all data for one ticker
  ticker: String;
  chartData: ChartDataType // An associative array of candles with timestamp
}