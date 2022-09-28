import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Global from "../../Global/Global";
import closeDropDown from "../../Utils/closedropdown";
import logger from "../../Utils/logger";

export default function Settings() {
  const [fidelityKey, setFidelityKey] = useState<string>("");
  const [fidelityHost, setFidelityHost] = useState<string>("");
  const [yahooKey, setYahooKey] = useState<string>("");
  const [yahooHost, setYahooHost] = useState<string>("");
  const [optionChainLength, setOptionChainLength] = useState<number>(0);
  const [refreshInterval, setRefreshInterval] = useState<number>(0);

  const [volumeAlertValue, setVolumeAlertValue] = useState<number>(0);
  const [stochasticAlertValue, setStochasticAlertValue] = useState<number>(0);

  const [stochasticMinValue, setStochasticMinValue] = useState<number>(20);
  const [stochasticMaxValue, setStochasticMaxValue] = useState<number>(80);

  const [rsiMinValue, setRsiMinValue] = useState<number>(30);
  const [rsiMaxValue, setRsiMaxValue] = useState<number>(70);

  const [theme, setTheme] = useState<number>(1); // setTheme repaint 

  useEffect(() => {
    closeDropDown();
    loadData();
  }, []);

  const saveButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    Global.getInstance().getConstManager().setFidelityHost(fidelityHost)
    Global.getInstance().getConstManager().setFidelityKey(fidelityKey)
    Global.getInstance().getConstManager().setYahooHost(yahooHost)
    Global.getInstance().getConstManager().setYahooKey(yahooKey)

    Global.getInstance().getConstManager().setOptionChainLength(optionChainLength)
    Global.getInstance().getConstManager().setRefreshInterval(refreshInterval*1000)

    Global.getInstance().getConstManager().setVolumeAlertValue(volumeAlertValue)
    Global.getInstance().getConstManager().setStochasticAlertValue(stochasticAlertValue)

    Global.getInstance().getConstManager().setStochasticMaxValue(stochasticMaxValue)
    Global.getInstance().getConstManager().setStochasticMinValue(stochasticMinValue)
    Global.getInstance().getConstManager().setRsiMaxValue(rsiMaxValue)
    Global.getInstance().getConstManager().setRsiMinValue(rsiMinValue)

    //Global.getInstance().getConstManager().setThemeName(themeName)

    Global.getInstance().getConstManager().Backup()

    toast.info("Settings saved successfully.")
  }

  const loadButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    loadData()

    toast.info("Settings loaded successfully.")
  }

  const loadData = () => {
    Global.getInstance().getConstManager().Restore()

    setFidelityHost(Global.getInstance().getConstManager().getFidelityHost())
    setFidelityKey(Global.getInstance().getConstManager().getFidelityKey())
    setYahooHost(Global.getInstance().getConstManager().getYahooHost())
    setYahooKey(Global.getInstance().getConstManager().getYahooKey())

    setOptionChainLength(Global.getInstance().getConstManager().getOptionChainLength())
    setRefreshInterval(Global.getInstance().getConstManager().getRefreshInterval()/1000)

    setVolumeAlertValue(Global.getInstance().getConstManager().getVolumeAlertValue())
    setStochasticAlertValue(Global.getInstance().getConstManager().getStochasticAlertValue())

    // setThemeName(Global.getInstance().getConstManager().getThemeName())
  }

  const fidelityKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFidelityKey(e.target.value);
  };

  const fidelityHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFidelityHost(e.target.value);
  };

  const yahooKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYahooKey(e.target.value);
  };

  const yahooHostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYahooHost(e.target.value);
  };

  const optionChainLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = +e.target.value;
    if (value<6)
      value = 6;
    setOptionChainLength( value );
  };

  const refreshIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let interval = +e.target.value
    if (interval<1)
      interval = 1;
    if (interval>60*60)
      interval = 60*60;

    setRefreshInterval( interval );
  };

  const volumeAlertValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let interval = +e.target.value
    if (interval<1)
      interval = 1;

    setVolumeAlertValue( interval );
  };

  const stochasticAlertValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let interval = +e.target.value
    if (interval<1)
      interval = 1;
    if (interval>99)
      interval = 99
    setStochasticAlertValue( interval );
  };

  const stochasticMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let interval = +e.target.value
    if (interval<1)
      interval = 1;
    if (interval>99)
      interval = 99
    setStochasticMaxValue( interval );
  };

  const stochasticMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let interval = +e.target.value
    if (interval<1)
      interval = 1;
    if (interval>99)
      interval = 99
    setStochasticMinValue( interval );
  };

  const rsiMaxValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let interval = +e.target.value
    if (interval<1)
      interval = 1;
    if (interval>99)
      interval = 99
    setRsiMaxValue( interval );
  };

  const rsiMinValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let interval = +e.target.value
    if (interval<1)
      interval = 1;
    if (interval>99)
      interval = 99
    setRsiMinValue( interval );
  };

  const mySetTheme = (t: string) => {
    Global.getInstance().getThemeManager().setCurrentTheme(t);
    setTheme(theme+1)
  }

  return (
    <>
    <h1 className="text-2xl m-4">Global Settings</h1>

    <table className="table-auto w-full max-w-3xl"><tbody className="w-full max-w-3xl">
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label className="m-1">Fidelity API Key</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input type="text" className="bg-base-300 m-2 input input-md text-normal w-full max-w-xl" placeholder="Fidelity API key" value={fidelityKey} onChange={fidelityKeyChange} /></th>
      </tr>
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label className="m-1">Fidelity API Host</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input type="text" className="bg-base-300 m-2 input input-md text-normal w-full max-w-xl" placeholder="Fidelity API Host" value={fidelityHost} onChange={fidelityHostChange} /></th>
      </tr>

      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label className="m-1">Yahoo API Key</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input type="text" className="bg-base-300 m-2 input input-md text-normal w-full max-w-xl" placeholder="Yahoo API key" value={yahooKey} onChange={yahooKeyChange} /></th>
      </tr>
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label className="m-1">Yahoo API Host</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input type="text" className="bg-base-300 m-2 input input-md text-normal w-full max-w-xl" placeholder="Yahoo API Host" value={yahooHost} onChange={yahooHostChange} /></th>
      </tr>

      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label className="m-1">Option chain length</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input type="number" className="bg-base-300 m-2 input input-2xl w-24 text-normal" placeholder="Option chain length" value={optionChainLength} onChange={optionChainLengthChange} /> pcs</th>
      </tr>
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label className="m-1">Refresh interval</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input type="number" className="bg-base-300 m-2 input input-2xl w-24 text-normal" placeholder="Refresh interval" value={refreshInterval} onChange={refreshIntervalChange} /> sec</th>
      </tr>
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label className="m-1">Toggle dark/light theme</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg">
        {Global.getInstance().getThemeManager().getCurrentTheme() === "dark" && (<input type="checkbox" className="bg-base-300 m-2 w-12 toggle toggle-secondary" checked onChange={() => mySetTheme("corporate")} />)}
        {Global.getInstance().getThemeManager().getCurrentTheme() !== "dark" && (<input type="checkbox" className="bg-base-300 m-2 w-12 toggle toggle-secondary" onChange={() => mySetTheme("dark")} />)}
        </th>
      </tr>
      </tbody></table>


      <h1 className="text-2xl m-4">Green bar strategy settings</h1>

      <table className="table-auto w-full max-w-3xl"><tbody className="w-full max-w-3xl">
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label tabIndex={0} className="m-1">Volume alert value</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input tabIndex={0} type="number" className="bg-base-300 m-2 input w-24 input-2xl text-normal" placeholder="Volume alert value" value={volumeAlertValue} onChange={volumeAlertValueChange} /></th>
      </tr>
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label tabIndex={1} className="m-1">Stochastic alert value</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input tabIndex={1} type="number" className="bg-base-300 m-2 input w-24 input-2xl text-normal" placeholder="Stochastic Alert Value" value={stochasticAlertValue} onChange={stochasticAlertValueChange} /></th>
      </tr>
      </tbody></table>

      <h1 className="text-2xl m-4">RSI Stochastic strategy settings</h1>

      <table className="table-auto w-full max-w-3xl"><tbody className="w-full max-w-3xl">
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label tabIndex={0} className="m-1">RSI below alert value</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input tabIndex={0} type="number" className="bg-base-300 m-2 input w-24 input-2xl text-normal" placeholder="Volume alert value" value={rsiMinValue} onChange={rsiMinValueChange} /></th>
      </tr>
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label tabIndex={0} className="m-1">RSI above alert value</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input tabIndex={0} type="number" className="bg-base-300 m-2 input w-24 input-2xl text-normal" placeholder="Volume alert value" value={rsiMaxValue} onChange={rsiMaxValueChange} /></th>
      </tr>
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label tabIndex={0} className="m-1">Stochastic below alert value</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input tabIndex={0} type="number" className="bg-base-300 m-2 input w-24 input-2xl text-normal" placeholder="Volume alert value" value={stochasticMinValue} onChange={stochasticMinValueChange} /></th>
      </tr>
      <tr>
        <th align= "left" className="m-1 w-20 max-w-lg"><label tabIndex={0} className="m-1">Stochastic above alert value</label></th>
        <th align= "left" className="m-1 w-20 max-w-lg"><input tabIndex={0} type="number" className="bg-base-300 m-2 input w-24 input-2xl text-normal" placeholder="Volume alert value" value={stochasticMaxValue} onChange={stochasticMaxValueChange} /></th>
      </tr>
      </tbody></table>

      <button onClick={saveButtonHandler} className="btn w-full my-4 btn-primary">Save settings</button>
      <button onClick={loadButtonHandler} className="btn w-full my-4 btn-primary">Reload settings</button>
    </>
  );
}
