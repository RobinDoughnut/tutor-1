import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { CgMenuLeft } from "react-icons/cg";
import { TbUserCircle, TbArrowNarrowRight } from "react-icons/tb";
import { RiUserLine } from "react-icons/ri";
import { RiShoppingBasketLine } from "react-icons/ri";
import { AppContext } from "../context/AppContext";


const Header = () => {
  const {navigate, token, settoken, userData} = useContext(AppContext)
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    settoken("");
  };

  return (
    <header className="max-padd-container w-full absolute top-0 left-0 right-0 z-50 bg-deep text-white py-3">
      <div className="flexBetween">
        {/* logo */}
        <Link to={"/"} className="bold-24 flex-1 flex ">
          <span className="inline-flex">
            <span className="inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-tertiary -rotate-[31deg] rounded-full">
            P
            </span>
            rimeTutor
          </span>
        </Link>
        {/* navbar */}
        <div className="flex-1">
          <Navbar
            menuOpened={menuOpened}
            toggleMenu={toggleMenu}
            containerStyles={`${
              menuOpened
                ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-deep z-50 px-10 py-4 shadow-2xl"
                : "hidden xl:flex gap-x-5 xl:gap-x-12 medium-15 rounded-full px-2 py-1"
            }`}
          />
        </div>
        {/* right side */}
        <div className="flex-1 flex items-center justify-end gap-x-3 sm:gap-x-10">
          {!menuOpened && (
            <CgMenuLeft
              onClick={toggleMenu}
              className="text-2xl xl:hidden cursor-pointer"
            />
          )}
          <div className="group relative">
            <div onClick={() => !token && navigate("/login")}>
              {token && userData ? (
                <div className="">
                  <img src={userData.image} className="rounded-full w-12 cursor-pointer" />
                </div>
              ) : (
                <button className="btn-white !border-none flexCenter gap-x-2 !py-3">
                  Login
                  <RiUserLine className="text-xl" />
                </button>
              )}
            </div>
            {token && userData && (
              <>
                <ul className="bg-white shadow-sm p-2 w-36 ring-1 ring-slate-900/15 rounded absolute right-0 top-10 hidden group-hover:flex flex-col ">
                  <li
                    onClick={() => navigate("/my-profile")}
                    className="flexBetween cursor-pointer"
                  >
                    <p>My Profile</p>
                    <TbArrowNarrowRight className="opacity-50 text-[19px]" />
                  </li>
                  <hr className="my-2" />
                  <li
                    onClick={() => navigate("/my-sessions")}
                    className="flexBetween cursor-pointer"
                  >
                    <p>My Sessions</p>
                    <TbArrowNarrowRight className="opacity-50 text-[19px]" />
                  </li>
                  <hr className="my-2" />
                  <li onClick={logout} className="flexBetween cursor-pointer">
                    <p className="text-red-500">Logout</p>
                    <TbArrowNarrowRight className="opacity-50 text-[19px]" />
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
