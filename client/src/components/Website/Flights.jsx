import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BookFlightModal from "./BookFlightModal";
import { useBooking } from "../Context/BookingContext";
import NoMatchingResults from "./NoMatchingResults";
import { useSearching } from "../Context/SearchHomePage";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const location = useLocation();
  const [destinations, setDestinations] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const queryParams = new URLSearchParams(location.search);
  const destination = queryParams.get("destination");
  const [bookFilght, setBookFilght] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [economy, setEconomy] = useState(0);
  const [business, setBusiness] = useState(0);
  const [first, setFirst] = useState(0);
  const [flightId, setFlightId] = useState(0);
  const { bookData, onBooking } = useBooking();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const token = cookies["token"];
  const openFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const { searchResult, setSearchResult } = useSearching([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchPrice, setSearchPrice] = useState(0);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const options = { day: "numeric", month: "short", year: "numeric" };

    axios
      .get(`http://localhost:3999/getFlights`)
      .then((response) => {
        let newData = response.data.map((data) => {
          const departDate = new Date(data.depart_date).toLocaleDateString(
            "en-US",
            options
          );
          const returnDate = new Date(data.return_date).toLocaleDateString(
            "en-US",
            options
          );
          const [departDay, departYear] = departDate.split(", ");
          const [returnDay, returnYear] = returnDate.split(", ");
          return {
            ...data,
            depart_day: departDay,
            depart_year: departYear,
            return_day: returnDay,
            return_year: returnYear,
          };
        });
        // Handle the response data here
        if (destination) {
          const filtered = newData.filter(
            (data) => data.destinations_id == destination
          );
          setFlights(filtered);
          setFilteredFlights(filtered);
        } else if (searchResult.length > 0) {
          setFlights(searchResult);
          setFilteredFlights(searchResult);
          setSearchResult([]);
        } else {
          setFlights(newData);
          setFilteredFlights(newData);
        }
        axios.get(`http://localhost:3999/getDestinations`).then((response) => {
          setDestinations(response.data);
        });
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);
  const openModal = (id) => {
    const flightToBook = flights.filter((flight) => flight.flights_id === id);
    setBookFilght(true);
    setPrice(flightToBook[0].best);
    setEconomy(flightToBook[0].economy);
    setBusiness(flightToBook[0].business);
    setFirst(flightToBook[0].first);
  };
  const closeModal = () => {
    setBookFilght(false);
  };
  const bookingFlight = (seat) => {
  console.log(flightId);

    let cost = 0;
    if (seat === "economy") {
      cost = price;
    } else if (seat === "business") {
      cost = price * 3;
    } else if (seat === "first") {
      cost = price * 5;
    }
    onBooking({
      ...bookData,
      cost: cost,
      flights_id: flightId,
      ticket_type: seat,
    });
    if (token) {
      navigate("/payment");
    } else {
      Swal.fire({
        title: "Warninng",
        text: "Must login before proceed with payment!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  const flightsPerPage = 3;
  const indexOfLastFlights = currentPage * flightsPerPage;
  const indexOfFirstFlights = indexOfLastFlights - flightsPerPage;
  const currentFlights = filteredFlights.slice(
    indexOfFirstFlights,
    indexOfLastFlights
  );
  const totalPages = Math.ceil(filteredFlights.length / flightsPerPage);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    if (totalPages > 2) {
      let start = Math.max(
        1,
        Math.min(currentPage - 1, totalPages - maxPagesToShow + 1)
      );
      const end = Math.min(start + maxPagesToShow - 1, totalPages);
      if (end === totalPages) {
        start = totalPages - 2;
      }
      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-1 rounded ${
              i === currentPage
                ? "bg-third-color text-second-color"
                : "text-third-color"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-1 rounded ${
              i === currentPage
                ? "bg-third-color text-second-color"
                : "text-third-color"
            }`}
          >
            {i}
          </button>
        );
      }
    }
    return pageNumbers;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFilteredFlights(
      flights.filter((flight) =>
        flight.destination_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );
  };
  const handlePriceSearch = (e) => {
    e.preventDefault();
    if (searchPrice != "") {
      setFilteredFlights(
        flights.filter((flight) => flight.best <= searchPrice)
      );
    } else {
      setFilteredFlights(flights);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-center">
      {/* filter and searach */}
      <div>
        <div
          className={`${
            filterOpen ? "h-auto" : "h-16 overflow-hidden"
          } md:overflow-visible md:h-auto border-transparent-third-color my-16 mx-3 border gap-4 flex-wrap p-3 flex justify-center md:flex-col`}
        >
          <div className="w-full flex justify-between">
            <h2 className="mb-3 text-start text-Base-color text-xl font-bold">
              Filter
            </h2>
            <svg
              onClick={openFilter}
              class={`w-4 h-auto ${filterOpen ? "hidden" : "block"} md:hidden`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <polyline points="16 4 20 4 20 8" />{" "}
              <line x1="14" y1="10" x2="20" y2="4" />{" "}
              <polyline points="8 20 4 20 4 16" />{" "}
              <line x1="4" y1="20" x2="10" y2="14" />{" "}
              <polyline points="16 20 20 20 20 16" />{" "}
              <line x1="14" y1="14" x2="20" y2="20" />{" "}
              <polyline points="8 4 4 4 4 8" />{" "}
              <line x1="4" y1="4" x2="10" y2="10" />
            </svg>
            <svg
              onClick={openFilter}
              class={`w-4 h-auto ${filterOpen ? "block" : "hidden"} md:hidden`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <polyline points="5 9 9 9 9 5" />{" "}
              <line x1="3" y1="3" x2="9" y2="9" />{" "}
              <polyline points="5 15 9 15 9 19" />{" "}
              <line x1="3" y1="21" x2="9" y2="15" />{" "}
              <polyline points="19 9 15 9 15 5" />{" "}
              <line x1="15" y1="9" x2="21" y2="3" />{" "}
              <polyline points="19 15 15 15 15 19" />{" "}
              <line x1="15" y1="15" x2="21" y2="21" />
            </svg>
          </div>
          <div className="w-full">
            <form class="flex items-center" onSubmit={(e) => handleChange(e)}>
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  onChange={(e) => setSearchQuery(e.target.value)}
                  class="bg-second-color border border-transparent-third-color text-third-color text-sm rounded block w-full p-2"
                  placeholder="Search branch name..."
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ms-2 text-sm font-medium text-second-color bg-fourth-color rounded border border-fourth-color hover:text-fourth-color hover:bg-second-color"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </div>
          <div className="w-full">
            <p className="mb-3 text-lg text-start">Price</p>
            <form
              class="flex items-center"
              onSubmit={(e) => handlePriceSearch(e)}
            >
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <input
                  type="number"
                  step="0.01"
                  onChange={(e) => setSearchPrice(e.target.value)}
                  class="bg-second-color border border-transparent-third-color text-third-color text-sm rounded block w-full p-2"
                  placeholder="Search branch name..."
                />
              </div>
              <button
                type="submit"
                class="p-2.5 ms-2 text-sm font-medium text-second-color bg-fourth-color rounded border border-fourth-color hover:text-fourth-color hover:bg-second-color"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span class="sr-only">Search</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* flights list */}
      <div className="md:w-2/3 w-full">
        <div className="flex flex-col my-3 md:mt-16 md:mb-8 w-full justify-center items-center md:justify-start md:items-start gap-5 min-h-[964px]">
          {currentFlights.length > 0 ? (
            currentFlights.map((flight, id) => (
              <div key={id} className=" w-11/12 mx-5">
                <div className="flex flex-col py-3 px-5 lg:mx-10 lg:py-5 lg:px-7 text-Base-color bg-transparent-first-color rounded w-full">
                  <h1 className="text-start text-3xl flex items-center gap-3 pb-4">
                    Jordan
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
                        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                      />
                    </svg>
                    {flight.destination_name}
                  </h1>
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-1 w-full">
                    <div className="w-full flex flex-col justify-center items-center lg:w-1/4 p-5">
                      <img
                        src={flight.imagecomp}
                        alt="Airline"
                        className="h-32 object-cover w-32 md:w-4/5"
                      />
                      <h1>
                        <strong>Operated by:</strong> {flight.operatedby}
                      </h1>
                    </div>
                    <div className="w-full lg:w-2/4 p-5">
                      {/* depart */}
                      <div className="flex justify-center gap-12 items-center w-full">
                        <div className="w-1/4">
                          <h1 className="font-bold text-lg">
                            {flight.depart_day}
                          </h1>
                          <h1 className="text-md">{flight.depart_year}</h1>
                        </div>
                        <div className="flex justify-between items-center gap-8 text-third-color">
                          <h1 className="text-md font-bold">
                            {flight.depart_time.boarding}
                          </h1>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-8 h-8 text-xl text-third-color"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <h1 className="text-md font-bold">
                            {flight.depart_time.arrival}
                          </h1>
                        </div>
                      </div>
                      <br />
                      <br />
                      {/* return */}
                      <div className="flex justify-center gap-12 items-center w-full">
                        <div className="w-1/4">
                          <h1 className="font-bold text-lg">
                            {flight.return_day}
                          </h1>
                          <h1 className="text-md">{flight.return_year}</h1>
                        </div>
                        <div className="flex justify-between items-center gap-8 text-third-color">
                          <h1 className="text-md font-bold">
                            {flight.return_time.boarding}
                          </h1>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="w-8 h-8 text-xl text-third-color"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <h1 className="text-md font-bold">
                            {flight.return_time.arrival}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="w-full text-2xl lg:w-1/4 lg:text-3xl p-5">
                      <h1 className="font-bold">{flight.best} JOD</h1>
                      <button
                        onClick={(e) => {openModal(flight.flights_id); setFlightId(flight.flights_id)}}
                        className="sm:mt-3 my-2 py-2 px-5 bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color md:text-lg rounded shadow-md"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
                {bookFilght && (
                  <BookFlightModal onClose={closeModal}>
                    <h1 className="text-3xl text-center text-third-color">
                      Book Your Flight
                    </h1>
                    <div className="flex flex-wrap justify-center my-5 items-center gap-5">
                      <div class="w-auto max-w-sm p-4 h-auto bg-transparent-first-color border border-transparent-first-color rounded shadow sm:p-8">
                        <h5 class="mb-4 text-xl font-medium text-third-color">
                          Economy class
                        </h5>
                        {economy === 0 ? (
                          <>
                            <div class="flex items-baseline text-Base-color dark:text-second-color w-60 h-28">
                              <span class="ms-1 text-xl font-normal text-third-color dark:text-gray-400">
                                Not Available
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="w-60 h-36 flex flex-col justify-between">
                            {economy < 10 && (
                              <h1 className="text-red-700">
                                Only {economy} tickets left
                              </h1>
                            )}
                            <div class="flex items-baseline text-Base-color mb-5">
                              <span class="text-4xl font-extrabold tracking-tight">
                                {price}
                              </span>
                              <span class="text-3xl font-semibold">JOD</span>
                              <span class="ms-1 text-xl font-normal text-third-color dark:text-gray-400">
                                Per Person
                              </span>
                            </div>
                            {/* <div class="space-y-5 my-7"></div> */}
                            <button
                              onClick={(e) =>{
                                bookingFlight("economy");
                              }
                              }
                              type="button"
                              class="text-second-color bg-fourth-color hover:bg-second-color hover:text-fourth-color border-2 border-fourth-color font-medium rounded text-sm px-5 py-2 inline-flex justify-center w-full text-center"
                            >
                              Book Now
                            </button>
                          </div>
                        )}
                      </div>
                      <div class="w-auto max-w-sm p-4 h-auto bg-transparent-first-color border border-transparent-first-color rounded shadow sm:p-8">
                        <h5 class="mb-4 text-xl font-medium text-third-color">
                          Business class
                        </h5>
                        {business === 0 ? (
                          <>
                            <div class="flex items-baseline text-Base-color dark:text-second-color w-60 h-28">
                              <span class="ms-1 text-xl font-normal text-third-color dark:text-gray-400">
                                Not Available
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="w-60 h-36 flex flex-col justify-between">
                            {business < 10 && (
                              <h1 className="text-red-700">
                                Only {business} tickets left
                              </h1>
                            )}
                            <div class="flex items-baseline text-Base-color mb-5">
                              <span class="text-4xl font-extrabold tracking-tight">
                                {price * 3}
                              </span>
                              <span class="text-3xl font-semibold">JOD</span>
                              <span class="ms-1 text-xl font-normal text-third-color dark:text-gray-400">
                                Per Person
                              </span>
                            </div>
                            <button
                              onClick={(e) =>
                                bookingFlight("business")
                              }
                              type="button"
                              class="text-second-color bg-fourth-color hover:bg-second-color hover:text-fourth-color border-2 border-fourth-color font-medium rounded text-sm px-5 py-2 inline-flex justify-center w-full text-center"
                            >
                              Book Now
                            </button>
                          </div>
                        )}
                      </div>
                      <div class="w-auto max-w-sm p-4 h-auto bg-transparent-first-color border border-transparent-first-color rounded shadow sm:p-8">
                        <h5 class="mb-4 text-xl font-medium text-third-color">
                          First class
                        </h5>
                        {first === 0 ? (
                          <>
                            <div class="flex items-baseline text-Base-color dark:text-second-color w-60 h-28">
                              <span class="ms-1 text-xl font-normal text-third-color dark:text-gray-400">
                                Not Available
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="w-60 h-36 flex flex-col justify-between">
                            {first < 10 && (
                              <h1 className="text-red-700">
                                Only {first} tickets left
                              </h1>
                            )}
                            <div class="flex items-baseline text-Base-color mb-5">
                              <span class="text-4xl font-extrabold tracking-tight">
                                {price * 5}
                              </span>
                              <span class="text-3xl font-semibold">JOD</span>
                              <span class="ms-1 text-xl font-normal text-third-color dark:text-gray-400">
                                Per Person
                              </span>
                            </div>
                            <button
                              onClick={(e) =>
                                bookingFlight("first")
                              }
                              type="button"
                              class="text-second-color bg-fourth-color hover:bg-second-color hover:text-fourth-color border-2 border-fourth-color font-medium rounded text-sm px-5 py-2 inline-flex justify-center w-full text-center"
                            >
                              Book Now
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </BookFlightModal>
                )}
                <div id="root"></div>
              </div>
            ))
          ) : (
            <NoMatchingResults />
          )}
        </div>
        <div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-third-color"
              variant="outlined"
              size="sm"
            >
              Previous
            </button>
            <div>{renderPageNumbers()}</div>
            <button
              onClick={() =>
                currentPage !== totalPages && paginate(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              className="text-third-color"
              variant="outlined"
              size="sm"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
