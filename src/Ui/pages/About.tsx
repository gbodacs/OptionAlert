import React, { useEffect } from "react";
import closeDropDown from "../../Utils/closedropdown";

export default function About() {
  useEffect( () => {
    closeDropDown();
  }, [])
  
  return (
    <div>
      <h1 className="text-2xl m-4">Option Alert</h1>
      <p className="text-lg text-white">
        To send alerts when certain events occur
      </p>
      <p className="text-lg text-gray-400">
        Version: <span className="text-white">1.0.0</span>
      </p>
      <p className="text-lg text-gray-400">
        Created by: <span className="text-white">Gabor Bodacs</span>
      </p>
    </div>
  );
}
