import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments";
import { useBooking } from "../Context/BookingContext";
import BookingModal from "./Payment/BookingModal";
import DatetimePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ActivityDetails = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState([]);
  const [related, setRelated] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [total, setTotal] = useState(0);
  const { bookData, onBooking } = useBooking();
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

  //   for images
  const [currentImage, setCurrentImage] = useState(0);
  const nextSlide = () => {
    if (activity) {
      if (currentImage === activity.imageactivity.length - 1) {
        setCurrentImage(0);
      } else {
        setCurrentImage(currentImage + 1);
      }
    }
  };
  const prevSlide = () => {
    if (activity) {
      if (currentImage === 0) {
        setCurrentImage(activity.imageactivity.length - 1);
      } else {
        setCurrentImage(currentImage - 1);
      }
    }
  };

  //   fetch details
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .get(`http://localhost:3999/getActivitiesByID/${id}`)
      .then((response) => {
        // Handle the response data here
        setActivity(response.data[0]);
        setTotal(response.data[0].pricing);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, [id]);

  //   fetch related data
  useEffect(() => {
    axios
      .get(`http://localhost:3999/getActivities`)
      .then((response) => {
        // Handle the response data here
        if (activity) {
          let filtered = response.data.filter(
            (item) => item.type === activity.type
          );
          filtered = filtered.filter(
            (item) => item.activities_id !== activity.activities_id
          );
          setRelated(filtered);
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, [activity]);

  // booking modal and payment
  const openBooking = () => {
    setIsBooking(true);
    onBooking({
      ...bookData,
      activities_id: id,
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
          value * activity.pricing + (booking.children * activity.pricing) / 2;
        onBooking({
          ...bookData,
          cost: totalCost,
          adults: value,
        });
      } else {
        totalCost =
          booking.adults * activity.pricing + (value * activity.pricing) / 2;
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
  useEffect(() => {}, [bookData]);
  return (
    <>
      <div>
        {/* images */}
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          <div className="relative h-[200px] md:h-[420px] overflow-hidden rounded">
            {activity &&
              activity.imageactivity &&
              activity.imageactivity.map((image, id) => (
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
                    alt={activity.title}
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

        {/* details */}
        <div className="flex flex-col justify-center items-center my-10 text-Base-color">
          <div className="w-2/3">
            {activity && (
              <div className="flex flex-col gap-10">
                {/* title */}
                <div className="flex flex-wrap justify-between gap-4">
                  <h1 className="text-Base-color text-start text-3xl font-bold">
                    {activity.title}
                  </h1>
                  <button
                    type="submit"
                    onClick={() => openBooking()}
                    className="py-3 w-64 text-xl text-second-color hover:text-fourth-color bg-fourth-color border-2 hover:bg-second-color border-fourth-color rounded"
                  >
                    Book Activity
                  </button>
                </div>
                <h5 className="text-start text-xl">
                  {activity.activity_details}
                </h5>
                <div className="flex justify-between flex-wrap gap-4">
                  {/* price */}
                  <div className="flex flex-col gap-6">
                    <h1 className="text-third-color text-start text-3xl font-bold">
                      Price
                    </h1>
                    <h5 className="text-start text-xl">
                      {activity.pricing} JOD
                    </h5>
                  </div>
                </div>
                {/* related */}
                <div className="py-12">
                  {related && related.length > 0 && (
                    <>
                      <h5 className="text-start text-third-color text-2xl font-bold pb-10">
                        Related Activities
                      </h5>
                      <div className="flex flex-col md:flex-row flex-wrap gap-8 justify-start items-center mx-auto">
                        {related &&
                          related.length > 0 &&
                          related.map((item, id) => (
                            <Link
                              key={id}
                              to={`/activity/${item.activities_id}`}
                            >
                              <article
                                className="max-w-[20rem] shadow-xl bg-cover bg-center overflow-hidden h-[490px] transform duration-500 hover:-translate-y-2 cursor-pointer group"
                                style={{
                                  backgroundImage: `url(${item.imageactivity[0]})`,
                                }}
                              >
                                <div className="text-start hover:bg-transparent-second-color bg-transparent-fourth-color bg-opacity-20 h-full px-5 flex flex-wrap flex-col pt-60 hover:bg-opacity-75 transform duration-300">
                                  <h1 className="text-second-color text-2xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300">
                                    {item.title}
                                  </h1>
                                  <div className="w-16 h-2 bg-fourth-color rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300"></div>
                                  <p className="my-3 py-3 opacity-0 max-h-[95px] overflow-hidden text-second-color text-xl group-hover:opacity-80 transform duration-500">
                                    {item.activity_details}
                                  </p>
                                </div>
                              </article>
                            </Link>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
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
                  value={booking.address}
                  onChange={handleChange}
                  className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none"
                />

                {/* phone */}
                <label className="px-3 self-start">Phone</label>
                <input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  value={booking.phone}
                  onChange={handleChange}
                  className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none"
                />

                {/* date from-to */}
                <label className="px-3 self-start">Date</label>
                <div className="flex gap-4 w-full items-center">
                  <label className="px-3">From:</label>
                  <DatetimePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setEndDate(date);
                      onBooking({
                        ...bookData,
                        date_from: date,
                      });
                    }}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    calendarClassName="custom-calendar"
                    minDate={new Date()}
                    placeholderText="Start Date"
                    className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none focus:border-third-color"
                  />

                  <label className="px-3">To:</label>
                  <DatetimePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      onBooking({
                        ...bookData,
                        date_to: date,
                      });
                    }}
                    name="date_to"
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    calendarClassName="custom-calendar"
                    className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none focus:border-third-color"
                  />
                </div>

                {/* guests */}
                <label className="px-3 self-start">Guests</label>
                <div className="flex self-start w-1/2 gap-5">
                  <input
                    type="number"
                    name="adults"
                    placeholder="Adults"
                    value={booking.adults}
                    onChange={handleChange}
                    className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none"
                  />
                  <input
                    type="number"
                    name="children"
                    placeholder="Children"
                    value={booking.children}
                    onChange={handleChange}
                    className="block text-sm py-2 px-3 rounded w-full border border-[#0c4a6e69] outline-none"
                  />
                </div>
                <h1 className="text-Base-color text-lg w-full text-start px-5">
                  Total: {total} JOD
                </h1>
              </div>
            </div>
          </BookingModal>
        )}
      </div>
    </>
  );
};

export default ActivityDetails;
