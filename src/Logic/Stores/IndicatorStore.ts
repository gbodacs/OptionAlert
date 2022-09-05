import logger from "../../Utils/logger";
import {IndicatorData, IndicatorType} from "./IndicatorStoreTypes"

class IndicatorStore {

  DataStore: IndicatorData[] = []

  private TimestampPresent(tickerName: string, indicatorName: string, timestamp: number): boolean {
    const item: IndicatorData | undefined = this.GetIndicatorDataByName(tickerName, indicatorName);
    if (item === undefined)
      return false;

    const indData2:IndicatorType[] = item.dataValues;
    if (indData2 === undefined)
      return false

    const found = indData2.find( (element:IndicatorType) => element.timestamp === timestamp)
    if (found === undefined)
      return false
    return true;
  }

  public AddIndicatorDataByTicker(tickerName: string, indicatorName: string, ivalue2:number[], timestamp: number[]): boolean {
    if (ivalue2.length !== timestamp.length) {
      logger.error("AddIndicatorDataByTicker - value.len != timestamp.len")
      return false;
    }

    const item: IndicatorData | undefined = this.GetIndicatorDataByName(tickerName, indicatorName);
    if (item === undefined) {
      // Add new item
      // Add element to DataStore
      const indData2: IndicatorType[] = [];
      for (let i = 0; i < ivalue2.length; i++) {
        indData2.push({
          ivalue:ivalue2[i], timestamp: timestamp[i],
        });

        this.DataStore.push({
          "tickerName": tickerName,
          "indicatorName": indicatorName,
          "dataValues": indData2,
        });
      }
      return true;
    } else {
      // Ticker already present, add new data to it
      const inData: IndicatorType[] = item.dataValues;
      for (let i = 0; i < timestamp.length; i++) {
        if (this.TimestampPresent(tickerName, indicatorName, timestamp[i]))
          continue;

          inData.push({ ivalue: ivalue2[i], timestamp: timestamp[i] });
      }
    }
    return true;
  }

  private GetIndicatorDataByName(ticker2: string, indicator2:string): IndicatorData | undefined {
    return this.DataStore.find((item) => ticker2 === item.tickerName && indicator2 === item.indicatorName);
  }
}

export default IndicatorStore