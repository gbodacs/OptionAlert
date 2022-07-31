import axios, { AxiosError } from "axios";
import { useState } from "react";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";

function Home() {
  const [ticker, setTicker] = useState<string>("");
  const [chain, setChain] = useState<object | undefined>(undefined);
  const baseURL = "https://query1.finance.yahoo.com/v7/finance/options/spx";
  //const baseURL = "https://jsonplaceholder.typicode.com/posts/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault();

    const ret = await Global.getInstance().getTickerManager().getOptionChain(ticker);
    if (ret === undefined) {
      logger.error("Cannot get option chain!");
      // todo: Alert(
    }
    setChain(ret);
    

  }

  return (
    <>
      <h1 className="text-2xl mb-4">Select ticker and options</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="relative">
                <input type="text" className="w-full pr-40 bg-base-300 input input-lg text-normal" placeholder="Search" value={ticker} onChange={handleChange} />
                <button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                  Go
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
