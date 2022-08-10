import { FunctionComponent, useEffect, useState } from "react";
import { FaBars, FaFileAlt, FaList, FaPlus } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

type NavBarProps = {
  title: string;
};

const NavBar: FunctionComponent<NavBarProps> = ({ title }: NavBarProps) => {
  return (
    <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <Link to="/" className="text-lg font-bold align-middle">
            <FaFileAlt className="inline pr-3 text-3xl" />
            {title}
          </Link>
        </div>
        <div className="flex-1 px-1 mx-1 ">
          <div className="flex justify-end">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn"><FaBars className="inline pr-3 text-3xl" />Menu</label>
              <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-300 rounded-box w-52 mt-4">
                <li>
                  <Link to="/" className="btn btn-ghost btn-sm rounded-btn justify-start">Add new</Link>
                </li>
                <li>
                  <Link to="/alertlist" className="btn btn-ghost btn-sm rounded-btn justify-start">Alert List</Link>
                </li>
                <li>
                  <Link to="/watchlist" className="btn btn-ghost btn-sm rounded-btn justify-start">Watchlist</Link>
                </li>
                <li>
                  <Link to="/settings" className="btn btn-ghost btn-sm rounded-btn justify-start">Settings</Link>
                </li>
                <li>
                  <Link to="/about" className="btn btn-ghost btn-sm rounded-btn justify-start">About</Link>
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
