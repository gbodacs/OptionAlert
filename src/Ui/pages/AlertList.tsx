import React from "react";
import { useEffect, useState } from "react";
import { OptionInfo } from "../../DataProviders/OptionChain/OptionChain";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { toast } from "react-toastify";
import closeDropDown from "../../Utils/closedropdown";
import { getTimestampStringEST } from "../../Utils/timedate";
import { FaRecycle, FaTrash } from "react-icons/fa";

function AlertList() {
  const [ticker, setTicker] = useState<string>("");

  useEffect(() => {
    closeDropDown();
    Global.getInstance().getStrategyManager().Tick(); // Start the timer here!
  }, []);

  const deleteButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // todo: delete alertline!
  }

  return (
    <>
    <h1 className="text-2xl m-4">Alert list</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Underlying</th>
              <th>Option</th>
              <th>Strategy</th>
              <th>Alert</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Global.getInstance().getAlertManager().getAlertItems().map((item, index) => (
                <tr className="hover" key={index}>
                  <th>{item.underlyingTicker}</th>
                  <td>{item.optionTicker}</td>
                  <td>{item.strategyName}</td>
                  <td>{getTimestampStringEST(item.timestamp)}</td>
                  <td><button className="btn btn-md bg-base-200" onClick={deleteButtonHandler}><FaTrash /></button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


export default AlertList