import logger from "./logger";

export function getCurrTimeEST() {
  const newYorkDateTimeStr = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  return new Date(newYorkDateTimeStr);
}

export function getTimestampStringEST(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString("en-US", { timeZone: "America/New_York" })
}

export function getUnderlyingTickerFromOptionsTicker(optick: string):string {
  if (optick === "") {
    logger.error("StrategyBase - option ticker is empty!")
    return optick; // not found, error!
  }

  if (optick.length < 5)
    return optick; // this is not an option ticker

  let pos = optick.search("2"); // good till 2029-12-31 :D
  if (pos === -1){
    logger.error("StrategyBase - cannot convert option ticker to underlying ticker!")
    return optick; // not found, error!
  }
  return optick.slice(0, pos);
}