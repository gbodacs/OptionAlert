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

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value);
  };

  const addButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    
  }

  const tickerButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setCallChain([])
    setPutChain([])
    setOption("")

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
  };

  const handlePutSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    const i = event.currentTarget.value;
    setOption(callChain[i].contractSymbol)

    if (document!==null) { // Close the UL list
      if (document.activeElement != document.body) (document.activeElement as HTMLElement).blur();
    }
  };

  const handleCallSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    const i = event.currentTarget.value;
    setOption(callChain[i].contractSymbol)

    if (document!==null) { // Close the UL list
      if (document.activeElement != document.body) (document.activeElement as HTMLElement).blur();
    }
  };

  const renderOptions:boolean = (putChain.length>0 && callChain.length>0);
  const renderStrategy:boolean = option !== "";

  return (
    <>
      <h1 className="text-2xl m-4">Select underlying</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
        <div className="relative">
          <input type="text" className="w-full pr-40 bg-base-300 input input-md text-lg" placeholder="Search" value={ticker} onChange={handleTickerChange} />
          <button type="button" onClick={tickerButtonHandler} className="absolute top-0 right-0 rounded-l-none w-36 btn btn-md">
            Go
          </button>
        </div>
      </div>
          
          { renderOptions && (
            <div>
            <h1 className="text-2xl m-4">Select option</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
              <div className="relative">
                <div className="dropdown dropdown-right">
                  <label tabIndex={0} className="btn m-1">
                    Calls
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                    {callChain.map((item, index) => (
                      <li value={index} key={index} onClick={handleCallSelect}>
                        <a>{item.contractSymbol}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dropdown dropdown-right">
                  <label tabIndex={0} className="btn m-1">
                    Puts
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
                    {putChain.map((item, index) => (
                      <li value={index} key={index} onClick={handlePutSelect}>
                        <a>{item.contractSymbol}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <input readOnly tabIndex={0} type="text" className="bg-base-300 m-1 input input-xl text-normal" placeholder="Select call or put option" value={option} />
              </div>
            </div>
          </div>)}

          {renderStrategy && (
            <div>
            <h1 className="text-2xl m-4">Select strategy</h1>
            <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
              <div className="relative">
              <select className="select w-full max-w-lg bg-base-300">
                <option selected>Josh SPY option volume</option>
                <option disabled>Josh other strategy</option>
                <option disabled>Josh another strategy</option>
              </select>
              </div>
            </div>
            <button onClick={addButtonHandler} className="btn w-full btn-primary">Add</button>
          </div>
          )}
    </>
  );
}

export default Home;
