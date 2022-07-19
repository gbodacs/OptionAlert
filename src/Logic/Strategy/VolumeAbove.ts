import StrategyBase from './StrategyBase'
import Candle from '../Candle'

class VolumeAboveStrategy extends StrategyBase{
  constructor() {
    super();

  }

  InitWithHistoricalData(): boolean {

    return true;
  }

  AddCandle(data: Candle): void {

  }
}

export default VolumeAboveStrategy;