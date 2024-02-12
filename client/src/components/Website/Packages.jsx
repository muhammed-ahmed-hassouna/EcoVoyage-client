import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NoMatchingResults from "./NoMatchingResults";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
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

  const [filterOpen, setFilterOpen] = useState(false);
  const openFilter = () => {
    setFilterOpen(!filterOpen);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    axios
      .get("http://localhost:3999/getPackages")
      .then((response) => {
        // Handle the response data here
        setPackages(response.data);
        setFilteredPackages(response.data);
        // setTypes(response.data.destinations_type);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
  }, []);

  const packagePerPage = 3;
  const indexOfLastPackage = currentPage * packagePerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagePerPage;
  const currentPackages = filteredPackages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );
  const totalPages = Math.ceil(filteredPackages.length / packagePerPage);
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
      setFilteredPackages(packages);
    } else {
      setFilteredPackages(
        packages.filter(
          (pack) =>
            pack.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            pack.country.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };
  const handlePriceSearch = (e) => {
    e.preventDefault();
    if (searchPrice != "") {
      setFilteredPackages(packages.filter((pack) => pack.cost <= searchPrice));
    } else {
      setFilteredPackages(packages);
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center">
        {/* filter and search */}
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
          </div>
        </div>
        {/* packages list */}
        <div className="md:my-16 mx-8">
          <div className={`flex flex-col gap-5 max-w-3xl md:w-[768px] ${currentPackages.length>0?"min-h-[835px]":"h-[700px]"} mb-5`}>
            {currentPackages.length>0?currentPackages.map((data, id) => (
              <div key={id}>
                <article className=" flex flex-wrap sm:flex-nowrap shadow-lg border border-transparent-third-color mx-auto group transform duration-500 hover:-translate-y-1 mb-2">
                  <img
                    className="w-full sm:w-52 h-auto object-fill"
                    src={data.imagePAC[0]}
                    alt={data.title}
                  />
                  <div className="h-auto w-full flex flex-col justify-between">
                    <div className="p-5 text-start">
                      <h1 className="text-2xl font-semibold text-Base-color">
                        {data.title}
                      </h1>
                      <p className="text-md overflow-hidden max-h-28 text-third-color mt-2 leading-relaxed">
                        {data.overview}
                      </p>
                      <p className="text-md overflow-hidden max-h-28 text-third-color mt-2 leading-relaxed">
                        Destination: {data.destination}
                      </p>
                    </div>
                    <div className="flex justify-between items-center p-5 bg-second-color">
                      <div>
                        <p className="text-lg text-Base-color font-bold">
                          {data.cost} JOD
                        </p>
                      </div>
                      <Link to={`/package/${data.packages_id}`}>
                        <button className="py-2 px-5 bg-fourth-color hover:bg-second-color text-second-color hover:text-fourth-color border border-fourth-color md:text-lg rounded shadow-md">
                          Read more
                        </button>
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            )):<NoMatchingResults />}
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

export default Packages;
// needs pagination and get all the data not just 3
