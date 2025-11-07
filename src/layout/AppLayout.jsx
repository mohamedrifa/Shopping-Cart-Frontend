import React from "react";
import Navbar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <div className="pt-0 md:pt-14 pb-14 md:pb-0">
        <Outlet />
      </div>
    </>
  );
}
