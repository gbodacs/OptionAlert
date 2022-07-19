import axios from "axios";
import {AxiosResponse} from "axios";
import { OptionChain, OptionChainData } from "./OptionChain";



 class YahooOptionChain implements OptionChain{
  async Init():Promise<boolean> {

    return false;
  }

  async GetOptionChainElements(ticker: string): Promise<OptionChainData[]> {
    const options = {
      method: "GET",
      url: "https://query1.finance.yahoo.com/v7/finance/options/" + ticker,
    };
  
    try {
      const response: Promise<AxiosResponse<any,any>> = await axios.request(options);
  
      symbol = response.data.optionChain.result[0].underlyingSymbol;
      name = response.data.optionChain.result[0].quote.longName;
      bid = response.data.optionChain.result[0].quote.bid;
      ask = response.data.optionChain.result[0].quote.ask;
      dates = response.data.optionChain.result[0].expirationDates;
  
      const CallOptions = response.data.optionChain.result[0].options[0].calls;
      const PutOptions = response.data.optionChain.result[0].options[0].puts;
  
      return { call: CallOptions, put: PutOptions };
  
      //const strikes = response.data.optionChain.result[0].strikes;
    } catch (error) {
      console.error("Error getting option chain");
      console.error(error);
      return { call: [], put: [] };
    }
  }
}

export default YahooOptionChain


/**/
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


let k = 0;

export const search = async (location: string) => {

  // call hotels4 locations/v2/search endpoint
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://hotels4.p.rapidapi.com/locations/v2/search',
    headers: {
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
      'X-RapidAPI-Key': "sdgfsdgsdgf98s",
    },
    params: {
      locale: 'en_US',
      currency: 'USD',
      query: location
    }
  }

  let resp: AxiosResponse = await axios.request(options);
  if (resp.status == 429) {
    k++;
    resp = await axios.request(options);
  }
  return resp;
}
/**/