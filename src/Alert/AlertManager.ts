import logger from "../Utils/logger";

class AlertManager {
  email: boolean = false;
  console: boolean = true;
  notification: boolean = false;

  InitAlert(email: boolean, console: boolean, notification: boolean) {
    this.email = email;
    this.console = console;
    this.notification = notification;
  }

  Alert(ticker: string, strategy: string, text: string) {
    const out: string = strategy+" alert! Ticker: "+ticker+". "+text;
    if (this.console) {
      logger.info(out);
    }

    if (this.email) {
      // todo: email send
    }

    if (this.notification) {
      // todo: notification
    }
  }
}

export default AlertManager