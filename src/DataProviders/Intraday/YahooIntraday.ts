import Intraday from "./Intraday";
import axios from "axios"

class YahooIntraday implements Intraday {
  async GetIntradayData(ticker: string): Promise<void> {
      const options = {
        method: "GET",
        url: "https://query1.finance.yahoo.com/v8/finance/chart/"+ticker,
        params: {
          //period1: toTimestamp('07/13/2022 13:55:00'),//"2022/07/13-09:00:00", // todo: start of the day moment
          //period2: toTimestamp('07/13/2022 14:30:00'),//"2022/07/13-11:10:00",  // todo: current moment
          StartDateInclusive: '2022-07-12',
          EndDateInclusive: '2022-07-13',
          interval: "1m",
          includePrePost: "true",
        }
      };
    
      try {
        response = await axios.request(options);
        if (response.data.chart.error) {
          throw new Error(response.data.chart.error)
        }
    
        timestamp = response.data.chart.result[0].timestamp;
        quote = response.data.chart.result[0].indicators.quote[0];
        quote['timestamp'] = [...timestamp];
        quote['identifier'] = ticker;
        return quote;
      } catch (error) {
        console.error("Unable to download chart data");
        console.error(error);
        return {};
      }
    }
  }
}