import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assests/Images/logo.png";
import { useAuth } from "./Context/AuthContext";
import useScrollDirection from "./Custom hook/ScrollDirection";
import { useCookies } from "react-cookie";

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [selectedLink, setSelectedLink] = useState("Home");
  const { isLoggedIn } = useAuth();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "isAdmin"]);
  const history = useNavigate();
  function logout() {
    removeCookie("token");
    removeCookie("isAdmin");
    history("/");
  }

  const scrollDirection = useScrollDirection();

  const location = useLocation();
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/verify-code" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/dashboard"
  ) {
    return null;
  }

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    // { name: "Transportation", path: "/transportaions" },
    { name: "Flights", path: "/flights" },
    { name: "Accommodations", path: "/accommodations" },
    { name: "Packages", path: "/packages" },
    { name: "Activities", path: "/activities" },
    { name: "Learn More", path: "/about" },
    { name: "Reach Us", path: "/contact" },
  ];

  return (
    <div
      className={`sticky ${
        scrollDirection === "down"
          ? isMenuOpened
            ? "-top-[35rem]"
            : "-top-32"
          : "top-0"
      } transition-all duration-1000 w-full z-50`}
    >
      {/* logo need change */}
      <nav className="bg-third-color">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex">
            {/* Toggle button */}
            <button
              data-collapse-toggle="navbar-default"
              onClick={() => setIsMenuOpened(!isMenuOpened)}
              type="button"
              className="inline-flex items-center mx-2 p-2 w-10 h-10 justify-center text-sm text-second-color hover:text-third-color rounded-lg md:hidden hover:bg-second-color"
              aria-controls="navbar-default"
              aria-expanded={isMenuOpened}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden={!isMenuOpened}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            {/* logo */}
            <Link
              to="/"
              className="flex items-center"
              onClick={() => {
                setSelectedLink("Home");
              }}
            >
              <img src={logo} className="h-8 mr-3" alt="EcoVoyage Logo" />
              <span className="self-center text-2xl font-semibold font-grape-nuts whitespace-nowrap text-second-color">
                EcoVoyage
              </span>
            </Link>
          </div>
          {/* right side buttons */}
          <div
            className={`${
              isLoggedIn ? "flex" : "hidden"
            } scale-75 sm:scale-100 my-1 items-center lg:my-0 lg:ml-auto`}
          >
            <Link to="/profile">
              <button
                type="button"
                className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs uppercase leading-normal text-second-color hover:text-fourth-color font-bold transition duration-150 ease-in-out hover:bg-second-color hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Profile
              </button>
            </Link>
            <button
              type="button"
              className="mr-2 inline-block rounded p-2 text-xs uppercase leading-normal text-second-color hover:text-fourth-color font-bold transition duration-150 ease-in-out hover:bg-second-color hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={() => logout()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isLoggedIn ? "hidden" : "flex"
            } scale-75 sm:scale-100 my-1 items-center lg:my-0 lg:ml-auto`}
          >
            <Link to="/login">
              <button
                type="button"
                className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs font-bold uppercase leading-normal hover:shadow-md hover:shadow-fourth-color text-second-color hover:text-fourth-color transition duration-150 ease-in-out hover:bg-second-color hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                type="button"
                className="mr-2 inline-block rounded px-6 pt-2.5 pb-2 text-xs font-bold uppercase leading-normal text-fourth-color transition duration-150 ease-in-out hover:shadow-md hover:shadow-fourth-color bg-second-color hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                Sign up
              </button>
            </Link>
          </div>

          {/* <!-- Collapsible wrapper --> */}
          <div
            className={`${
              isMenuOpened ? "" : "hidden"
            } w-screen md:hidden id="navbar-default`}
          >
            <ul className="font-medium flex flex-col bg-second-color p-4 md:p-0 mt-4 border border-second-color rounded-lg md:flex-row md:space-x-3 md:mt-0 md:border-0 md:bg-second-color">
              {menuItems.map((item, id) => (
                <li key={id}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setSelectedLink(item.name);
                      setIsMenuOpened(!isMenuOpened);
                    }}
                    className={`font-normal block py-2 px-1 rounded hover:bg-transparent-third-color hover:text-second-color md:hover:bg-transparent md:border-0 md:p-0 ${
                      selectedLink === item.name
                        ? " bg-transparent-third-color text-second-color"
                        : "text-Base-color"
                    }`}
                    aria-current="page"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <!-- Collapsible wrapper --> */}
        </div>
      </nav>
      <nav className="bg-second-color border-b-2 border-third-color hidden md:block">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row w-full justify-between font-medium mt-0 mr-6 space-x-8 text-sm">
              {menuItems.map((item, id) => (
                <li key={id}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setSelectedLink(item.name);
                    }}
                    className={`hover:underline hover:text-fourth-color ${
                      selectedLink === item.name
                        ? "text-fourth-color underline"
                        : "text-third-color"
                    }`}
                    aria-current="page"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
