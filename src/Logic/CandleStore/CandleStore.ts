import Candle from "../Candle";
import {TickerData, ChartDataType, CandleType} from "./CandleStore.d"

class CandleStore {  // Stores All tickerData in an object
  constructor() {
  }

  DataStore: TickerData[] = [{
    "ticker": "A",
    "chartData": {
      0: { "open": 0.1, "close": 0.2, "low":0.02, "high": 0.3, "volume": 10 },
      1: { "open": 0.1, "close": 0.2, "low":0.02, "high": 0.3, "volume": 10 },
      2: { "open": 0.1, "close": 0.2, "low":0.02, "high": 0.3, "volume": 10 },
    }
  },
  {
    "ticker": "B",
    "chartData": {
      0: { "open": 0.1, "close": 0.2, "low":0.02, "high": 0.3, "volume": 10 },
      1: { "open": 0.1, "close": 0.2, "low":0.02, "high": 0.3, "volume": 10 },
      2: { "open": 0.1, "close": 0.2, "low":0.02, "high": 0.3, "volume": 10 },
    }
  }];

  private _MergeTickerData(store: TickerData, add: TickerData) {
    var list = Object.keys(add.chartData)
    list.forEach(element => { 
      var item = store.chartData[+element]
      if ( item === undefined ) { // Add candle and store
        store.chartData[+element] = add.chartData[+element]
      }
    });
  }

  AddTickerDataByTicker(ticker: string, add:TickerData): boolean {
    const item: TickerData|undefined = this.GetTickerDataByTicker(ticker)
    if (item === undefined) { // Add new item
      this.DataStore.push(add)
      return false
    }
    
    this._MergeTickerData(item, add); // Merge old item with new data
    return true;
  }

  GetTickerDataByTicker(ticker2: String): TickerData|undefined {
    return this.DataStore.find((item) => ticker2 === item.ticker)
  }

  GetFirstCandleTimeStamp(ticker: string): number|undefined {
    return undefined;
  }
}

export default CandleStore;