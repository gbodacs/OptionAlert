// import logger from "../Utils/logger";

export default class UiConstManager {
  private numberOfAlerts: number = 0;

  getNumberOfAlerts(): number {
    return this.numberOfAlerts;
  }
  addNumberOfAlerts(i: number) {
    this.numberOfAlerts += i;
  }
  resetNumberOfAlerts() {
    this.numberOfAlerts = 0;
  }
}
