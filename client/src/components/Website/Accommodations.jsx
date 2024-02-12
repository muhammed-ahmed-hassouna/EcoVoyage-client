import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NoMatchingResults from "./NoMatchingResults";

const Accommodations = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [filteredAccommodations, setFilteredAccommodations] = useState([]);
  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState("Select type");
  const [selected, setSelected] = useState("Select");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPrice, setSearchPrice] = useState("");

  // dropdown for accommodations type
  const [typeMenuOpen, setTypeMenuOpen] = useState(false);
  const toggleTypeMenu = () => {
    setTypeMenuOpen(!typeMenuOpen);
  };
  // end of dropdown

  // dropdown for rating
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  // end of dropdown

  const [filterOpen, setFilterOpen] = useState(false);
  const openFilter = () => {
    setFilterOpen(!filterOpen);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .get("http://localhost:3999/getAccommodations")
      .then((response) => {
        // Handle the response data here
        setAccommodations(response.data);
        setFilteredAccommodations(response.data);
        // setTypes(response.data.destinations_type);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (accommodations.length !== 0) {
      const newTypes = accommodations.map(
        (accommodation) => accommodation.type
      );
      setTypes(newTypes);
    }

    if (types !== null) {
      const uniqueArray = [...new Set(types)];
      setTypes(uniqueArray);
    }
  }, [accommodations]);

  const accommodationPerPage = 3;
  const indexOfLastAccommodation = currentPage * accommodationPerPage;
  const indexOfFirstAccommodation =
    indexOfLastAccommodation - accommodationPerPage;
  const currentAccommodations = filteredAccommodations.slice(
    indexOfFirstAccommodation,
    indexOfLastAccommodation
  );
  const totalPages = Math.ceil(
    filteredAccommodations.length / accommodationPerPage
  );
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

  // filters
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    if (searchQuery === "") {
      setFilteredAccommodations(accommodations);
    } else {
      setFilteredAccommodations(
        accommodations.filter(
          (accommodation) =>
            accommodation.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            accommodation.location
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    }
  };
  const handlePriceSearch = (e) => {
    e.preventDefault();
    if (searchPrice != "") {
      setFilteredAccommodations(
        accommodations.filter(
          (accommodation) => accommodation.pricing <= searchPrice
        )
      );
    } else {
      setFilteredAccommodations(accommodations);
    }
  };
  const handleSelectRating = (rating) => {
    if (rating == 0) {
      setFilteredAccommodations(accommodations);
    } else {
      setFilteredAccommodations(
        accommodations.filter(
          (accommodation) => Math.floor(accommodation.rating) === rating
        )
      );
    }
  };
  const handleSelectType = (type) => {
    if (type === "select") {
      setFilteredAccommodations(accommodations);
    } else {
      setFilteredAccommodations(
        accommodations.filter((accommodation) => accommodation.type === type)
      );
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center">
        {/* filtration */}
        <div className="">
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
                class={`w-4 h-auto ${
                  filterOpen ? "hidden" : "block"
                } md:hidden`}
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
                class={`w-4 h-auto ${
                  filterOpen ? "block" : "hidden"
                } md:hidden`}
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
            {/* search */}
            <form
              class="flex items-center w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <label for="simple-search" class="sr-only">
                Search
              </label>
              <div class="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  onChange={(e) => handleSearch(e)}
                  class="bg-second-color border border-transparent-third-color text-fourth-color text-sm rounded focus:ring-transparent-first-color focus:border-transparent-first-color block w-full p-2"
                  placeholder="Search branch name..."
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-second-color bg-fourth-color rounded border border-fourth-color hover:bg-second-color hover:text-fourth-color"
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
            {/* price filteration */}
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
            {/* rating type */}
            <div className="w-full">
              <p className="mb-3 text-lg text-start">Rating</p>
              <div className="relative inline-block text-left w-full">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded bg-second-color px-3 py-2 text-sm font-semibold text-third-color shadow-sm ring-1 ring-inset ring-transparent-first-color hover:bg-transparent-first-color"
                    id="menu-button"
                    aria-expanded={menuOpen}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                  >
                    {selected}
                    <svg
                      className={`-mr-1 h-5 w-5 text-gray-400 transform ${
                        menuOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {menuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <button
                        onClick={() => {
                          setSelected("Select");
                          handleSelectRating(0);
                          toggleMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Select
                      </button>
                      <button
                        onClick={() => {
                          setSelected("5 Stars");
                          handleSelectRating(5);
                          toggleMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        5 Stars
                      </button>
                      <button
                        onClick={() => {
                          setSelected("4 Stars");
                          handleSelectRating(4);
                          toggleMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        4 Stars
                      </button>
                      <button
                        onClick={() => {
                          setSelected("3 Stars");
                          handleSelectRating(3);
                          toggleMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        3 Stars
                      </button>
                      <button
                        onClick={() => {
                          setSelected("2 Stars");
                          handleSelectRating(2);
                          toggleMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        2 Stars
                      </button>
                      <button
                        onClick={() => {
                          setSelected("1 Star");
                          handleSelectRating(1);
                          toggleMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        1 Star
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* select type */}
            <div className="w-full">
              <p className="mb-3 text-lg text-start">Type</p>
              <div className="relative inline-block text-left w-full">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded bg-second-color px-3 py-2 text-sm font-semibold text-third-color shadow-sm ring-1 ring-inset ring-transparent-first-color hover:bg-transparent-first-color"
                    id="menu-button"
                    aria-expanded={typeMenuOpen}
                    aria-haspopup="true"
                    onClick={toggleTypeMenu}
                  >
                    {selectedType}
                    <svg
                      className={`-mr-1 h-5 w-5 text-gray-400 transform ${
                        typeMenuOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {typeMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <button
                        onClick={() => {
                          setSelectedType("Select type");
                          handleSelectType("select");
                          toggleTypeMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Select type
                      </button>
                      <button
                        onClick={() => {
                          setSelectedType("Indoors");
                          handleSelectType("Inside");
                          toggleTypeMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Indoors
                      </button>
                      <button
                        onClick={() => {
                          setSelectedType("Outdoors");
                          handleSelectType("Outside");
                          toggleTypeMenu();
                        }}
                        className="text-gray-700 block px-4 py-2 text-sm"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        Outdoors
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* content list */}
        <div className="md:my-16 mx-8">
          <div
            className={`flex flex-col gap-5 mb-5 max-w-3xl md:w-[768px] ${
              currentAccommodations.length > 0
                ? "min-h-[1146px]"
                : "min-h-[700px]"
            }`}
          >
            {currentAccommodations.length > 0 ? (
              currentAccommodations.map((accommodation, id) => (
                <div key={id}>
                  <article className=" flex flex-wrap sm:flex-nowrap shadow-lg border border-transparent-third-color mx-auto group transform duration-500 mb-2">
                    <img
                      className="w-full sm:w-60 h-auto object-cover"
                      src={accommodation.imageurl[0]}
                      alt=""
                    />
                    <div className="h-auto w-full flex flex-col justify-between">
                      <div className="p-5 text-start">
                        <h1 className="text-xl font-semibold text-Base-color">
                          {accommodation.title}
                        </h1>
                        <p className="text-md overflow-hidden text-Base-color mt-2 leading-relaxed">
                          {accommodation.location}
                        </p>
                        <p className="text-lg overflow-hidden flex gap-1 text-Base-color mt-2 leading-relaxed">
                          {accommodation.rating}{" "}
                          <svg
                            class="h-6 w-6 shrink-0 fill-amber-400"
                            viewBox="0 0 256 256"
                          >
                            <path d="M239.2 97.4A16.4 16.4.0 00224.6 86l-59.4-4.1-22-55.5A16.4 16.4.0 00128 16h0a16.4 16.4.0 00-15.2 10.4L90.4 82.2 31.4 86A16.5 16.5.0 0016.8 97.4 16.8 16.8.0 0022 115.5l45.4 38.4L53.9 207a18.5 18.5.0 007 19.6 18 18 0 0020.1.6l46.9-29.7h.2l50.5 31.9a16.1 16.1.0 008.7 2.6 16.5 16.5.0 0015.8-20.8l-14.3-58.1L234 115.5A16.8 16.8.0 00239.2 97.4z"></path>
                          </svg>
                        </p>
                        <p className="text-md overflow-hidden max-h-20 text-third-color mt-2 leading-relaxed">
                          {accommodation.accommodation_details}
                        </p>
                        <p className="text-md overflow-hidden text-Base-color mt-2 leading-relaxed">
                          {accommodation.pricing} JOD
                        </p>
                      </div>
                      <div className="px-2 m-4">
                        <div className="sm:flex sm:justify-end">
                          <Link
                            to={`/accommodation/${accommodation.accommodation_id}`}
                          >
                            <button className="sm:mt-3 my-2 py-2 px-5 bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color md:text-lg rounded shadow-md">
                              Read more
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
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
    </>
  );
};

export default Accommodations;
// needs pagination and get all the data not just 3
