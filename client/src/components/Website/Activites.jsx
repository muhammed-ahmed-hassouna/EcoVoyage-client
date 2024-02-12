import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NoMatchingResults from "./NoMatchingResults";

const Activites = () => {
  const [destinations, setDestinations] = useState([]);
  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState("Select type");
  const [selected, setSelected] = useState("Select");
  const [filteredActivities, setFilteredActivities] = useState([]);
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
      .get("http://localhost:3999/getActivities")
      .then((response) => {
        // Handle the response data here
        setDestinations(response.data);
        setFilteredActivities(response.data);
        // setTypes(response.data.destinations_type);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (destinations.length !== 0) {
      const newTypes = destinations.map((destination) => destination.type);
      setTypes(newTypes);
    }

    if (types !== null) {
      const uniqueArray = [...new Set(types)];
      setTypes(uniqueArray);
    }
  }, [destinations]);

  const activityPerPage = 8;
  const indexOfLastActivity = currentPage * activityPerPage;
  const indexOfFirstActivity = indexOfLastActivity - activityPerPage;
  const currentActivities = filteredActivities.slice(
    indexOfFirstActivity,
    indexOfLastActivity
  );
  const totalPages = Math.ceil(filteredActivities.length / activityPerPage);
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

  // filter
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    if (searchQuery === "") {
      setFilteredActivities(destinations);
    } else {
      setFilteredActivities(
        destinations.filter((destination) =>
          destination.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };
  const handlePriceSearch = (e) => {
    e.preventDefault();
    if (searchPrice != "") {
      setFilteredActivities(
        destinations.filter((destination) => destination.pricing <= searchPrice)
      );
    } else {
      setFilteredActivities(destinations);
    }
  };
  const handleSelectType = (type) => {
    if (type === "select") {
      setFilteredActivities(destinations);
    } else {
      setFilteredActivities(
        destinations.filter((destination) =>
          destination.type.toLowerCase().includes(type.toLowerCase())
        )
      );
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center">
        {/* filter */}
        <div className="">
          <div
            className={`${
              filterOpen ? "h-auto" : "h-16 overflow-hidden"
            } md:overflow-visible md:h-auto my-16 mx-3 border gap-4 flex-wrap p-3 flex justify-center md:flex-col`}
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
            {/* type filteration */}
            <div className="w-full">
              <p className="mb-3 text-lg text-start">Type</p>
              <div className="relative inline-block text-left w-full">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded bg-second-color px-3 py-2 text-sm font-semibold text-third-color shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-transparent-first-color"
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
                    <div className="py-1 h-40 overflow-auto" role="none">
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
                      {types.map((type, id) => (
                        <button
                          onClick={() => {
                            setSelectedType(type);
                            handleSelectType(type);
                            toggleTypeMenu();
                          }}
                          className="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-0"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* content list */}
        <div className="md:my-16 mx-8 md:w-2/3">
          <div className="flex flex-col flex-wrap justify-start items-start md:flex-row gap-4 min-h-[735px] pb-5">
            {currentActivities.length > 0 ? (
              currentActivities.map((activity, id) => (
                <Link key={id} to={`/activity/${activity.activities_id}`}>
                  <article
                    className="md:w-[15rem] w-[20rem] shadow-xl bg-cover bg-center overflow-hidden md:h-[350px] h-[400px] transform duration-500 hover:-translate-y-2 cursor-pointer group"
                    style={{
                      backgroundImage: `url(${activity.imageactivity[0]})`,
                    }}
                  >
                    <div className="text-start bg-transparent-fourth-color hover:bg-transparent-second-color bg-opacity-20 h-full px-5 flex flex-wrap flex-col pt-40 md:pt-28 hover:bg-opacity-75 transform duration-300">
                      <h1 className="text-second-color text-2xl mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300">
                        {activity.title}
                      </h1>
                      <div className="w-16 h-2 bg-fourth-color rounded-full mb-5 transform translate-y-20 group-hover:translate-y-0 duration-300"></div>
                      <p className="my-3 py-3 opacity-0 max-h-[70px] overflow-hidden text-second-color text-xl group-hover:opacity-80 transform duration-500">
                        {activity.activity_details}
                      </p>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <NoMatchingResults />
            )}
          </div>
          {/* pagination */}
          <div>
            <div className="flex justify-center items-center gap-2">
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

export default Activites;
// needs pagination and get all the data not just 3
