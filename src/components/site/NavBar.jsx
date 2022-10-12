import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

const NavBar = () => {
  return (
    <div className="font-poppins bg-[#1B1F20] text-white">
      <div className="container flex justify-between items-center h-14 text-xl">
        <div className="flex gap-3 items-center">
          <MdOutlineMenu className="" />
          <a href={"/"} className="text-lg">
            Studerakoranen
          </a>
        </div>
        <div className="">
          <AiOutlineUser />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
