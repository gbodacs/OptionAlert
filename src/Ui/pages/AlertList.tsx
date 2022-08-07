import React from "react";
import { useEffect, useState } from "react";
import Global from "../../Global/Global";
import logger from "../../Utils/logger";
import { FaPen } from "react-icons/fa";
import VolumeAboveStrategy from "../../Logic/Strategy/VolumeAbove";
import closeDropDown from "../../Utils/closedropdown";

function AlertList() {
  const [ticker, setTicker] = useState<string>("");

  useEffect( () => {
    closeDropDown();
  }, [])
  
  const refreshListItems = () => {
    // Global.getInstance().getAlertManager().Alert;
    console.log("refreshListItems called!");
    //setTimeout( () => { refreshListItems() }, 3000)
  };

  const editButtonHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  useEffect(() => {
    //refreshListItems();
    console.log("refreshListItems called!");
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Underlying</th>
              <th>Option</th>
              <th>Strategy</th>
              <th>Alert</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {Global.getInstance().getStrategyManager().getStrategy().map((item, index) => (
                <tr className="hover" key={index}>
                  <th>{item.getUnderlyingTicker()}</th>
                  <td>{item.getOptionTicker()}</td>
                  <td>{item.getStrategyName()}</td>
                  <td>-</td>
                  <td><button className="btn btn-md bg-base-200" onClick={editButtonHandler}><FaPen /></button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AlertList;
