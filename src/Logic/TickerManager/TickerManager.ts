import logger from "../../Utils/logger";
import Global from "../../Global/Global";
import YahooOptionChain from "../../DataProviders/OptionChain/YahooOptionChain";
import YahooIntraday from "../../DataProviders/Intraday/YahooIntraday";
import FidelityIntraday from "../../DataProviders/Intraday/FidelityIntraday";

import { getCurrTimeEST } from "../../Utils/timedate";
import { OptionChainData } from "../../DataProviders/OptionChain/OptionChain";

class TickerManager {
  /* Ticker stores */
  Tickers: string[] = []; // Default tickers
  OptionTickers: string[] = []; // Option Tickers

  /* Current day date init */
  lastGetTime = 0;

  /* Create API call classes */
  optionChain = new YahooOptionChain();
  optionIntraday = new FidelityIntraday();

  constructor() {
    const tempDate = getCurrTimeEST();
    tempDate.setHours(9, 0, 0, 0);
    this.lastGetTime = tempDate.getTime() / 1000; // Set start time to today - 9:00am
  }

  async getOptionChain(ticker: string): Promise<OptionChainData | undefined> {
    /* Get Option Chain */
    const optionChain = await this.optionChain.GetOptionChainElements(ticker);
    if (optionChain === undefined) {
      return undefined;
    }
    return optionChain;
  }

  AddTicker(t: string): void {
    if (this.Tickers.indexOf(t) === -1) {
      this.Tickers.push(t);
    }
  }

  AddOptionTicker(t: string): void {
    if (this.OptionTickers.indexOf(t) === -1) {
      this.OptionTickers.push(t);
    } // todo: add automatic AddTicker() from first 3 chars
  }

  async ApiCallTick(ticker: string, currTime: number) {
    /* Get Intraday info */
    const intraDay = await this.optionIntraday.GetIntradayData(ticker, this.lastGetTime, currTime);
    if (intraDay === undefined) {
      logger.error("Intraday response is empty.");
      return;
    }

    if (intraDay.timestamp === undefined) {
      logger.error("Could not get intraday chart data - market closed?");
      return; // todo market closed? report fail
    }

    Global.getInstance().getCandleStore().AddTickerDataByTicker(ticker, intraDay.open,intraDay.close,intraDay.low,intraDay.high,intraDay.volume,intraDay.timestamp );
  }

  Tick(): void {
    /* Set current time */
    const tempTime = getCurrTimeEST().getTime() / 1000;

    /* Refresh every Ticker data in the DataStore */
    this.Tickers.forEach((tick) => {
      this.ApiCallTick(tick, tempTime)
    });

    /* Refresh every OptionTicker data in the DataStore */
    this.OptionTickers.forEach((tick) => {
      this.ApiCallTick(tick, tempTime)
    });

    this.lastGetTime = tempTime;
  }
}

export default TickerManager;
