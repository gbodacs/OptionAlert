import YahooOptionChain from "./OptionAlert/DataProviders/OptionChain/YahooOptionChain";
import YahooIntraday from "./OptionAlert/DataProviders/Intraday/YahooIntraday";
import FidelityIntraday from "./OptionAlert/DataProviders/Intraday/FidelityIntraday";
import logger from "./utils/logger";
import Global from "./OptionAlert/Global/Global"
import VolumeAboveStrategy from "./OptionAlert/Logic/Strategy/VolumeAbove"
import VwapAboveStrategy from "./OptionAlert/Logic/Strategy/VwapUnder";

class OptionAlertHandler {
  /* Create Strategies */
  volStrategy: VolumeAboveStrategy = new VolumeAboveStrategy(Global.getInstance().getOptionTicker());
  vwapStrategy: VwapAboveStrategy = new VwapAboveStrategy(Global.getInstance().getOptionTicker());

  /* Create API call classes */
  optionChain = new YahooOptionChain();
  optionIntraday = new YahooIntraday();

  /* Current day date init */
  currTime = 1658138003  // Todo: remove test time and date

async init() {
  logger.info(`Init - Start`);

  /* Get Option Chain */
  const optionChain = await this.optionChain.GetOptionChainElements(Global.getInstance().getUnderlyingTicker());
  if (optionChain === undefined)
    return; // todo failed
  logger.info(optionChain.toString());
}

async main() {
    /* Get Intraday info */
  const intraDay = await this.optionIntraday.GetIntradayData(Global.getInstance().getOptionTicker(), this.currTime, this.currTime+200);
  if(intraDay === undefined) {
    logger.warning("Response is undefined.")
    return;
  }
  if(intraDay.timestamp === undefined) {
    logger.warning("No value in response. Market closed and Yahoo input?")
    return; // todo market closed? report fail
  }

  Global.getInstance().getCandleStore().AddTickerDataByTicker(Global.getInstance().getOptionTicker(), intraDay.open, intraDay.close, intraDay.low, intraDay.high, intraDay.volume, intraDay.timestamp );
  // const LastTicker:number = intraDay.timestamp[intraDay.timestamp.length-1];

  this.volStrategy.Tick();
  this.vwapStrategy.Tick();

  this.currTime = this.currTime+200

  setTimeout(() => {
    this.main();
  }, 2000);
}
}

const o = new OptionAlertHandler()
o.init();
o.main();
