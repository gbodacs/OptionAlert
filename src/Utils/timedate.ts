import logger from "./logger";

export function getCurrTimeEST() {
  const newYorkDateTimeStr = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  return new Date(newYorkDateTimeStr);
}

export function getTimestampStringEST(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleString("en-US", { timeZone: "America/New_York" })
}

export function getUnderlyingTickerFromOptionsTicker(opTick: string):string {
  if (opTick === "") {
    logger.error("getUnderlyingTickerFromOptionsTicker - option ticker is empty!")
    return opTick; // not found, error!
  }

  if (opTick.length < 5)
    return opTick; // this is not an option ticker

  let pos = opTick.search("2"); // good till 2029-12-31 :D
  if (pos === -1){
    logger.error("getUnderlyingTickerFromOptionsTicker - cannot convert option ticker to underlying ticker!")
    return opTick; // not found, error!
  }
  return opTick.slice(0, pos);
}