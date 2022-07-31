import logger from "../Utils/logger"

export interface VwapInput {
  volume: number,
  price: number,
}

export function Vwap(inputData: VwapInput[]):number[] {
  try {
    const p: number[] = [];
    const temp: VwapInput[] = [];
    // create vwap for every value, not just the last one
    for (let i = 0; i < inputData.length; i++) {
      temp[i] = inputData[i];
      // Calculate vwap
      const i1 = temp.reduce((prev, curr) => prev + curr.volume * curr.price, 0);
      const i2 = temp.reduce((prev, curr) => prev + curr.volume, 0);
      p[i] = i1 / i2 || 0;
    }
    return p;
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)
    logger.error("Cannot calculate vwap" + message);
    return [];
  }
}

module.exports = { Vwap };
