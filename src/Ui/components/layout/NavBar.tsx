import { FunctionComponent, useState } from "react";
import { FaBars,FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
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
        <div className="flex-none">
          
        <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost rounded-btn"><FaBars className="inline text-3xl pr-2"/>{title}</label>
              
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-info-content rounded-box w-52 m-4">
                <li>
                  <Link to="/" className="btn btn-ghost rounded-btn justify-start align-middle">Add new</Link>
                </li>
                <li>
                  <Link to="/alertlist" className="btn btn-ghost rounded-btn justify-start align-middle">Alert List</Link>
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

        <div className="flex-1 px-1 mx-1 ">
          <div className="flex justify-end">
            { isAlert && ( <div className="indicator">
                <span className="indicator-item badge badge-secondary">{alertNum}</span>
                <Link to="/alertlist" className="btn btn-ghost rounded-btn bg-info-content justify-start align-middle"><FaBell className="inline text-2xl"/></Link>
                </div> )}

            { !isAlert && (
              <Link to="/alertlist" className="btn btn-ghost rounded-btn bg-info-content justify-start align-middle"><FaBell className="inline text-2xl"/></Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
