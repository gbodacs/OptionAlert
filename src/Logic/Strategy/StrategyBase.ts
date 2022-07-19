import Candle from '../Candle' 

abstract class StrategyBase {
  constructor(){}

  abstract InitWithHistoricalData(): boolean;
  abstract AddCandle(data: Candle): void;
}

export default StrategyBase;