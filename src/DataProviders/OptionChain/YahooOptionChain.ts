import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { OptionChain, OptionChainData } from "./OptionChain";
import { postApiCall } from "../GetApiCall";
import { ServerResponse } from "http";

class YahooOptionChain implements OptionChain {
  async GetOptionChainElements(ticker: string, expiration: string): Promise<OptionChainData | undefined> {
    const encodedParams = new URLSearchParams();
    encodedParams.append("symbol", ticker);
    encodedParams.append("date", expiration);

    const options = {
      method: "POST",
      url: "https://yahoo-finance97.p.rapidapi.com/option-chain",
      transformResponse: (res: ServerResponse) => {
        return res;
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": Global.getInstance().getConstManager().getYahooKey(),
        "X-RapidAPI-Host": Global.getInstance().getConstManager().getYahooHost(),
      },
      body: encodedParams,
    };

    try {
      const res = await postApiCall(options.url, options, 5, 1000);
      const data:any = await res.data.json();

      if (res.status === 200) {
        const ret: OptionChainData = {
          calls: data.data.optioncalls,
          puts: data.data.optionputs,
        };
        return ret;
      } else {
        throw new Error("Error: resp.status!=200 resp:" + res.statusText);
      }
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      logger.error("Error getting Yahoo option chain:" + message);
      return undefined;
    }
  }

  /*async GetOptionChainElements2(ticker: string): Promise<OptionChainData | undefined> {
    const options = {
      method: "GET",
      url: "https://query1.finance.yahoo.com/v7/finance/options/" + ticker,
      mode: "no-cors", // Yahoo finance is a very old API without cors
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
  }*/
}

export default YahooOptionChain;
