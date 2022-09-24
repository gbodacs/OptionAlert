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
    <div className="card mx-auto bg-base-200 shadow-xl m-8">
      <div className="card-body">
        <h2 className="card-title">Option Alert</h2>
        <p>Set your alarm criteria to an option based on volume or any indicator. this program sends an alert when the preset conditions are met.</p>
        <p><b>Developed by:</b> AppVagance</p>
        <p><b>Version:</b> {Global.getInstance().getConstManager().Version}</p>
        <div className="card-actions justify-evenly mt-4">
          <button className="btn btn-primary" onClick={() => navigate("/settings")}>Settings</button>
          <button className="btn btn-primary" onClick={() => navigate("/")}>Add new alert</button>
        </div>
      </div>
    </div>
  );
}
