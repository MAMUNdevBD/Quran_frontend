import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center bg-slate-700 text-white">
      <div className="flex gap-3 items-center">
        <MdOutlineMenu />
        <h1>Studerakoranen</h1>
      </div>
      <div className="">
        <AiOutlineUser />
      </div>
    </div>
  );
};

export default NavBar;
