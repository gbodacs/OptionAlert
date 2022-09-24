import logger from "../Utils/logger";
import { getUnderlyingTickerFromOptionsTicker } from "../Utils/timedate";
import AlertItem from "./AlertItem";
import {toast} from "react-toastify"
import Global from "../Global/Global";
import { CandleData, CandleType } from "../Logic/Stores/CandleStoreTypes";

class AlertManager {
  protected toEmail: boolean = false;
  protected toConsole: boolean = true;
  protected toNotification: boolean = false;
  protected alertItems: AlertItem[] = [];

  constructor (email: boolean, console: boolean, notification: boolean) {
    this.toEmail = email;
    this.toConsole = console;
    this.toNotification = notification;
  }

  public getAlertItems() {
    return this.alertItems;
  }

  private addItemToList(underlyingTicker: string, optionTicker: string, strategy: string, timestamp: number, text: string) {
    const ret = this.alertItems.find((item) => {
      if (item.strategyName === strategy && item.optionTicker === optionTicker && item.underlyingTicker === underlyingTicker && item.timestamp === timestamp) {
        return true;
      } else {
        return false;
      }
    });

    if (ret === undefined) {
      logger.info("alert added");
      this.alertItems.push(new AlertItem(underlyingTicker, optionTicker, strategy, timestamp, text));
      return true;
    }

    return false;
  }

  public removeAlert(idx: number) {
    this.alertItems.splice(idx,1)
  }

  public addAlert(optionTicker: string, strategy: string, timestamp:number, text: string) {
    const underlyingTicker = getUnderlyingTickerFromOptionsTicker(optionTicker);
    if (! this.addItemToList(underlyingTicker, optionTicker, strategy, timestamp, text) )
      return; // Already added to the list

    let out: string = strategy + " alert!"; // Add strategy name to alert text

    if (optionTicker !== "") out += " OptionTicker: " + optionTicker;  // Add option ticker to alert text

    {
      if (underlyingTicker !== "") { // Add Underlying ticker + value to alert text
        out += " Underlyingticker: " + underlyingTicker;
        const cd2: CandleData | undefined = Global.getInstance().getCandleStore().GetTickerDataByTicker(underlyingTicker);
        if (cd2 !== undefined) {
          const item = cd2.chartData.find( (item) => item.timestamp === timestamp)
          if (item !== undefined) {
            out += " value is: " + item.close;
          }
        }
      }
    }

    if (text !== "") out += " " + text; // Add extra text to alert text

    if (this.toConsole) {
      logger.info(out);
    }

    if (this.toEmail) {
      // todo: email send
    }

    if (this.toNotification) {
      toast.info(out)
    }
  }
}

export default AlertManager;
