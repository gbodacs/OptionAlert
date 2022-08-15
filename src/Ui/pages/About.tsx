import React, { useEffect } from "react";
import {useNavigate, useLocation} from "react-router-dom"
import Global from "../../Global/Global";
import closeDropDown from "../../Utils/closedropdown";

export default function About() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    closeDropDown();
  }, []);

  return (
    <div className="card w-96 bg-base-300 shadow-xl m-8">
      <div className="card-body">
        <h2 className="card-title">Option Alert</h2>
        <p>This program sends an alarm when an event that meets the set alarm conditions occurs.</p>
        <p><b>Developer:</b> AppVagance</p>
        <p><b>Version:</b> {Global.getInstance().getConstManager().Version}</p>
        <div className="card-actions justify-evenly mt-4">
          <button className="btn btn-primary" onClick={() => navigate("/settings")}>Settings</button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Add new alert</button>
        </div>
      </div>
    </div>
  );
}
