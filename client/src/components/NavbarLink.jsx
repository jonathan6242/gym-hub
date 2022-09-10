import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import MegaMenu from "./MegaMenu";

function NavbarLink({ children, to, menu }) {
  return (
    <div 
      className="group h-5"
    >
      <a
        href={to}
        className="nav__link cursor-pointer"
      >
        {children}
        <div className="absolute -bottom-[30px] h-[30px] -inset-x-3 hidden group-hover:block cursor-default "></div>
        <div className="absolute -top-[30px] h-[30px] -inset-x-3 hidden group-hover:block cursor-default "></div>
        <div className="absolute -left-[42px] w-[42px] inset-y-0 hidden group-hover:block cursor-default "></div>
        <div className="absolute -right-[42px] w-[42px] inset-y-0 hidden group-hover:block cursor-default "></div>
      </a>
      {menu}
      <div className={`pointer-events-none fixed top-[84px] hidden group-hover:flex bg-black/50 z-30 bottom-0 inset-x-0`}></div>      
    </div>
  )
}
export default NavbarLink