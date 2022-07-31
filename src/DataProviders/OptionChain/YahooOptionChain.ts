import axios from "axios";
import { AxiosResponse } from "axios";
import logger from "../../Utils/logger";
import { OptionChain, OptionChainData } from "./OptionChain";

class YahooOptionChain implements OptionChain {
  async GetOptionChainElements(ticker: string): Promise<OptionChainData | undefined> {
    const options = {
      method: "GET",
      url: "https://query1.finance.yahoo.com/v7/finance/options/" + ticker,
      headers: { 
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    };

    logger.info(JSON.stringify(options));

    try {
      const resp: AxiosResponse = await axios.request(options);
      if (resp.data.optionChain.error !== null) {
        throw new Error("Error: " + resp.data.optionChain.error);
      }

      if (resp.data.optionChain.result[0].expirationDates.length === 0 || resp.data.optionChain.result[0].strikes.length === 0) {
        throw new Error("Error: no option on this ticker: " + ticker);
      }

      if (resp.status === 200) {
        const ret: OptionChainData = {
          underlyingSymbol: resp.data.optionChain.result[0].underlyingSymbol,
          underlyingLongName: resp.data.optionChain.result[0].quote.longName,
          underlyingBid: resp.data.optionChain.result[0].quote.bid,
          underlyingAsk: resp.data.optionChain.result[0].quote.ask,
          expirationDates: resp.data.optionChain.result[0].expirationDates,
          strikes: resp.data.optionChain.result[0].strikes,
          calls: resp.data.optionChain.result[0].options[0].calls,
          puts: resp.data.optionChain.result[0].options[0].puts,
          
        };
        return ret;
      } else {
        throw new Error("Error: resp.status!=200 resp:" + resp.toString());
      }
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      logger.error("Error getting option chain:" + message);
      return undefined;
    }
  }
}

export default YahooOptionChain;
