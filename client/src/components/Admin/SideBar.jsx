import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { usePage } from "../Context/SelectedPageContext";
import logo from "../../assests/Images/logo.png";
import "../../App.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faPersonBiking } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import useScrollDirection from "../Custom hook/ScrollDirection";

const SideBar = () => {
  const { page, onSelectedPage } = usePage();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "isAdmin"]);
  const history = useNavigate();
  const scrollDirection = useScrollDirection();
  // sidebar links object
  const sidebarLinks = [
    { label: "Dasboard", link: "dashboard", icon: faChartPie },
    { label: "Profile", link: "profile", icon: faUser },
    { label: "Users", link: "users", icon: faUserGroup },
    { label: "Messages", link: "messages", icon: faMessage },
    { label: "Flights", link: "flights", icon: faTicket },
    { label: "Destinations", link: "destinations", icon: faPlaneDeparture },
    { label: "Packages", link: "packages", icon: faRoute },
    { label: "Accommodations", link: "accommodations", icon: faHotel },
    { label: "Activities", link: "activities", icon: faPersonBiking },
  ];
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // handle logout
  function logout() {
    removeCookie("token");
    removeCookie("isAdmin");
    history("/");
  }

  // to handle open and close sidebar
  const toggleSidebar = (event) => {
    event.stopPropagation();
    setSidebarOpen(!isSidebarOpen);
  };
  // to handle closing sidebar when clicking anywhere but the sidebar itself
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close the sidebar if it is open and the click is outside the sidebar
      if (isSidebarOpen && !event.target.closest("#default-sidebar")) {
        setSidebarOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <div
        className={`sticky ${
          scrollDirection === "down" ? "-top-32" : "top-0"
        } transition-all duration-1000 w-full z-50`}
      >
        <nav className="bg-third-color lg:hidden flex justify-start gap-4 py-2 px-3">
          <button
            onClick={(e) => toggleSidebar(e)}
            className="inline-flex items-center p-2 text-sm text-second-color rounded-lg lg:hidden hover:bg-second-color hover:text-third-color focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <Link
            to="/dashboard"
            className="flex items-center"
            onClick={() => {
              onSelectedPage("dashboard");
            }}
          >
            <img src={logo} className="h-8 mr-3" alt="EcoVoyage Logo" />
            <span className="self-center text-2xl font-semibold font-grape-nuts whitespace-nowrap text-second-color">
              EcoVoyage
            </span>
          </Link>
        </nav>
      </div>
      <aside
        id="default-sidebar"
        className={`fixed h-screen top-0 left-0 z-[55] w-64 transition-transform ${
          !isSidebarOpen ? "-translate-x-full lg:translate-x-0" : ""
        }`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-third-color">
          <div className="w-auto justify-start gap-5 items-center mx-3 flex my-5">
            <img className="w-1/4" src={logo} alt="EcoVoyage Logo" />
            <h1 className="text-2xl font-bold text-second-color font-grape-nuts">
              EcoVoyage
            </h1>
          </div>
          <ul class="space-y-2 font-medium">
            {sidebarLinks.map((sideLink, id) => (
              <li key={id}>
                <button
                  className={`w-full flex items-center px-3 text-second-color transition-colors duration-300 transform rounded-lg hover:bg-second-color hover:text-third-color ${
                    page === sideLink.link
                      ? "bg-second-color text-third-color"
                      : ""
                  }`}
                  onClick={() => {
                    onSelectedPage(sideLink.link);
                    setSidebarOpen(!isSidebarOpen);
                  }}
                >
                  <FontAwesomeIcon className="p-3" icon={sideLink.icon} />
                  <span className="mx-2 text-sm font-medium">
                    {sideLink.label}
                  </span>
                </button>
              </li>
            ))}
            <li>
              <button
                className={`w-full flex items-center px-3 text-second-color transition-colors duration-300 transform rounded-lg hover:bg-second-color hover:text-third-color`}
                onClick={() => logout()}
              >
                <FontAwesomeIcon
                  className="p-3"
                  icon={faArrowRightFromBracket}
                />
                <span className="mx-2 text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
