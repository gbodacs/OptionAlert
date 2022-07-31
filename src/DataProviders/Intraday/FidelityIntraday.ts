import {Intraday, IntradayData} from "./Intraday";
import axios from "axios";
import { AxiosResponse } from "axios";
import { OptionChain, OptionChainData } from "../OptionChain/OptionChain";
import logger from "../../Utils/logger"
import { XMLParser, XMLValidator} from "fast-xml-parser";
import { ServerResponse } from "http";
import Global from "../../Global/Global";

class FidelityIntraday implements Intraday {
  toFidelityTimeDateFormat(timestamp: number):string {
    // startDate: '2020/02/27-09:30:00',
    const d = new Date(timestamp*1000);
    return d.getFullYear()+"/"+(d.getMonth()+1).toString().padStart(2 ,"0")+"/"+d.getDate().toString().padStart(2 ,"0")+"-"+d.getHours().toString().padStart(2 ,"0")+":"+d.getMinutes().toString().padStart(2 ,"0")+":"+d.getSeconds().toString().padStart(2 ,"0");
  }

  toFidelityTickerFormat(ticker: string): string {
    if (ticker.length > 10)
      return "-"+ticker // probably an option ticker?
    return "."+ticker // probably a non-option ticker?
  }

  toExplodedArray(in2: string): number[] {
    const temp: string[] = in2.split(" ");
    const ret: number[] = [];
    for (const o of temp) ret.push( Number(o) );
    return ret;
  }

  async GetIntradayData(ticker: string, start: number, end: number): Promise<IntradayData|undefined> {
    // Ez igy az egesz napot visszaadja, hiaba egy kis darabot kerek belole
    const options = {
      method: 'GET',
      url: 'https://fidelity-investments.p.rapidapi.com/quotes/get-chart',
      params: {
        symbol: this.toFidelityTickerFormat(ticker),
        startDate: this.toFidelityTimeDateFormat(start),
        endDate: this.toFidelityTimeDateFormat(end),
        intraday: 'Y',
        granularity: '1'
      },
      transformResponse: (res: ServerResponse) => {
        return res;
    },
      headers: {
        'X-RapidAPI-Key': Global.getInstance().getConstManager().getFidelityKey(),
        'X-RapidAPI-Host': Global.getInstance().getConstManager().getFidelityHost()
      },
    };

    try {
      const resp: AxiosResponse = await axios.request(options);
      const parser = new XMLParser();
      const valid = XMLValidator.validate(resp.data);
      if (valid !== true) {
        throw new Error("Invalid XML returned from Fidelity")
      }
      const respObj = parser.parse(resp.data);

      if (respObj.Chart.Symbol.Error !== undefined)
      {
        throw new Error("Error: " + respObj.Chart.Symbol.Error.TEXT + " Ticker: "+respObj.Chart.Symbol.IDENTIFIER);
      }

      if (resp.status === 200) {
        const ret: IntradayData = {
          timestamp: this.toExplodedArray(respObj.Chart.Symbol.TIMESTAMPS),
          close: this.toExplodedArray(respObj.Chart.Symbol.VALUES.CLOSE),
          open: this.toExplodedArray(respObj.Chart.Symbol.VALUES.OPEN),
          low: this.toExplodedArray(respObj.Chart.Symbol.VALUES.LOW),
          high: this.toExplodedArray(respObj.Chart.Symbol.VALUES.HIGH),
          volume: this.toExplodedArray(respObj.Chart.Symbol.VALUES.VOLUME),
        }
        return ret;
      };
      throw new Error("Error: Fidelity response status is not 200 - " + resp.toString());
    } catch (error) {
      let message
      if (error instanceof Error) message = error.message
      else message = String(error)
      logger.error("Error getting Fidelity intraday chart data: " + message);
      return;
    }
  }
}

export default FidelityIntraday