const opens = [
  10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11, 10, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11, 10,
];
const closes = [
  10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11, 10, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11, 10,
];
const lows = [
  10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 13, 17, 16, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11, 10,
];
const highs = [
  10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11, 10, 10, 11, 12, 13, 12, 11, 10, 11, 12, 13, 14, 15, 16, 17, 16, 15, 14, 13, 12, 11, 10,
];

class SlowST {
  constructor(period: number) {
    this.period = period;
  }
  period: number;

  _getLow(index: number): number {
    if (index < (this.period-1)) return 0;
    let min = 9999999;
    for (let i = 0; i < this.period; i++) {
      const idx = index+1 - this.period + i;
      if (lows[idx] < min) min = lows[idx];
    }

    if (min === 9999999) return 0;

    return min;
  }

  _getHigh(index: number): number {
    if (index < (this.period-1)) return 0;
    let max = -9999999;
    for (let i = 0; i < this.period; i++) {
      const idx = index+1 - this.period + i;
      if (highs[idx] > max) max = highs[idx];
    }

    if (max === -9999999) return 0;

    return max;
  }

  Tick(): void {
    let stoch = [];

    for (let i = 0; i < opens.length; i++) {
      const CurrPrice = closes[i];
      const PeriodLowPrice = this._getLow(i);
      const PeriodHighPrice = this._getHigh(i);

      console.log("Serie: "+i.toString() + " Low: "+PeriodLowPrice.toString() + " High: "+PeriodHighPrice.toString() );
      stoch[i] = (CurrPrice-PeriodLowPrice)/(PeriodHighPrice-PeriodLowPrice)*100;
    }

    console.log(stoch);
  }
}

const p = new SlowST(14);
p.Tick();
