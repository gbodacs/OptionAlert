import React from "react";
import { useEffect, useState } from "react";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { FaTrash } from "react-icons/fa";
import VolumeAboveStrategy from "../../Logic/Strategy/VolumeAbove";
import closeDropDown from "../../Utils/closedropdown";

function WatchList() {
  const [update, setUpdate] = useState<number>(1);

  useEffect( () => {
    closeDropDown();
  }, [])
  
  const removeButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    Global.getInstance().getStrategyManager().removeStrategy(+event.currentTarget.value)
    setUpdate(update-1);
  }

  return (
    <>
      <h1 className="text-2xl m-4">Watchlist</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Underlying</th>
              <th>Option</th>
              <th>Strategy</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Global.getInstance().getStrategyManager().getStrategy().map((item, index) => (
                <tr className="hover" key={index}>
                  <th>{item.getUnderlyingTicker()}</th>
                  <td>{item.getOptionTicker()}</td>
                  <td>{item.getStrategyName()}</td>
                  <td><button className="btn btn-md bg-base-200" onClick={removeButtonHandler} value={index}><FaTrash /></button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
