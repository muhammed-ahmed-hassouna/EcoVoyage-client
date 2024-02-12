import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsStatistics = () => {
  const [destination, setDestinations] = useState(0);
  const [flights, setFlights] = useState(0);
  const [activities, setActivities] = useState(0);
  const [accommodations, setAccommodations] = useState(0);

  useEffect(() => {
    // fetch users
    axios
      .get(`http://localhost:3999/getDestinations`)
      .then((response) => {
        // Handle the response data here
        setDestinations(response.data.length);
        // setTypes(response.data.destinations_type);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });

    //   fetch flights
    axios
      .get(`http://localhost:3999/getFlights`)
      .then((response) => {
        // Handle the response data here
        setFlights(response.data.length);
        // setTypes(response.data.destinations_type);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });

    //   fetch Activites
    axios
      .get(`http://localhost:3999/getActivities`)
      .then((response) => {
        // Handle the response data here
        setActivities(response.data.length);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });

    //   fetch bookings
    axios
      .get(`http://localhost:3999/getAccommodations`)
      .then((response) => {
        setAccommodations(response.data.length);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div>
      <div className="lg:ml-80 m-5">
        <div className="flex flex-col md:flex-row gap-4 flex-wrap py-12 justify-between items-center">
          <div class="p-4 flex justify-around items-center h-28 bg-gradient-to-tr from-light-pink to-fourth-color text-second-color shadow-sky-900/20 w-full rounded-xl md:w-[225px]">
            <div class="bg-clip-border rounded-xl h-16 w-16 grid place-items-center">
              <svg
                class="text-white w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <path
                  d="M15 12h5a2 2 0 0 1 0 4h-15l-3 -6h3l2 2h3l-2 -7h3z"
                  transform="rotate(-15 12 12) translate(0 -1)"
                />{" "}
                <line x1="3" y1="21" x2="21" y2="21" />
              </svg>
            </div>
            <div className="text-center">
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {flights}
              </h4>
              <p class="block antialiased font-sans text-md leading-normal font-bold">
                Flight
              </p>
            </div>
          </div>
          <div class="p-4 flex justify-around items-center h-28 bg-gradient-to-tr from-light-pink to-fourth-color text-white shadow-sky-900/20 w-full rounded-xl md:w-[225px]">
            <div class="bg-clip-border rounded-xl h-16 w-16 grid place-items-center">
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-center">
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {destination}
              </h4>
              <p class="block antialiased font-sans text-md leading-normal font-bold">
                Destination
              </p>
            </div>
          </div>
          <div class="p-4 flex justify-around items-center h-28 bg-gradient-to-tr from-light-pink to-fourth-color text-white shadow-sky-900/20 w-full rounded-xl md:w-[225px]">
            <div class="bg-clip-border rounded-xl h-16 w-16 grid place-items-center">
              <svg
                class="text-white w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <circle cx="5" cy="18" r="3" /> <circle cx="19" cy="18" r="3" />{" "}
                <polyline points="12 19 12 15 9 12 14 8 16 11 19 11" />{" "}
                <circle cx="17" cy="5" r="1" />
              </svg>
            </div>
            <div className="text-center">
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {activities}
              </h4>
              <p class="block antialiased font-sans text-md leading-normal font-bold">
                Activity
              </p>
            </div>
          </div>
          <div class="p-4 flex justify-around items-center h-28 bg-gradient-to-tr from-light-pink to-fourth-color text-white shadow-sky-900/20 w-full rounded-xl md:w-[225px]">
            <div class="bg-clip-border rounded-xl h-16 w-16 grid place-items-center">
              <svg
                class="w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />{" "}
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="text-center">
              <h4 class="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                {accommodations}
              </h4>
              <p class="block antialiased font-sans text-md leading-normal font-bold">
                Accommodation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsStatistics;
