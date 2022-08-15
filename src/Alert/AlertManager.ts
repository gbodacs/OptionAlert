import logger from "../Utils/logger";
import { getUnderlyingTickerFromOptionsTicker } from "../Utils/timedate";
import AlertItem from "./AlertItem";
import {toast} from "react-toastify"

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
      console.log("alert added");
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

    let out: string = strategy + " alert!";
    if (underlyingTicker !== "") out += " Underlyingticker: " + underlyingTicker;
    if (optionTicker !== "") out += " OptionTicker: " + optionTicker;
    if (text !== "") out += " " + text;

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
