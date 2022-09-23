import logger from "../../Utils/logger";
import Global from "../../Global/Global";
import YahooOptionChain from "../../DataProviders/OptionChain/YahooOptionChain";
import YahooIntraday from "../../DataProviders/Intraday/YahooIntraday";
import FidelityIntraday from "../../DataProviders/Intraday/FidelityIntraday";

import { getCurrTimeEST, getUnderlyingTickerFromOptionsTicker } from "../../Utils/timedate";
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

  async getOptionChain(ticker: string, expiration: string): Promise<OptionChainData | undefined> {
    /* Get Option Chain */
    const optionChain = await this.optionChain.GetOptionChainElements(ticker, expiration);
    if (optionChain === undefined) {
      return undefined;
    }
    return optionChain;
  }

  private AddTicker(t: string): void {
    if (this.Tickers.indexOf(t) === -1) {
      this.Tickers.push(t);
      logger.info("TickerManager - Ticker added:"+t)
    }
  }

  public AddOptionTicker(t: string): void {
    if (this.OptionTickers.indexOf(t) === -1) {
      this.OptionTickers.push(t);
      logger.info("TickerManager - OptionTicker added:"+t)
    }
    this.AddTicker(getUnderlyingTickerFromOptionsTicker(t))
  }

  async ApiCallTick(ticker: string, currTime: number) {
    /* Get Intraday info */
    logger.info("TickerManager-APICallTick with: "+ticker)

    const intraDay = await this.optionIntraday.GetIntradayData(ticker, this.lastGetTime, currTime);
    if (intraDay === undefined) {
      logger.error("TickerManager-Intraday response is empty:"+ticker);
      return;
    }

    if (intraDay.timestamp === undefined) {
      logger.error("TickerManager-Could not get intraday chart data - market closed?");
      return; // todo market closed? report fail
    }

    logger.info("TickerManager-Data downloaded successfully, adding to the store:"+ticker)
    Global.getInstance().getCandleStore().AddTickerDataByTicker(ticker, intraDay.open,intraDay.close,intraDay.low,intraDay.high,intraDay.volume,intraDay.timestamp );
  }

  async Tick() {
    /* Set current time */
    const tempTime = getCurrTimeEST().getTime() / 1000;

    const ret: Promise<void>[] = [];

    /* Refresh every Ticker data in the DataStore */
    this.Tickers.forEach((tick) => {
      ret.push( this.ApiCallTick(tick, tempTime))
    })

    /* Refresh every OptionTicker data in the DataStore */
    this.OptionTickers.forEach((tick) => {
      ret.push( this.ApiCallTick(tick, tempTime))
    })

    logger.info("Downloading intraday data started...")
    await Promise.all(ret)
    logger.info("Downloading intraday data ready.")

    this.lastGetTime = tempTime;
  }
}

export default TickerManager