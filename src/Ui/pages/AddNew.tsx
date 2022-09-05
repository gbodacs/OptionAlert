import React from "react";
import { useEffect, useState } from "react";
import { OptionInfo } from "../../DataProviders/OptionChain/OptionChain";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import {toast} from "react-toastify"
import closeDropDown from "../../Utils/closedropdown";

function AddNew() {
  const [ticker, setTicker] = useState<string>("");
  const [expiration, setExpiration] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [callChain, setCallChain] = useState<OptionInfo[]>([]);
  const [putChain, setPutChain] = useState<OptionInfo[]>([]);

  useEffect( () => {
    closeDropDown();
  }, [])

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Global.getInstance().getConstManager().getFidelityHost() === "") {
      toast("Go to settings and fill the required fields.")
    }

    setTicker(e.target.value.toUpperCase());
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiration(e.target.value);
  };

  const addButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    Global.getInstance().getStrategyManager().AddGreenBarStrategy(option);
    toast.info(option+" Added")
  }

  const searchCallInTheMoneyIndex = (calls: OptionInfo[]): number => {
    for(let i=0; i<calls.length; i++) {
      if (calls[i].inTheMoney===false) { 
        i = i-Global.getInstance().getConstManager().getOptionChainLength()/2;
        if (i<0) i=0;
        return i;
      }
    }

    return Math.round(calls.length/2);
  }

  const searchPutInTheMoneyIndex = (puts: OptionInfo[]): number => {
    for(let i=0; i<puts.length; i++) {
      if (puts[i].inTheMoney===true) { 
        i = i-Global.getInstance().getConstManager().getOptionChainLength()/2;
        if (i<0) i=0;
        return i;
      }
    }

    return Math.round(puts.length/2);
  }

  const expirationButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setCallChain([])
    setPutChain([])
    setOption("")

    const ret = await Global.getInstance().getStrategyManager().getTickerManager().getOptionChain(ticker, expiration);
    if (ret === undefined) {
      logger.error("Unable to download option chain!");
      toast.error("Unable to download option chain!")
      return;
    }

    const callIndex = searchCallInTheMoneyIndex(ret.calls);
    const putIndex = searchPutInTheMoneyIndex(ret.puts);
    const calls:OptionInfo[] = [];
    const puts:OptionInfo[] = [];
    
    for (let i=callIndex; i<callIndex+Global.getInstance().getConstManager().getOptionChainLength(); i++) {
      if (i<ret.calls.length)
        calls.push(ret.calls[i])
    }

    for (let i=putIndex; i<putIndex+Global.getInstance().getConstManager().getOptionChainLength(); i++) {
      if (i<ret.puts.length)
        puts.push(ret.puts[i])
    }

    setCallChain(calls);
    setPutChain(puts);
  };

  const handlePutSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    const i = event.currentTarget.value;
    setOption(putChain[i].contractSymbol)

    closeDropDown();
  };

  const handleCallSelect = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();

    const i = event.currentTarget.value;
    setOption(callChain[i].contractSymbol)

    closeDropDown();
  };

  const renderExpiration:boolean = ticker !== "";
  const renderOptions:boolean = (putChain.length>0 && callChain.length>0);
  const renderStrategy:boolean = option !== "";

  return (
    <>
      <h1 className="text-2xl m-4">Select underlying</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
        <div className="relative">
          <input type="text" className="w-full pr-40 bg-base-300 input input-md text-lg" placeholder="Underlying ticker" value={ticker} onChange={handleTickerChange} />
        </div>
      </div>

      { renderExpiration && (
        <div>
        <h1 className="text-2xl m-4">Select expiration date</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
          <div className="relative">
            <input type="date" className="w-full pr-40 bg-base-300 input input-md text-lg" placeholder="Search" value={expiration} onChange={handleExpirationChange} />
            <button type="button" onClick={expirationButtonHandler} className="absolute top-0 right-0 rounded-l-none w-36 btn btn-md">
              Go
            </button>
          </div>
        </div>
        </div>
      )}
          
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

      {renderStrategy /*todo add strategy list */ && (
        <div>
        <h1 className="text-2xl m-4">Select strategy</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
          <div className="relative">
          <select className="select w-full max-w-lg bg-base-300">
            <option selected>Green bar</option>
            <option disabled>VWAP under 20</option>
            <option >RSI Stochastic</option>
          </select>
          </div>
        </div>
        <button onClick={addButtonHandler} className="btn w-full btn-primary">Add</button>
      </div>
      )}
    </>
  );
}

export default AddNew;

// When the Stochastic hits 20 or below and the RSI hits 30 or below, send an alert.  Both conditions must be met.  Volume not relevant.
// When the Stochastic hits 80 or Above and the RSI hits 70 or above, send an alert.  Both conditions must be met.  Volume not relevant.