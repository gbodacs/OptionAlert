import { OptionChain, OptionChainData } from "./OptionChain";



 class YahooOptionChain implements OptionChain{
  async Init():Promise<boolean> {

    return false;
  }

  GetOptionChainElements(): OptionChainData[] {

  }
}

export default YahooOptionChain
