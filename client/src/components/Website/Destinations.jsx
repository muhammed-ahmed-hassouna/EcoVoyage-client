import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NoMatchingResults from "./NoMatchingResults";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState("Select type");
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // dropdown for destination type
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
      .get("http://localhost:3999/getDestinations")
      .then((response) => {
        // Handle the response data here
        setDestinations(response.data);
        setFilteredPlaces(response.data);
        // setTypes(response.data.destinations_type);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (destinations.length !== 0) {
      const newTypes = destinations.map(
        (destination) => destination.destinations_type
      );
      setTypes(newTypes);
    }

    if (types !== null) {
      const uniqueArray = [...new Set(types)];
      setTypes(uniqueArray);
    }
  }, [destinations]);

  const destinationPerPage = 3;
  const indexOfLastDestinations = currentPage * destinationPerPage;
  const indexOfFirstDestinations = indexOfLastDestinations - destinationPerPage;
  const currentDestinations = filteredPlaces.slice(
    indexOfFirstDestinations,
    indexOfLastDestinations
  );
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    const totalPages = Math.ceil(filteredPlaces.length / destinationPerPage);

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

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    if (searchQuery === "") {
      setFilteredPlaces(destinations);
    } else {
      setFilteredPlaces(
        destinations.filter(
          (destination) =>
            destination.title
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            destination.country
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      );
    }
  };
  useEffect(() => {
    if (selectedType !== "Select type") {
      setFilteredPlaces(
        destinations.filter(
          (destination) =>
            destination.destinations_type.toLowerCase() ===
            selectedType.toLowerCase()
        )
      );
    } else {
      setFilteredPlaces(destinations);
    }
  }, [selectedType, searchQuery]);

  return (
    <div className="flex flex-col md:flex-row justify-center">
      {/* filteration */}
      <div className="">
        <div
          className={`${
            filterOpen ? "h-auto" : "h-16 overflow-hidden"
          } md:overflow-visible md:h-auto my-16 mx-3 border border-transparent-third-color gap-4 flex-wrap p-3 flex justify-center md:flex-col`}
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
          <div className="w-full mt-4">
            <p className="mb-3 text-lg text-start text-Base-color">
              Destination type
            </p>
            <div className="relative inline-block text-left w-full">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center gap-x-1.5 border border-transparent-third-color rounded bg-second-color px-3 py-2 text-sm font-semibold text-Base-color shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-transparent-first-color"
                  id="menu-button"
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  onClick={toggleMenu}
                >
                  {selectedType}
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
                        setSelectedType("Select type");
                        toggleMenu();
                      }}
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                      id="menu-item-0"
                    >
                      Select type
                    </button>
                    {types === null ? (
                      <div></div>
                    ) : (
                      types.map((type, id) => (
                        <button
                          key={id}
                          onClick={() => {
                            setSelectedType(type);
                            toggleMenu();
                          }}
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          {type}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* list */}
      <div className="md:my-16 mx-8">
        <div className={`flex flex-col gap-8 max-w-3xl lg:w-[768px] ${currentDestinations.length>0?"min-h-[901.6px]":"min-h-[700px]"}`}>
          {currentDestinations.length>0?currentDestinations.map((destination, id) => (
            <div key={id}>
              <article className=" flex flex-wrap sm:flex-nowrap shadow-lg border border-transparent-third-color mx-auto max-w-3xl group transform duration-500 hover:-translate-y-1 mb-2">
                <img
                  className="w-full sm:w-52 h-auto object-cover"
                  src={destination.destinationimage}
                  alt=""
                />
                <div className="h-auto w-full">
                  <div className="p-5 text-start">
                    <h1 className="text-xl font-semibold text-Base-color mt-4">
                      {destination.title}
                    </h1>
                    <p className="text-md overflow-hidden h-28 text-third-color mt-2 leading-relaxed">
                      {destination.details}
                    </p>
                  </div>
                  <div className="px-2">
                    <div className="sm:flex sm:justify-end">
                      <Link to={`/destination/${destination.destinations_id}`}>
                        <button className="sm:mt-3 my-2 py-2 px-5 bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color md:text-lg rounded shadow-md">
                          Read more
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )):<NoMatchingResults />}
        </div>
        <div className="m-5">
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
                currentPage !== filteredPlaces.totalPages &&
                paginate(currentPage + 1)
              }
              disabled={
                currentPage ===
                Math.ceil(filteredPlaces.length / destinationPerPage)
              }
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

export default Destinations;
// needs pagination
