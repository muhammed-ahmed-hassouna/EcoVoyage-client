import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePage } from "../../Context/SelectedPageContext";
import { useAuth } from "../../Context/AuthContext";

export const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const itemsPerPage = 5;
  const { headers } = useAuth();
  const { page, onSelectedPage, selectedId, onSelectedId } = usePage();

  const TABLE_HEAD = ["Users", "Country", "Admin", ""];
  const fetchData = () => {
    axios
    .get(
      `http://localhost:3999/getUsersPaginated?page=${currentPage}&search=${searchQuery}`
    )
    // {search:searchTerm}
    .then((response) => {
      // Assuming the API response has a data property that contains the rows
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setTotalCount(response.data.totalCount);
    })
    .catch((error) => {
      console.error("Error fetching data.data:", error);
    });
  }
  useEffect(() => {
    fetchData();
  }, [currentPage]);

const totalPages = Math.ceil(totalCount/ itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData();
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    axios.put(`http://localhost:3999/MakeAdmin/${id}`, null, {
      headers: headers,
    });
    fetchData();
  };
  return (
    <Card className="p-2 lg:ml-80 m-5 w-auto h-full border border-third-color bg-second-color">
      <h1 className="text-Base-color text-start mt-5 mx-5 text-lg font-bold">
        Users
      </h1>
      <hr className="text-third-color" />
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
                  className="w-4 h-4 text-gray-500"
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
              variant="outlined"
              size="sm"
              className="border border-fourth-color bg-fourth-color text-second-color hover:bg-second-color hover:text-fourth-color"
              onClick={() => onSelectedPage("users")}
            >
              view all
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 h-[400px] mb-auto overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-third-color text-second-color">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
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
            {filteredUsers.map((user, index) => {
              const isLast =
                (index === filteredUsers.length) === 0
                  ? users.length - 1
                  : filteredUsers.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

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
                          {user.first_name} {user.last_name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {user.email}
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
                        {user.country}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={user.role_id === 1 ? "No" : "Yes"}
                        className={`${
                          user.role_id === 1 ? "text-red-500" : "text-green-500"
                        }`}
                      />
                    </div>
                  </td>
                  <td className={`${classes}`}>
                    <Tooltip content="Assign as admin" className="bg-black/80">
                      <IconButton
                        variant="text"
                        onClick={() => {
                          handleEdit(user.user_id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 text-Base-color"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
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
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-third-color hover:bg-transparent-first-color"
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
            className="text-third-color hover:bg-transparent-first-color"
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
