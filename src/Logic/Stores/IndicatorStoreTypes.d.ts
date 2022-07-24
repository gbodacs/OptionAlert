export interface IndicatorType {  // Contains one indicator value
  ivalue:number;
  timestamp:number;
}

export interface IndicatorData { // Stores all data for one ticker and one indicator
  tickerName: string;
  indicatorName: string;
  dataValues: IndicatorType[] // An array of candles with timestamp
}