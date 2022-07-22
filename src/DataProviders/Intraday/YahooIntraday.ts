import {Intraday, IntradayData} from "./Intraday";
import axios from "axios";
import { AxiosResponse } from "axios";
import { OptionChain, OptionChainData } from "../OptionChain/OptionChain";
import logger from "../../../utils/logger"

class YahooIntraday implements Intraday {
  toTimestamp(strDate: string):string {
    const ret = (Date.parse(strDate)/1000);
    return ret.toString();
  }

  async GetIntradayData(ticker: string, start: number, end: number): Promise<IntradayData|undefined> {
    // Ez igy az egesz napot visszaadja, hiaba egy kis darabot kerek belole
    const options = {
      method: "GET",
      url: "https://query1.finance.yahoo.com/v8/finance/chart/" + ticker,
      params: {
        period1: start.toString(),
        period2: end.toString(),
        interval: "1m",
        range: "1d",
        includePrePost: "true",
      },
    };

    try {
      const resp: AxiosResponse = await axios.request(options);
      if (resp.data.chart.error !== null) {
        throw new Error("Error: " + resp.data.chart.error);
      }
      if (resp.status === 200) {
        const ret: IntradayData = {
          timestamp: resp.data.chart.result[0].timestamp,
          close: resp.data.chart.result[0].indicators.quote[0].close,
          open: resp.data.chart.result[0].indicators.quote[0].open,
          low: resp.data.chart.result[0].indicators.quote[0].low,
          high: resp.data.chart.result[0].indicators.quote[0].high,
          volume: resp.data.chart.result[0].indicators.quote[0].volume
        }
        return ret;
      };
      throw new Error("Error: resp.status!=200 resp:" + resp.toString());
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      logger.error("Error getting chart data: " + message);
      return;
    }
  }
}

export default YahooIntraday