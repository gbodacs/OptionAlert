import { FunctionComponent, useEffect, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import {FaRegSun, FaHome} from 'react-icons/fa'
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
        <div className="flex-none px-1 mx-1 justify-end">
            <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
              <FaHome className="inline text-2xl"/>
            </Link>
            <Link to="/settings" className="btn btn-ghost btn-sm rounded-btn">
              <FaRegSun className="inline text-2xl"/>
            </Link>
            <Link to="/about" className="btn btn-ghost btn-sm rounded-btn">
              About
            </Link>
            

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
