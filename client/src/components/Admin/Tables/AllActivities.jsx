import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  IconButton,
  Tooltip,
  CardFooter,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "../../Context/SelectedPageContext";
import { useAuth } from "../../Context/AuthContext";

export const AllActivities = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const itemsPerPage = 10;
  const { onSelectedPage, onSelectedId } = usePage();
  const { headers } = useAuth();
  const TABLE_HEAD = ["Activities", "Type", "Availability", "Action"];

  async function fetchData() {
    axios
      .get(
        `http://localhost:3999/getActivitiesPaginated?page=${currentPage}&search=${searchQuery}&pageSize=${itemsPerPage}`
      )
      // {search:searchTerm}
      .then((response) => {
        // Assuming the API response has a data property that contains the rows
        setActivities(response.data.data);
        setFilteredActivities(response.data.data);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching data.data:", error);
      });
  }
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3999/getDestinationsPaginated?page=${currentPage}&search=${searchQuery}&pageSize=${itemsPerPage}`
      )
      // {search:searchTerm}
      .then((response) => {
        // Assuming the API response has a data property that contains the rows
        setActivities(response.data.data);
        setFilteredActivities(response.data.data);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching data.data:", error);
      });
    setCurrentPage(1);
  };
  const handleEdit = (id) => {
    onSelectedId(id);
    onSelectedPage("updateActivity");
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#be123c",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`http://localhost:3999/deleteActivities/${id}`, null, {
            headers: headers,
          })
          .then((response) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            fetchData();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong with deleting the user.",
              confirmButtonText: "OK",
              customClass: {
                confirmButton:
                  "bg-sky-900 hover:bg-second-color text-second-color hover:text-sky-900 border border-sky-900 py-2 px-4 rounded",
              },
            });
          });
      }
    });
  };
  return (
    <Card className="p-2 lg:ml-80 m-5 w-auto h-full border border-third-color bg-second-color">
      <h1 className="text-Base-color text-start mt-5 mx-5 text-lg font-bold">
        Activities
      </h1>
      <hr className="text-third-color mb-5" />
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-second-color"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 m-4">
          <form className="w-full lg:w-1/3" onSubmit={handleSearch}>
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-second-color0"
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
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-Base-color border border-transparent-third-color rounded-lg bg-second-color"
                placeholder="Search user"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="text-second-color hover:text-fourth-color absolute end-0 bottom-0 bg-fourth-color hover:bg-second-color border border-fourth-color focus:ring-4 focus:outline-none font-medium rounded-r-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
          <div className="flex w-full md:w-auto shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3 border border-fourth-color bg-fourth-color hover:bg-second-color hover:text-fourth-color"
              size="sm"
              onClick={() => {
                onSelectedPage("addActivity");
              }}
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add new
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 overflow-auto min-h-[768px] mb-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-third-color text-second-color">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-second-color/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((activity, index) => {
              const isLast =
                (index === filteredActivities.length) === 0
                  ? activities.length - 1
                  : filteredActivities.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-second-color";

              return (
                <tr
                  key={index}
                  className={
                    index % 2 !== 0
                      ? "bg-second-color"
                      : "bg-transparent-first-color"
                  }
                >
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {activity.title}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {activity.type}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {activity.availability}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit Activity" className="bg-black/80">
                      <IconButton
                        onClick={() => {
                          handleEdit(activity.activities_id);
                        }}
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4 text-Base-color" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Activity" className="bg-black/80">
                      <IconButton
                        onClick={() => {
                          handleDelete(activity.activities_id);
                        }}
                        variant="text"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="text-Base-color w-4 h-4 font-bold"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-second-color p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-Base-color hover:bg-transparent-first-color"
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              currentPage != totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage == totalPages}
            className="text-Base-color hover:bg-transparent-first-color"
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
