import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import { useBooking } from "../Context/BookingContext";
import { useNavigate } from "react-router-dom";

import DatetimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BookingModal from "./Payment/BookingModal";

const PackageDetails = () => {
  const { id } = useParams();
  const [packageData, setPackageData] = useState([]);
  const { bookData, onBooking } = useBooking();
  const [itinerary, setItinerary] = useState([]);
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [total, setTotal] = useState(0);
  const history = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [booking, setBooking] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: "",
    adults: 1,
    children: 0,
  });

  const handleDate = (date) => {
    setStartDate(date);
    let newDate = new Date(date);
    newDate.setDate(date.getDate() + 5);
    setEndDate(newDate);
    onBooking({
      ...bookData,
      date_from: date,
      date_to: newDate,
    });
  };

  // async function handleSubmit(e) {
  //   let total =
  //     booking.adults * booking.cost + (booking.children * booking.cost) / 2;
  //   booking.cost = total;
  //   booking.packages_id = id;
  //   booking.date_to = endDate;
  //   booking.date_from = startDate;

  //   e.preventDefault();
  //   try {
  //     onBooking(booking);
  //     history("/payment");
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  // image
  const [currentImage, setCurrentImage] = useState(0);
  const nextSlide = () => {
    if (packageData) {
      if (currentImage === packageData.imagePAC.length - 1) {
        setCurrentImage(0);
      } else {
        setCurrentImage(currentImage + 1);
      }
    }
  };
  const prevSlide = () => {
    if (packageData) {
      if (currentImage === 0) {
        setCurrentImage(packageData.imagePAC.length - 1);
      } else {
        setCurrentImage(currentImage - 1);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .get(`http://localhost:3999/getPackagesById/${id}`)
      .then((response) => {
        // Handle the response data here
        setPackageData(response.data[0]);
        booking.cost = response.data[0].cost;
        setTotal(response.data[0].cost);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);
  useEffect(() => {
    setItinerary(packageData.itinerary);
    setInclusions(packageData.inclusions);
    setExclusions(packageData.exclusions);
    setHighlights(packageData.highlights);
  }, [packageData]);

  function renderAttributes(obj) {
    return (
      <>
        {Object.keys(obj).map((key, id) =>
          obj === itinerary ? (
            <li key={id} className="pb-3">
              <strong>{key}:</strong> {obj[key]}
            </li>
          ) : (
            <li key={id} className="pb-3">
              {obj[key]}
            </li>
          )
        )}
      </>
    );
  }

  // booking modal and payment
  const openBooking = () => {
    setIsBooking(true);
    onBooking({
      ...bookData,
      packages_id: id,
      adults: 1,
      children: 0,
    });
  };
  const closeBookingModal = () => {
    setIsBooking(false);
  };
  useEffect(() => {
    onBooking({ ...bookData, date_from: startDate, date_to: endDate });
  }, [startDate, endDate]);
  function handleChange(e) {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value,
    });
    if (name == "adults" || name == "children") {
      let totalCost;
      if (name == "adults") {
        totalCost =
          value * packageData.cost + (booking.children * packageData.cost) / 2;
        onBooking({
          ...bookData,
          cost: totalCost,
          adults: value,
        });
      } else {
        totalCost =
          booking.adults * packageData.cost + (value * packageData.cost) / 2;
        onBooking({
          ...bookData,
          cost: totalCost,
          children: value,
        });
      }
      setTotal(totalCost);
    } else {
      onBooking({
        ...bookData,
        [name]: value,
      });
    }
  }
  return (
    <div>
      {/* images */}
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        <div className="relative h-[200px] md:h-[420px] overflow-hidden rounded">
          {packageData &&
            packageData.imagePAC &&
            packageData.imagePAC.map((image, id) => (
              <div
                key={id}
                className={`duration-700 ease-in-out ${
                  currentImage === id ? "block" : "hidden"
                }`}
                data-carousel-item
              >
                <img
                  src={image}
                  className="absolute block h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt={packageData.title}
                />
              </div>
            ))}
        </div>
        <button
          onClick={() => prevSlide()}
          type="button"
          className="absolute top-0 left-5 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-900/40 group-hover:bg-gray-900/50">
            <svg
              className="w-4 h-4 text-second-color rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          onClick={() => nextSlide()}
          type="button"
          className="absolute top-0 right-5 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-900/40 group-hover:bg-gray-900/50">
            <svg
              className="w-4 h-4 text-second-color dark:text-gray-800 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      {/* content */}
      <div className="flex flex-col justify-center items-center my-10">
        <div className="w-2/3">
          {packageData && (
            <div className="flex flex-col gap-10">
              {/* title */}
              <div className="flex flex-wrap justify-between gap-4">
                <h1 className="text-Base-color text-start text-3xl font-bold">
                  {packageData.title}{" "}
                  <span className="text-light-pink text-xl font-normal">
                    {itinerary ? (
                      Object.keys(itinerary).length === 1 ? (
                        "Day"
                      ) : (
                        `${Object.keys(itinerary).length} Days`
                      )
                    ) : (
                      <></>
                    )}
                  </span>
                </h1>
                <button
                  type="submit"
                  onClick={(e) => openBooking(e)}
                  className="py-3 w-64 text-xl text-second-color hover:text-fourth-color bg-fourth-color border-2 hover:bg-second-color border-fourth-color rounded"
                >
                  Book Package
                </button>
              </div>
              {/* overview */}
              <h5 className="text-start text-xl">
                <span className="text-2xl text-third-color font-bold">
                  Overview
                </span>{" "}
                <br />
                {packageData.overview}
              </h5>
              {/* price */}
              <div className="flex flex-col gap-6">
                <h1 className="text-third-color text-start text-3xl font-bold">
                  Price
                </h1>
                <h5 className="text-start text-xl">
                  {packageData.cost} JOD / Person
                </h5>
              </div>
              {/* details */}
              <h1 className="text-Base-color text-start text-3xl font-bold">
                Trip details
              </h1>
              <div className="flex flex-col md:flex-row justify-between">
                {/* Itinerary */}
                <div className="flex flex-col gap-2 pb-4">
                  {" "}
                  <h5 className="text-start text-xl">
                    <span className="text-2xl text-third-color font-bold">
                      Itinerary
                    </span>{" "}
                    <br />
                  </h5>
                  <ol className="text-start text-xl px-5">
                    {itinerary && Object.keys(itinerary).length > 0 ? (
                      renderAttributes(itinerary)
                    ) : (
                      <li className="pb-3">No itinerary data available.</li>
                    )}
                  </ol>
                </div>
                {/* highlights */}
                <div className="flex flex-col gap-2 pb-4">
                  <h5 className="text-start text-xl">
                    <span className="text-2xl text-third-color font-bold">
                      Highlights
                    </span>{" "}
                    <br />
                  </h5>
                  <ol className="text-start text-xl px-5 list-disc list-inside">
                    {highlights && Object.keys(highlights).length > 0 ? (
                      renderAttributes(highlights)
                    ) : (
                      <li>No itinerary data available.</li>
                    )}
                  </ol>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between">
                {/* inclusion */}
                <div className="flex flex-col gap-2 pb-4">
                  <h5 className="text-2xl text-start text-third-color font-bold">
                    Inclusions
                  </h5>
                  <ol className="text-start text-xl px-5 list-disc list-inside">
                    {inclusions && Object.keys(inclusions).length > 0 ? (
                      renderAttributes(inclusions)
                    ) : (
                      <li>No itinerary data available.</li>
                    )}
                  </ol>
                </div>
                {/* exclusions */}
                <div className="flex flex-col gap-2 pb-4">
                  <h5 className="text-2xl text-start text-third-color font-bold">
                    Exclusions
                  </h5>
                  <ol className="text-start text-xl px-5 list-disc list-inside">
                    {exclusions && Object.keys(exclusions).length > 0 ? (
                      renderAttributes(exclusions)
                    ) : (
                      <li>No itinerary data available.</li>
                    )}
                  </ol>
                </div>
              </div>
              {/* reviews */}
              <div className="py-12">
                <Comments id={id} type="Packages"></Comments>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* book form */}
      <div id="booking"></div>
      {isBooking && (
        <BookingModal onClose={closeBookingModal}>
          <div className="p-5 pt-0 w-full">
            <h1 className="text-3xl text-third-color font-bold text-center mb-3 cursor-pointer">
              Book your trip
            </h1>
            <div className="space-y-2 flex flex-col justify-center items-center">
              {/* address */}
              <label className="px-3 self-start">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={bookData?bookData.address:booking.address}
                onChange={handleChange}
                className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none"
              />

              {/* phone */}
              <label className="px-3 self-start">Phone</label>
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                value={bookData?bookData.phone:booking.phone}
                onChange={handleChange}
                className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none"
              />

              {/* date from-to */}
              <label className="px-3 self-start">Date</label>
              <div className="flex gap-4 w-full items-center">
                <label className="px-3">From:</label>
                <DatetimePicker
                  selected={bookData?bookData.date_from:startDate}
                  onChange={(date) => handleDate(date)}
                  selectsStart
                  startDate={bookData?bookData.date_from:startDate}
                  endDate={bookData?bookData.date_to:endDate}
                  minDate={new Date()}
                  placeholderText="Start Date"
                  className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none focus:border-third-color"
                  calendarClassName="custom-calendar"
                />

                <label className="px-3">To:</label>
                <DatetimePicker
                  selected={bookData?bookData.date_to:endDate}
                  name="date_to"
                  disabled
                  selectsEnd
                  startDate={bookData?bookData.date_from:startDate}
                  endDate={bookData?bookData.date_to:endDate}
                  minDate={bookData?bookData.date_from:startDate}
                  placeholderText="End Date"
                  className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none focus:border-third-color"
                  calendarClassName="custom-calendar"
                />
              </div>

              {/* guests */}
              <label className="px-3 self-start">Guests</label>
              <div className="flex self-start w-1/2 gap-5">
                <input
                  type="number"
                  name="adults"
                  placeholder="Adults"
                  value={bookData?bookData.adults:booking.adults}
                  onChange={handleChange}
                  className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none"
                />
                <input
                  type="number"
                  name="children"
                  placeholder="Children"
                  value={bookData?bookData.children:booking.children}
                  onChange={handleChange}
                  className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none"
                />
              </div>
              <h1 className="text-Base-color text-lg w-full text-start px-5">
                Total: {bookData?bookData.cost:total} JOD
              </h1>
            </div>
          </div>
        </BookingModal>
      )}
    </div>
  );
};

export default PackageDetails;
