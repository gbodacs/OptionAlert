import React from "react";
import { useEffect, useState } from "react";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { toast } from "react-toastify";
import closeDropDown from "../../Utils/closedropdown";
import { getTimestampStringEST } from "../../Utils/timedate";
import { FaTrash, FaInfoCircle } from "react-icons/fa";

function AlertList() {
  const [update, setUpdate] = useState<number>(1);

  const tick = () => {
    logger.info("--- AlertList::tick called()!")
    Global.getInstance().getStrategyManager().Tick();

    setTimeout(() => {
      tick();
      setUpdate(update+1);
    }, Global.getInstance().getConstManager().getRefreshInterval());
  }

  useEffect(() => {
    closeDropDown();
    tick(); // Start the timer here!
  }, []);

  const deleteButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    Global.getInstance().getAlertManager().removeAlert(+event.currentTarget.value)
    setUpdate(update-1);
  }

  return (
    <>
    <h1 className="text-2xl m-4">Alert list</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Option</th>
              <th>Strategy</th>
              <th>Info</th>
              <th>Time</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Global.getInstance().getAlertManager().getAlertItems().map((item, index) => (
                <tr className="hover" key={index}>
                  <td>{item.optionTicker}</td>
                  <td>{item.strategyName}</td>
                  <td><div className="tooltip tooltip-bottom" data-tip={item.extraText}>
                        <FaInfoCircle />
                      </div></td>
                  <td>{getTimestampStringEST(item.timestamp)}</td>
                  <td><button className="btn btn-md bg-base-300" onClick={deleteButtonHandler} value={index}><FaTrash /></button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}


export default AlertList