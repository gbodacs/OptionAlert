import { CandleData, CandleType } from "./CandleStoreTypes";

class CandleStore {
  // Stores All tickerData in an object
  DataStore: CandleData[] = [];
    /*{
      ticker: "A",
      chartData: [
        { open: 0.1, close: 0.2, low: 0.02, high: 0.3, volume: 10, timestamp: 11 },
        { open: 0.1, close: 0.2, low: 0.02, high: 0.3, volume: 10, timestamp: 11 },
        { open: 0.1, close: 0.2, low: 0.02, high: 0.3, volume: 10, timestamp: 11 },
      ],
    }, ...*/

  private TimestampPresent(ticker: string, timestamp: number): boolean {
    const item: CandleData | undefined = this.GetTickerDataByTicker(ticker);
    if (item === undefined)
      return false;

    const chartData:CandleType[] = item.chartData;
    if (chartData === undefined)
      return false

    const found = chartData.find( (element:CandleType) => element.timestamp === timestamp)
    if (found === undefined)
      return false
    return true;
  }

  AddTickerDataByTicker(ticker: string, open: number[], close: number[], low: number[], high: number[], volume: number[], timestamp: number[]): boolean {
    const item: CandleData | undefined = this.GetTickerDataByTicker(ticker);
    if (item === undefined) {
      // Add new item
      // Add element to DataStore
      const chartData2: CandleType[] = [];
      for (let i = 0; i < open.length; i++) {
        chartData2.push({
          open: open[i], close: close[i], low: low[i], high: high[i], volume: volume[i], timestamp: timestamp[i],
        });

        this.DataStore.push({
          "ticker": ticker,
          "chartData": chartData2,
        });
      }
      return true;
    } else {
      // Ticker already present, add new data to it
      const candleData: CandleType[] = item.chartData;
      for (let i = 0; i < open.length; i++) {
        if (this.TimestampPresent(ticker, timestamp[i]))
          continue;

        candleData.push({open: open[i], close: close[i], low: low[i], high: high[i], volume: volume[i], timestamp: timestamp[i] });
      }
    }
    return true;
  }

  GetTickerDataByTicker(ticker2: string): CandleData | undefined {
    return this.DataStore.find((item) => ticker2 === item.ticker);
  }
}

export default CandleStore;
