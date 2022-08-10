
class AlertItem {
  constructor(underlyingTicker: string, optionTicker: string, strategyName: string, timestamp: number, text: string) {
    this.strategyName = strategyName;
    this.underlyingTicker = underlyingTicker;
    this.optionTicker = optionTicker;
    this.timestamp = timestamp;
    this.extraText = text;
  }
  
  strategyName: string = "";
  underlyingTicker: string = "";
  optionTicker: string = "";
  timestamp: number = 0;
  extraText: string = "";
}

export default AlertItem;