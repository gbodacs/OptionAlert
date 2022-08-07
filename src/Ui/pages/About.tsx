import React, { useEffect } from "react";
import closeDropDown from "../../Utils/closedropdown";

export default function About() {
  useEffect( () => {
    closeDropDown();
  }, [])
  
  return (
    <div>
      <h1 className="text-6xl mb-4">Option Alert</h1>
      <p className="text-lg text-white">
        A program to send alerts 
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
