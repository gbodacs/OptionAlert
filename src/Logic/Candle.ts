
class Candle {
  Open: number;
  Close: number;
  High: number;
  Low: number;
  Timestamp: number;

  constructor(open: number, close: number, high: number, low: number, timestamp: number) {
    this.Open = open;
    this.Close = close;
    this.High = high;
    this.Low = low;
    this.Timestamp = timestamp;
  }

}

export default Candle;