import { FunctionComponent, useEffect, useState } from "react";
import { FaBars, FaFileAlt, FaBell } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import Global from "../../../Global/Global";

type NavBarProps = {
  title: string;
};

const NavBar: FunctionComponent<NavBarProps> = ({ title }: NavBarProps) => {
  const alertNum: number = Global.getInstance().getUiConstManager().getNumberOfAlerts();
  const isAlert: boolean = (alertNum > 0);

  return (
    <nav className="navbar mb-4 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <Link to="/" className="text-lg font-bold align-middle">
            <FaFileAlt className="inline pr-3 text-3xl" />
            {title}
          </Link>
        </div>
        <div className="flex-1 px-1 mx-1 ">
          <div className="flex justify-end">
            { isAlert && ( <div className="indicator">
                <span className="indicator-item badge badge-secondary">{alertNum}</span>
                <Link to="/alertlist" className="btn btn-ghost rounded-btn bg-base-200 justify-start align-middle"><FaBell className="inline pr-3 text-3xl"/>Alert List</Link>
                </div> )}

            { !isAlert && (
              <Link to="/alertlist" className="btn btn-ghost rounded-btn bg-base-200 justify-start align-middle"><FaBell className="inline pr-3 text-3xl"/>Alert List</Link>
            )}
            
            <div className="dropdown dropdown-end px-4">
              <label tabIndex={0} className="btn btn-ghost rounded-btn"><FaBars className="inline pr-3 text-3xl"/>Menu</label>
              
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-300 rounded-box w-52 m-4">
                <li>
                  <Link to="/" className="btn btn-ghost rounded-btn justify-start align-middle">Add new</Link>
                </li>
                <li>
                  <Link to="/watchlist" className="btn btn-ghost rounded-btn justify-start align-middle">Watchlist</Link>
                </li>
                <li>
                  <Link to="/settings" className="btn btn-ghost rounded-btn justify-start align-middle">Settings</Link>
                </li>
                <li>
                  <Link to="/about" className="btn btn-ghost rounded-btn justify-start align-middle">About</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
