import { useEffect } from "react";
import { Link } from "react-router-dom";
import closeDropDown from "../../Utils/closedropdown";

export default function Settings() {
  useEffect(() => {
    closeDropDown();
  }, []);

  return (
    <>
      <h1 className="text-2xl m-4">Settings</h1>

      <div className="hero">
        <div className="text-center hero-content">
          <div className="max-w-lg">
            <h3 className="text-3xl font-bold mb-8">Settings page</h3>
            <p className="text-5xl mb-8">Settings placeholder</p>
            <Link to="/alertlist" className="btn btn-primary btn-lg">
              Back to the Watch List
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
