import YahooOptionChain from "./OptionAlert/DataProviders/OptionChain/YahooOptionChain";
import YahooIntraday from "./OptionAlert/DataProviders/Intraday/YahooIntraday";
import FidelityIntraday from "./OptionAlert/DataProviders/Intraday/FidelityIntraday";
import logger from "./utils/logger";
import Global from "./OptionAlert/Global/Global"
import VolumeAboveStrategy from "./OptionAlert/Logic/Strategy/VolumeAbove"
import VwapAboveStrategy from "./OptionAlert/Logic/Strategy/VwapUnder";


const OP_TICKER = "SPY220722P385"
const UN_TICKER = "SPY"

class OptionAlertHandler {
  constructor() {}

  /* Create Strategies */
  volStrategy: VolumeAboveStrategy = new VolumeAboveStrategy(OP_TICKER);
  vwapStrategy: VwapAboveStrategy = new VwapAboveStrategy(OP_TICKER);

  /* Create API call classes */
  yoc = new YahooOptionChain();
  yid = new FidelityIntraday();

  /* Current day date init */
  currTime = 1658138003  // Todo: remove test time and date

async init() {
  logger.info(`Init - Start`);

  /* Get Option Chain */
  const optionChain = await this.yoc.GetOptionChainElements(UN_TICKER);
  if (optionChain === undefined)
    return; // todo failed
  logger.info(optionChain.toString());
}

async main() {
    /* Get Intraday info */
  const intraDay = await this.yid.GetIntradayData(OP_TICKER, this.currTime, this.currTime+200);
  if(intraDay === undefined)
    return;
  if(intraDay.timestamp === undefined)
    return; // todo market closed? report fail

  Global.getInstance().getCandleStore().AddTickerDataByTicker(OP_TICKER, intraDay.open, intraDay.close, intraDay.low, intraDay.high, intraDay.volume, intraDay.timestamp );
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
