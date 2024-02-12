import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ProfileData from "./ProfileData";
import BookingHistory from "./BookingHistory";
import FlightsHistory from "./FlightsHistory";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [flights, setFlights] = useState([]);
  const [image, setImage] = useState(null);
  const { headers } = useAuth();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = React.useState("Profile");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  async function fetchData() {
    await axios
      .get("http://localhost:3999/getUserId", { headers: headers })
      .then((response) => {
        setUser(response.data[0]);
      });
  }
  const [previewSrc, setPreviewSrc] = useState("");

  const loadFile = (e) => {
    const input = e.target;
    const file = input.files[0];
    setImage(file);
    const output = document.getElementById("preview_img");
    if (file) {
      setPreviewSrc(URL.createObjectURL(file));
    }
    output.onload = function () {
      URL.revokeObjectURL(previewSrc);
    };
  };

  useEffect(() => {
    if (image) {
      const imageUpdate = new FormData();
      imageUpdate.append("image", image);
      axios
        .put("http://localhost:3999/updateUserData", imageUpdate, {
          headers: headers,
        })
        .then((response) => {
          setUser(response.data.updatedUser);
          setPreviewSrc("");
          setImage(null);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Image has been uploaded successfully.",
            confirmButtonText: "OK",
            customClass: {
              confirmButton:
                "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
            },
          });
        });
    } else {
      if (user.profileimage) {
        setPreviewSrc(user.profileimage);
      }
    }
  }, [image,headers]);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (headers) {
      fetchData();
      axios
        .get("http://localhost:3999/getBookingOfUser", { headers: headers })
        .then((response) => {
          if (response.data != "Booking not found for the user") {
            setBookings(response.data);
          }
        });
      axios
        .get("http://localhost:3999/getFlightsOfUser", { headers: headers })
        .then((response) => {
          if (response.data != "Ticket not found for the user") {
            setFlights(response.data);
          }
        });
    }
  }, [headers]);
  return (
    <div>
      <div className="relative text-Base-color py-20 px-0 w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1529718836725-f449d3a52881?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] ">
        <div className="flex bg-white justify-center z-0 absolute top-1/4 left-1/2 transform -translate-x-1/2 border border-solid p-6 md:p-8 w-3/4 rounded-3xl mb-40 min-h-[500px]">
          <div className="w-full h-full">
            {/* profile info */}
            <div className="flex flex-col md:flex-row gap-12 pb-4 justify-center items-center">
              <div className="shrink-0 flex flex-col justify-center items-center relative">
                <img
                  id="preview_img"
                  src={
                    previewSrc !== ""
                      ? previewSrc
                      : user && user.profileimage && user.profileimage
                  }
                  alt="Profile image"
                  className="h-48 w-48 rounded-full object-cover"
                />
                <div className="absolute bottom-3 right-3">
                  <p
                    className="cursor-pointer bg-third-color text-second-color p-2 rounded-full"
                    onClick={handleClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => loadFile(e)}
                  />
                </div>
              </div>
              <div className="text-start w-1/2">
                <h1 className="text-xl sm:text-2xl md:text-4xl">
                  {user && user.first_name + " " + user.last_name}
                </h1>
                <p className="text-gray-700 text-sm sm:text-lg md:text-xl">
                  {flights && flights.length} Flights{" "}
                  {bookings && bookings.length} Bookings
                </p>
              </div>
            </div>

            {/* tab bar */}
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
              <ul className="flex flex-wrap -mb-px">
                <li className="me-2">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                      activeTab === "Profile"
                        ? "text-fourth-color border-fourth-color"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("Profile")}
                  >
                    Profile
                  </button>
                </li>
                <li className="me-2">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                      activeTab === "Bookings"
                        ? "text-fourth-color border-fourth-color"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("Bookings")}
                  >
                    Bookings
                  </button>
                </li>
                <li className="me-2">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                      activeTab === "Flights"
                        ? "text-fourth-color border-fourth-color"
                        : "hover:text-gray-600 hover:border-gray-300"
                    }`}
                    onClick={() => handleTabClick("Flights")}
                  >
                    Flights
                  </button>
                </li>
              </ul>
            </div>

            {/* content */}
            <div className={`${activeTab === "Profile" ? "block" : "hidden"}`}>
              <ProfileData />
            </div>
            <div className={`${activeTab === "Bookings" ? "block" : "hidden"}`}>
              <BookingHistory />
            </div>
            <div className={`${activeTab === "Flights" ? "block" : "hidden"}`}>
              <FlightsHistory />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[650px] md:h-[600px]"></div>
    </div>
  );
};

export default Profile;
