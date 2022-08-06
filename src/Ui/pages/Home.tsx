import axios, { AxiosError } from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { OptionInfo } from "../../DataProviders/OptionChain/OptionChain";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
//import ListViewBasic from "../components/ListViewBasic"

function Home() {
  const [ticker, setTicker] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [callChain, setCallChain] = useState<OptionInfo[]>([]);
  const [putChain, setPutChain] = useState<OptionInfo[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
  };

  const tickerButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const ret = await Global.getInstance().getTickerManager().getOptionChain(ticker);
    if (ret === undefined) {
      logger.error("Cannot get option chain!");
      // todo: Alert(
      return;
    }

    ret.calls = ret.calls.filter((item, index) => {
      if (index > ret.calls.length * 0.45 && index < ret.calls.length * 0.55) {
        return true;
      } else {
        return false;
      }
    });

    ret.puts = ret.puts.filter((item, index) => {
      if (index > ret.puts.length * 0.45 && index < ret.puts.length * 0.55) {
        return true;
      } else {
        return false;
      }
    });

    setCallChain(ret.calls);
    setPutChain(ret.puts);

    setShowOptions(true);
    // console.log(JSON.stringify(callChain[0].contractSymbol));
    // console.log(JSON.stringify(putChain[0].contractSymbol));
  };

  const optionButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <h1 className="text-2xl mb-4">Select ticker and options</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
        <div>
          <div className="form-control">
            <div className="relative">
              <input type="text" className="w-full pr-40 bg-base-300 input input-lg text-normal" placeholder="Search" value={ticker} onChange={handleTickerChange} />
              <button type="button" onClick={tickerButtonHandler} className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg">
                Go
              </button>
            </div>
            {showOptions && (
              <div className="relative">
                <div className="dropdown">
                  <label tabIndex={0} className="btn m-1">
                    Calls
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {callChain.map((item, index) => (
                      <li key={index}>
                        <a>{item.contractSymbol}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dropdown">
                  <label tabIndex={0} className="btn m-1">
                    Puts
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {putChain.map((item, index) => (
                      <li key={index}>
                        <a>{item.contractSymbol}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
