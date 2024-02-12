import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import { useBooking } from "../Context/BookingContext";
import { useNavigate } from "react-router-dom";

import DatetimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RoomDetailsModal from "./RoomDetailsModal";
import Swal from "sweetalert2";
import BookingModal from "./Payment/BookingModal";

const Rooms = () => {
  const { id } = useParams();
  //   const [room, setRoom] = useState("Standard");
  const { bookData, onBooking } = useBooking();
  //   const [activeIndex, setActiveIndex] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [roomDetails, setRoomDetails] = useState(false);
  const [roomModal, setRoomModal] = useState([]);
  const [index, setIndex] = useState(0);
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const history = useNavigate();
  const [adults, setAdults] = useState(1);
  const [roomsNum, setRoomsNum] = useState(1);
  const [children, setChildren] = useState(0);
  const [total, setTotal] = useState(0);
  const [roomToSelect, setRoomToSelect] = useState(0);
  const [isBooking, setIsBooking] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorToShow, setErrorToShow] = useState("");

  const [booking, setBooking] = useState({
    adults: bookData.adults || 1,
    rooms: bookData.rooms || 1,
    children: bookData.children || 0,
    cost: bookData.cost || 0,
    date_from: bookData.date_from || 0,
    date_to: bookData.date_to || 0,
    accommodation_id: bookData.accommodation_id,
    rooms_ids: bookData.rooms_ids || [],
  });
  const [rooms, setRooms] = useState([]);
  const [roomGuests, setRoomGuests] = useState([{ adults: 1, children: 0 }]);
  // options for date
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  // date formatting
  const formattedStartDate = startDate.toLocaleDateString("en-US", options);
  const formattedEndDate = endDate.toLocaleDateString("en-US", options);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .post(`http://localhost:3999/getFilteredRooms`, {
        accommodation_id: id,
        date_from: startDate,
        date_to: endDate,
        adults: roomGuests[roomToSelect].adults,
        children: roomGuests[roomToSelect].children,
      })
      .then((response) => {
        let data = response.data;
        setRooms(data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  const roomPerPage = 3;
  const indexOfLastRoom = currentPage * roomPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(rooms.length / roomPerPage);

  const openModal = (id) => {
    setRoomModal(rooms.filter((room) => room.room_id === id));
    setRoomDetails(true);
    setIndex(id);
  };
  const closeModal = () => {
    setRoomDetails(false);
  };
  const dropdownPopover = () => {
    setDropdownPopoverShow(!dropdownPopoverShow);
  };

  const handleSearch = () => {
    axios
      .post(`http://localhost:3999/getFilteredRooms`, {
        accommodation_id: id,
        date_from: startDate,
        date_to: endDate,
        adults:
          roomGuests.length > roomToSelect
            ? roomGuests[roomToSelect].adults
            : roomToSelect == 0
            ? roomGuests[0].adults
            : roomGuests[roomToSelect - 1].adults,
        children:
          roomGuests.length > roomToSelect
            ? roomGuests[roomToSelect].children
            : roomToSelect == 0
            ? roomGuests[0].children
            : roomGuests[roomToSelect - 1].children,
      })
      .then((response) => {
        let data = response.data;
        setRooms(data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (booking.rooms_ids.length > 0) {
      let totalCost = roomGuests.reduce((total, rooom) => {
        return total + +rooom.room.cost;
      }, 0);
      booking.cost = totalCost;
      booking.date_to = endDate;
      booking.date_from = startDate;
      booking.adults = adults;
      booking.children = children;
      booking.rooms = roomsNum;

      try {
        setErrorToShow("");
        onBooking(booking);
        setIsBooking(true);
      } catch (error) {
        setErrorToShow("Something went wrong please try again");
      }
    } else {
      setErrorToShow("No room selected");
    }
  }
  const handleRoomSelect = (index) => {
    if (booking.rooms_ids.length < roomsNum) {
      booking.rooms_ids.push(rooms[index].room_id);
      setTotal(total + +rooms[index].cost);
      setRoomGuests(
        roomGuests.map((object, id) =>
          id === roomToSelect ? { ...object, room: rooms[index] } : object
        )
      );
      setRoomToSelect(roomToSelect + 1);
      if (errorToShow !== "") {
        setErrorToShow("");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Can't select more rooms than selected number",
        confirmButtonText: "OK",
        customClass: {
          confirmButton:
            "bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color py-2 px-4 rounded",
        },
      });
    }
  };
  const closeBookingModal = () => {
    setIsBooking(false);
  };
  const addRoom = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setDropdownPopoverShow(true);
  };

  // handle change of number of rooms
  const increment = (type, index) => {
    if (type == "adults") {
      if (roomGuests[index].adults < 4) {
        setRoomGuests(
          roomGuests.map((object, id) =>
            id === index
              ? { ...object, adults: roomGuests[index].adults + 1 }
              : object
          )
        );
      }
    } else {
      if ((roomGuests[index].children, 4)) {
        setRoomGuests(
          roomGuests.map((object, id) =>
            id === index
              ? { ...object, children: roomGuests[index].children + 1 }
              : object
          )
        );
      }
    }
  };
  const decrement = (type, index) => {
    if (type == "adults") {
      if (roomGuests[index].adults > 1) {
        setRoomGuests(
          roomGuests.map((object, id) =>
            id === index
              ? { ...object, adults: roomGuests[index].adults - 1 }
              : object
          )
        );
      }
    } else {
      if (roomGuests[index].children > 0) {
        setRoomGuests(
          roomGuests.map((object, id) =>
            id === index
              ? { ...object, children: roomGuests[index].children - 1 }
              : object
          )
        );
      }
    }
  };
  useEffect(() => {
    setAdults(
      roomGuests.reduce((totalCost, guest) => {
        return totalCost + guest.adults;
      }, 0)
    );
    setChildren(
      roomGuests.reduce((totalCost, guest) => {
        return totalCost + guest.children;
      }, 0)
    );
  }, [roomGuests]);
  const renderRoomNumber = () => {
    let roomInputs = [];
    for (let i = 0; i < roomsNum; i++) {
      roomInputs.push(
        <div key={i} className="p-5 text-start">
          <div className="inline">
            <h1 className="text-fourth-color font-bold">Room {i + 1}</h1>
          </div>
          <div className="flex justify-between text-start text-gray-500">
            <div>
              <label>Adults</label>
              <fieldset className="input-number-wrapper group flex items-center mt-1">
                <button
                  id="decremnt"
                  className="decremnt-left-large bg-third-color text-second-color p-2 rounded-l border border-third-color hover:bg-white hover:text-third-color"
                  onClick={() => {
                    decrement("adults", i);
                  }}
                  disabled={roomGuests[i] && roomGuests[i].adults == 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  className="p-1 w-16 text-center border border-third-color"
                  type="text"
                  value={roomGuests[i].adults}
                  onChange={(e) =>
                    parseInt(e.target.value, 10) &&
                    parseInt(e.target.value, 10) <= 4 &&
                    setRoomGuests(
                      roomGuests.map((object, id) =>
                        id === i
                          ? {
                              ...object,
                              adults: parseInt(e.target.value, 10) || 1,
                            }
                          : object
                      )
                    )
                  }
                  inputmode="numeric"
                ></input>
                <button
                  id="increment"
                  className="increment-right-large bg-third-color text-second-color p-2 rounded-r border border-third-color hover:bg-white hover:text-third-color"
                  onClick={() => {
                    increment("adults", i);
                  }}
                  disabled={roomGuests[i] && roomGuests[i].adults == 4}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </fieldset>
            </div>
            <div>
              <label>Children</label>
              <fieldset className="input-number-wrapper group flex items-center mt-1">
                <button
                  id="decremnt"
                  className="decremnt-left-large bg-third-color text-second-color p-2 rounded-l border border-third-color hover:bg-white hover:text-third-color"
                  onClick={() => {
                    decrement("children", i);
                  }}
                  disabled={roomGuests[i].children == 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  className="p-1 w-16 text-center border border-third-color"
                  type="text"
                  value={roomGuests[i].children}
                  onChange={(e) =>
                    parseInt(e.target.value, 10) &&
                    parseInt(e.target.value, 10) <= 4 &&
                    setRoomGuests(
                      roomGuests.map((object, id) =>
                        id === i
                          ? {
                              ...object,
                              children: parseInt(e.target.value, 10) || 1,
                            }
                          : object
                      )
                    )
                  }
                  inputmode="numeric"
                ></input>
                <button
                  id="increment"
                  className="increment-right-large bg-third-color text-second-color p-2 rounded-r border border-third-color hover:bg-white hover:text-third-color"
                  onClick={() => {
                    increment("children", i);
                  }}
                  disabled={roomGuests[i].children == 4}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      );
    }
    return roomInputs;
  };
  // end of room change

  return (
    <div className="text-Base-color">
      <div className="flex flex-col justify-center items-center gap-5 my-10">
        {/* searching */}
        <div className="flex flex-wrap justify-center items-center gap-5 w-full">
          {/* pick rooms and # of guests */}
          <div className="relative w-2/3 md:w-1/2 lg:w-1/4">
            <button
              id="dropdownInformationButton"
              data-dropdown-toggle="dropdownInformation"
              className="text-Base-color bg-white hover:bg-transparent-first-color border border-third-color font-medium rounded text-sm px-5 py-2.5 text-center w-full"
              type="button"
              onClick={() => dropdownPopover()}
            >
              {adults} {adults > 1 ? "Adults," : "Adult,"}{" "}
              {children != 0 &&
                (children > 1
                  ? `${children} Children,`
                  : `${children} Child,`)}{" "}
              {roomsNum} {roomsNum > 1 ? "Rooms" : "Room"}
            </button>

            <div
              id="dropdownInformation"
              className={`z-10 absolute ${
                dropdownPopoverShow ? "block" : "hidden"
              } bg-white divide-y divide-gray-100 rounded shadow w-full max-h-80 overflow-auto`}
            >
              <div className="px-4 py-3 text-sm text-Base-color flex justify-between items-center">
                <h1>Rooms</h1>
                <fieldset className="input-number-wrapper group flex items-center">
                  <button
                    id="decremnt"
                    className="decremnt-left-large bg-third-color text-second-color p-2 rounded-l border border-third-color hover:bg-white hover:text-third-color"
                    onClick={() => {
                      roomsNum != 1 && setRoomsNum(roomsNum - 1);
                      // roomGuests.pop();
                      setRoomGuests(roomGuests.slice(0, -1));
                    }}
                    disabled={roomsNum == 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.25 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <input
                    className="p-1.5 w-16 text-center border border-third-color"
                    type="text"
                    value={roomsNum}
                    onChange={(e) =>
                      parseInt(e.target.value, 10) &&
                      parseInt(e.target.value, 10) <= 5 &&
                      setRoomsNum(parseInt(e.target.value, 10) || 1)
                    }
                    inputmode="numeric"
                  ></input>
                  <button
                    id="increment"
                    className="increment-right-large bg-third-color text-second-color p-2 rounded-r border border-third-color hover:bg-white hover:text-third-color"
                    onClick={() => {
                      roomsNum < 5 && setRoomsNum(roomsNum + 1);
                      setRoomGuests([
                        ...roomGuests,
                        { adults: 1, children: 0 },
                      ]);
                    }}
                    disabled={roomsNum == 5}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </fieldset>
              </div>

              {renderRoomNumber()}
            </div>
          </div>
          {/* pick date */}
          <div className="flex items-center">
            <label className="px-3">From:</label>
            <DatetimePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(date);
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              placeholderText="Start Date"
              className="block text-sm py-3 px-4 rounded w-full border border-transparent-third-color outline-none focus:border-third-color"
              calendarClassName="custom-calendar"
            />

            <label className="px-3">To:</label>
            <DatetimePicker
              selected={endDate}
              name="date_to"
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="block text-sm py-3 px-4 rounded w-full border border-transparent-third-color outline-none focus:border-third-color"
              calendarClassName="custom-calendar"
            />
          </div>
          {/* search button */}
          <button
            onClick={() => handleSearch()}
            className="border-fourth-color border-2 hover:bg-second-color bg-fourth-color hover:text-fourth-color text-second-color font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>
        {/* rooms list */}
        <div className="flex flex-col-reverse lg:flex-row mx-5">
          {/* summary */}
          <div
            className={`bg-white border relative border-third-color ${
              rooms.length > 0 ? "lg:w-1/3" : "lg:w-1/4"
            } h-fit lg:mx-5 my-6 text-start pb-10`}
          >
            <h1 className="text-third-color text-2xl md:text-4xl px-5 my-3">
              Summary
            </h1>
            <hr />
            <div>
              {
                <>
                  {roomGuests.map((item, id) => (
                    <button
                      className={`p-5 w-full text-start ${
                        item.room
                          ? "bg-white"
                          : roomToSelect == id
                          ? "bg-white"
                          : "bg-second-color"
                      }`}
                      onClick={() => setRoomToSelect(id)}
                      key={id}
                    >
                      <div className="flex justify-between">
                        <h1 className="flex items-center gap-3 text-xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-6 h-6"
                          >
                            <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                          </svg>
                          Room {id + 1}
                        </h1>
                        {item.room && (
                          <h1 className="text-third-color font-bold text-xl">
                            {item.room.cost} JOD
                          </h1>
                        )}
                      </div>
                      {item.room && (
                        <div>
                          <p>{item.room.room_type}</p>
                          <p>{item.room.room_description}</p>
                        </div>
                      )}
                      <p className="font-bold">
                        {formattedStartDate} - {formattedEndDate}
                      </p>
                      <p>
                        {item.adults > 0 &&
                          (item.adults == 1
                            ? "1 Adult"
                            : `${item.adults} Adults`)}
                        {item.children > 0 &&
                          (item.children == 1
                            ? ", 1 Child"
                            : `, ${item.children} Children`)}
                      </p>
                    </button>
                  ))}
                </>
              }
            </div>
            <button
              className="text-fourth-color w-full px-5 py-2 bg-white text-start flex items-center gap-2 border-y-2 "
              onClick={() => addRoom()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add room
            </button>
            <p className="px-5 text-start text-red-500">{errorToShow}</p>
            <div className="flex justify-between p-4 font-bold">
              <h1>
                {adults} {adults > 1 ? "Adults," : "Adult,"}{" "}
                {children != 0 &&
                  (children > 1
                    ? `${children} Children,`
                    : `${children} Child,`)}{" "}
                {roomsNum} {roomsNum > 1 ? "Rooms" : "Room"}
              </h1>
              <h1>Total: {total}JOD</h1>
            </div>
            <button
              className="bg-fourth-color absolute -bottom-3 left-1/2 transform -translate-x-1/2 hover:bg-white text-white hover:text-fourth-color border border-fourth-color rounded px-3 py-2 w-4/5"
              onClick={(e) => handleSubmit(e)}
            >
              Continue
            </button>
          </div>
          {/* list */}
          <div className="text-Base-color text-start flex flex-col gap-10 lg:m-10">
            {currentRooms ? (
              currentRooms.map((room, index) => (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row justify-center items-center gap-3"
                >
                  <img
                    src={room.room_image}
                    alt="room image"
                    className="w-full lg:w-[500px] h-full object-cover"
                  />
                  <div className="bg-transparent-first-color w-full lg:w-1/2 px-4 py-8">
                    <div className="flex flex-wrap justify-between pb-4">
                      <div>
                        <h1 className="text-3xl md:text-4xl">
                          {room.room_type}
                        </h1>
                        <p className="flex items-center p-1">
                          <span>{room.capacity}</span>{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-4 h-4 mx-1"
                          >
                            <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                          </svg>
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <p className=" flex">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-6 h-6 mx-1 text-fourth-color"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span>{room.view}</span>
                          </p>
                          <button
                            className="underline text-fourth-color"
                            onClick={() => openModal(room.room_id)}
                          >
                            More details
                          </button>
                        </div>
                      </div>
                      <div className="flex items-baseline text-Base-color mb-5">
                        <span className="text-4xl font-extrabold tracking-tight">
                          {room.cost}
                        </span>
                        <span className="text-3xl font-semibold">JOD</span>
                      </div>
                    </div>
                    <button
                      className="p-2.5 ms-2 text-sm font-medium text-second-color bg-fourth-color rounded border border-fourth-color hover:bg-second-color hover:text-fourth-color"
                      onClick={() => handleRoomSelect(index)}
                    >
                      Select this room
                    </button>
                  </div>
                  {roomDetails && (
                    <RoomDetailsModal onClose={closeModal}>
                      <h1 className="text-3xl text-start text-third-color">
                        Room details
                      </h1>
                      <hr className="py-1" />
                      <p className="text-2xl md:text-3xl text-Base-color">
                        {roomModal[0].room_type}
                      </p>
                      <p>{roomModal[0].room_description}</p>
                      <p className="flex items-center">
                        <span>View: </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 mx-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{roomModal[0].view} View</span>
                      </p>
                      <p className="flex items-center">
                        <span>Size: </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4 mx-1"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                          />
                        </svg>

                        <span>{roomModal[0].size}</span>
                      </p>
                      <p className="flex flex-wrap gap-2">
                        <span>Amenities: </span>
                        {roomModal &&
                          roomModal[0].amenities.map((item, id) => (
                            <span key={id} className="text-Base-color">
                              {item}
                            </span>
                          ))}
                      </p>
                    </RoomDetailsModal>
                  )}
                  <div id="details"></div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
      <div id="booking"></div>
      {isBooking && <BookingModal onClose={closeBookingModal}></BookingModal>}
    </div>
  );
};

export default Rooms;

// pagination
