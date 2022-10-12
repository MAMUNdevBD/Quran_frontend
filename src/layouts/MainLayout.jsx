import React from "react";
import NavBar from "../components/site/NavBar";
import SideBarLeft from "../components/site/SideBarLeft";
import SideBarRight from "../components/site/SideBarRight";

const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <SideBarLeft />
      <SideBarRight />
      <div className="bg-[#1F2125] min-h-screen">{children}</div>
    </>
  );
};

export default MainLayout;
