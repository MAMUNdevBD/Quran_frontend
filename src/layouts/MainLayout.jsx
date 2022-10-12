import React from "react";
import NavBar from "../components/site/NavBar";
import SideBarLeft from "../components/site/SideBarLeft";
import SideBarRight from "../components/site/SideBarRight";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <SideBarLeft />
      <SideBarRight />
      <div>
        <slot />
      </div>
    </>
  );
};

export default MainLayout;
